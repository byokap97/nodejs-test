const axios = require('axios');
module.exports = {
    db: async () => {
        return axios.get('http://www.mocky.io/V2/5808862710000087232b75ac')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return false;
            })
    },
    findById: async (req, res) => {
        var db = await module.exports.db();
        var id = req.params.id;
        if (!db) return res.status(400).json({ message: "we cannot find anything" });
        if (!id) return res.status(404).json({ message: "we need an id to find something" });
        let user = db.clients.filter(user => {
            return user.id == id && (user.role == "user" || user.role == "admin");
        })
        if (user) return res.status(200).json({ data: user, message: "here is your user" });
        return res.status(404).json({ message: "we cannot find anything with this id" });
    },
    findByName: async (req, res) => {
        var db = await module.exports.db();
        var name = req.params.name;
        if (!db) return res.status(400).json({ message: "we cannot find anything" });
        if (!name) return res.status(404).json({ message: "we need an name to find something" });
        let user = db.clients.filter(user => {
            return user.name == name && user.role == "admin";
        })
        if (user) return res.status(200).json({ data: user, message: "here is your user" });
        return res.status(404).json({ message: "we cannot find anything with this id" });
    },

}
