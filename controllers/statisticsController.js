const Statistics = require('../models/statisticsModel');

exports.getStatistics = (req, res, next) => {

    Statistics.find({})
    .then((stats) => {
        res.json({
            ok: true,
            data: stats
        })
    })
    .catch(err => {
        next(err);
    }) 
}

exports.getStatisticsCountry = (req, res, next) => {

    const country_id = req.params.id;

    Statistics.findById(country_id)
    .then((stats) => {
        res.json({
            ok: true,
            data: stats
        })
    })
    .catch(err => {
        next(err);
    }) 
}

exports.setStatisticsCountry = (req, res, next) => {
    const country_id = req.params.id;


    Statistics.findByIdAndUpdate(country_id , req.body)
    .then((stats) => {
        res.json({
            ok: true,
            message: "Updated Succesfully"
        })
    })
    .catch(err => {
        next(err);
    }) 

}
