
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');
const authRoute = require('./routes/authRoute');
const syncRoute = require('./routes/syncRoute');
const statisticsRoute = require('./routes/statisticsRoute');

const app = express();
const port = 3000;


/***** Mongoose Config ****/ 
const url = config.mongoUrl;

const mongoose = require('mongoose');
const connect = mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

connect.then((db) => {
  console.log("Connected correctly to MongoDB server");
}, (err) => { console.log(err); });
/***********************/

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(express.json());


//cors
app.use(cors({origin: true, credentials:true}));


// Routes
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and MongoDB API' })
})

app.use('/auth', authRoute);
app.use('/sync', syncRoute);
app.use('/statistics', statisticsRoute);


//Error Handler
app.use((err, req, res, next) => {

    console.log(err);

    if (!err.message){
        err.message = 'Unexpected Error';
    }

    res.status(err.status || 500);

    res.json({message: err.message})
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});