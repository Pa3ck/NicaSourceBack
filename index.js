
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const authRoute = require('./routes/authRoute')

const app = express();
const port = 3000;


/***** Mongoose Config ****/ 
const url = config.mongoUrl;

const mongoose = require('mongoose');
const connect = mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

connect.then((db) => {
  console.log("Connected correctly to MongoDB server");
}, (err) => { console.log(err); });
/***********************/

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);


// Routes
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and MongoDB API' })
})

app.use('/auth',authRoute)


//Error Handler
app.use((err, req, res, next) => {

    console.log(err);

    if (!err.message){
        err.message = 'Unexpected Error';
    }

    res.status(err.status || 500);

    res.json({error: true, message: err.message})
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});