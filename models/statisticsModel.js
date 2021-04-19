const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const statisticsSchema = new Schema({
    cases: {
        type: Schema.Types.Mixed
    },
    continent: {
        type: String
    },
    country: {
        type: String
    },
    day: {
        type: Date
    },
    population: {
        type: Number
    },
    deaths: {
        type: Schema.Types.Mixed
    },
    tests: {
        type: Schema.Types.Mixed
    },
    time: {
        type: Date, 
    }
});

module.exports = mongoose.model('Statistics', statisticsSchema);