var express = require('express');
var router = express.Router();
const {validateCat} = require('../midleware/category-joi')

const {Categories, oneCategory , store, Update, patchCat, deleteCat} = require('../controllers/categoryController')


/* GET home page. */
router.get('/', Categories);

router.get('/:id', oneCategory);

router.post('/', validateCat, store);

router.put('/:id', Update);

router.patch('/:id', patchCat);

router.delete('/:id', deleteCat);




module.exports = router;
