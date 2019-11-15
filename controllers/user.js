const axios = require('axios');

async function database() {
    return axios.get('http://www.mocky.io/V2/5808862710000087232b75ac')
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return false;
    })
}

const idFinder = async (id) =>{
    var db = await database();
    if (!db || db === undefined || !id || id === "") return false;
    var user = db.clients.filter(client => {
        if(client.id == id){
            return client;
        }
    })
    return user;
}

const nameFinder = async (name) =>{
    var db = await database();
    if (!db || db === undefined || !name || name === "") return false;
    let user = db.clients.filter(client => {
        if(client.name == name){
            return client;
        }
    })
    return user;
}

module.exports = {
    findById: async (req, res) => {
        var id = req.params.id;
        if (!id || id === "") return res.status(404).json({ message: "we need an id to find something" });
        let user = await idFinder(id);
        if (user) return res.status(200).json({ data: user, message: "here is your user" });
        return res.status(404).json({ message: "we cannot find anything with this id" });
    },
    findByName: async (req, res) => {
        var name = req.params.name;
        if (!name || name === "") return res.status(404).json({ message: "we need an name to find something" });
        let user = await nameFinder(name);
        if (user) return res.status(200).json({ data: user, message: "here is your user" });
        return res.status(404).json({ message: "we cannot find anything with this id" });
    },
    nameFinder,
}
