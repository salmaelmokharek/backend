var express = require('express');
var router = express.Router();
const {validateProduct} = require('../midleware/product-joi')
const multer = require('multer');
const path = require('path');

const {products, oneproduct , store, Update, patchPro, deletepro, uploadimages, search} = require('../controllers/productController')

const storage = multer.diskStorage({

    destination:  (req, file, cb) => {
        const allowedimage = {
            'image/png': 'png',
            'image/jpeg': 'jpeg',
            'image/jpg': 'jpg'

        }
        // err = null
        // if(!allowedimage [file.mimetype] ){
        //     err = new Error ('fileError')
        // }
      cb(null, `${__dirname}/../public/images`); // Change the path as per your requirement
    },

    filename: function (req, file, cb) {
      const  uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1E9)
      cb(null,uniqueSuffix +path.extname(file.originalname) );
    }
});

const upload = multer({storage : storage})

/* GET home page. */
router.get('/', products);

router.get('/search', search);

router.get('/:id', oneproduct);

router.post('/', [upload.single('thumbnail'),validateProduct] , store);

router.put('/:id/images', upload.array('images') , uploadimages);

router.put('/:id', Update);

router.patch('/:id', patchPro);

router.delete('/:id', deletepro);







module.exports = router;
