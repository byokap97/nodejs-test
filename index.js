// =======================
// Required      =========
// =======================
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');


// =======================
// Cors          =========
// =======================
app.use(helmet());
app.use(cors());

// =======================
// BodyParser    =========
// =======================

app.use(bodyParser.urlencoded({
    extended: false
}));

// =======================
// router ================
// =======================
var router = require('./router');
app.use('/', router);


app.listen(8080, function(err){
    if(!err) console.log('started')
});