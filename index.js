// =======================
// Required      =========
// =======================
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');


// =======================
// Cors          =========
// =======================
app.use(helmet());
app.use(cors());

// =======================
// router ================
// =======================
var router = require('./router');
app.use('/', router);


app.listen(8080, function(err){
    if(!err) console.log('started')
});