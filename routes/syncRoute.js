const express = require('express');
const syncController = require('../controllers/syncController');
const {verifyUser} = require('../controllers/security');


const router = express.Router();

router.get('/', verifyUser, syncController.sync);


module.exports = router;