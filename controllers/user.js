const axios = require('axios');
const jwt = require('jsonwebtoken');

async function database() {
    return axios.get('http://www.mocky.io/V2/5808862710000087232b75ac')
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return false;
    })
}

function generateJWT (user) {
    return jwt.sign({
        username: user.name,
        id: user.id,
        type: user.role
    }, 'node_test', {
        expiresIn: "1h"
    });
}

function validateEmail (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


const idFinder = async (id) =>{
    var db = await database();
    if (!db || db === undefined || !id || id === "") return false;
    var user = db.clients.filter(client => {
        if(client.id == id){
            return client;
        }
    })
    return user[0];
}

const nameFinder = async (name) =>{
    var db = await database();
    if (!db || db === undefined || !name || name === "") return false;
    let users = db.clients.filter(client => {
        if(client.name == name){
            return client;
        }
    })
    return users;
}

const emailFinder = async (email) =>{
    var db = await database();
    if (!db || db === undefined || !email || email === "") return false;
    let user = db.clients.filter(client => {
        if(client.email == email){
            return client;
        }
    })
    return user[0];
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
    login: async (req, res) => {
        var email = req.body.email;
        if (!email || email === "" || !validateEmail(email)) return res.status(404).json({ message: "we need a correct email to find something" });
        let user = await emailFinder(email);
        if (user) return res.status(200).json({ token: generateJWT(user), message: "here is your token" });
        return res.status(404).json({ message: "we cannot login without a valid email" });
    },
    nameFinder,
}
