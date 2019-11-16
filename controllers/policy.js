const axios = require('axios');
const userController = require('./user');


const idFinder = async (id) =>{
    var db = await module.exports.database();
    if (!db || db === undefined || !id || id === "") return false;
    let policiy = db.policies.filter(policiy => {
        return policiy.id == id;
    })
    return policiy;
}

const clientIdFinder = async (id) =>{
    var db = await module.exports.database();

    if (!db || db === undefined || !id || id === "") return false;
    let policiy = db.policies.filter(policiy => {
        return policiy.clientId == id;
    })
    return policiy;
}

module.exports = {
    database: async ()  =>{
        return axios.get('http://www.mocky.io/v2/580891a4100000e8242b75c5')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return false;
        })
    },
    findByPolicyNumber: async (req, res) => {
        var id = req.params.number;
        if (!id || id === "") return res.status(404).json({ message: "we need an id to find something" });
        let policiy = await idFinder(id);
        if (policiy) return res.status(200).json({ data: policiy, message: "here is your policy" });
        return res.status(404).json({ message: "we cannot find anything with this id" });
    },
    findByUserName: async (req, res) => {
        var name = req.params.name;
        if (!name || name === "") return res.status(404).json({ message: "we need a name to find something" });
        let user = await userController.nameFinder(name);
        var policies = await clientIdFinder(user.id);
        if (policies) return res.status(200).json({ data: policies, message: "here is your policies" });
        return res.status(404).json({ message: "we cannot find anything with this name" });
    },

}
