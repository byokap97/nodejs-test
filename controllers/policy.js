const axios = require('axios');
const userController = require('./user');

async function database() {
    return axios.get('http://www.mocky.io/v2/580891a4100000e8242b75c5')
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
    let policiy = db.policies.filter(policiy => {
        return policiy.id == id;
    })
    return policiy;
}

const clientIdFinder = async (id) =>{
    var db = await database();

    if (!db || db === undefined || !id || id === "") return false;
    let policiy = db.policies.filter(policiy => {
        return policiy.clientId == id;
    })
    return policiy;
}

module.exports = {
    findByPolicyNumber: async (req, res) => {
        var id = req.params.number;
        if (!id || id === "") return res.status(404).json({ message: "we need an id to find something" });
        let policiy = await idFinder(id);
        if (policiy) return res.status(200).json({ data: policiy, message: "here is your user" });
        return res.status(404).json({ message: "we cannot find anything with this id" });
    },
    findByUserName: async (req, res) => {
        var name = req.params.name;
        if (!name || name === "") return res.status(404).json({ message: "we need a name to find something" });
        let users = await userController.nameFinder(name);
        var policies = [];
        for(let i = 0; i < users.length ; i++){
            userPolicies = await clientIdFinder(users[i].id);
            let info = {
                id : users[i].id,
                name : users[i].name,
                policies: userPolicies
            }
            policies.push(info)
        }
        if (policies) return res.status(200).json({ data: policies, message: "here is your policies" });
        return res.status(404).json({ message: "we cannot find anything with this name" });
    },

}
