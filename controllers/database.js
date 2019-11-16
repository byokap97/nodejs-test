const mongoose = require('mongoose');
//var dbURI = 'mongodb://db_paco:Rosetta2019@pruebas-shard-00-00-plmpb.gcp.mongodb.net:27017,pruebas-shard-00-01-plmpb.gcp.mongodb.net:27017,pruebas-shard-00-02-plmpb.gcp.mongodb.net:27017/aquaDrink?ssl=true&replicaSet=Pruebas-shard-0&authSource=admin&retryWrites=true';
var dbURI = 'mongodb+srv://admin:1234@nodejs-test-mgimm.mongodb.net/test?retryWrites=true&w=majority';

module.exports = {
    connectToServer: () => {
        mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
            console.log('DB connected');
        });

        // If the connection throws an error 
        mongoose.connection.on('error', (err) => {
            console.log('tenemos un error en base de datos'. err);
        });
    },

    closeConnection: () => {
        mongoose.disconnect(dbURI);
        mongoose.connection.on('disconnected', () => {
            console.log('te has desconectado de base de datos');
        });
    },

    getDb: () => {
        return mongoose.connection;
    },
    connection : mongoose.connection
};
