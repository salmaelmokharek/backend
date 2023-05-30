var express = require('express');
var router = express.Router();

const {index, oneCategory , store, Update, patchCat, deleteCat} = require('../controllers/orderController')


/* GET home page. */

router.get('/', index);

router.post('/', store);

module.exports = router;
