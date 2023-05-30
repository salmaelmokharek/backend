var express = require('express');
var router = express.Router();
const {validateUser} = require('../midleware/user-joi')
const {user, register, login, userOrders} = require('./../controllers/userController')

/* GET users listing. */
router.get('/', user);

/* register users listing. */
router.post('/register', validateUser, register);

/* post login listing. */
router.post('/login', login);

router.get('/:id/orders', userOrders);

module.exports = router;
