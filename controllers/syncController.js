const request = require('request');
const Statistics = require('../models/statisticsModel');

exports.sync = (req, res, next) => {

    

    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        headers: {
            'x-rapidapi-key': 'defa112622msh81c926b61ced1c2p179d86jsn04ef6723e4f5',
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            useQueryString: true
        }
    };

    request(options, function (error, response, body) {
        if (error){
            next(error);
        }

        const jsonBody = JSON.parse(body);

        Statistics.deleteMany({})
        .then(() => {
            return Statistics.insertMany(jsonBody.response)
        })
        .then( docs => {
            return res.json({
                ok: true, 
                message: 'Synchronization succesfull',
                inserted: docs.length,
            });
        })
        .catch(err => {
            next(err);
        })


    });
}
