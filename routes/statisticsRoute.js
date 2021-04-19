const express = require('express');
const statisticsController = require('../controllers/statisticsController');
const {verifyUser} = require('../controllers/security');


const router = express.Router();

router.get('/', verifyUser, statisticsController.getStatistics);
router.get('/:id', verifyUser, statisticsController.getStatisticsCountry);
router.post('/:id', verifyUser, statisticsController.setStatisticsCountry);


module.exports = router;