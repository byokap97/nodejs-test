const userSchema = require('../schemas/user');

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


const idFinder = async (id) => {
    return userSchema.findOne({ id: id }, ['-_id', '-__v'],  function (err, user) {
        if (err) return false;
        return user;
    });
}

const nameFinder = async (name) => {
    return userSchema.findOne({ name: name }, ['-_id', '-__v'],  function (err, user) {
        if (err) return false;
        return user;
    });
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
        userSchema.findOne({ email: email }, function (err, user) {
            if (err) return res.status(404).json({ message: "we cannot login without a valid email" });
            return res.status(200).json({ data: user.toAuthJSON(), message: "here is your token" });
        });
    },
    nameFinder,
}
