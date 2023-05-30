const Product = require('./../models/product')
 const mongoose =require('mongoose')

exports.products =  async(req, res, next) => {
    try{
        const myProducts = await Product.find().populate('category','-_id label')
        res.json({myProducts, success : true });
    }catch(error){

        res.status(500).json({ error, success: false });
    }
}

exports.oneproduct =  async(req, res, next) => {
    let {id} = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({success : false, message :"Invalid ID"})
    }

    try{
        const product = await Product.findById(id)
         if (!product) {
            return res.status(404).json({success: false , message :"Product Not Found !"})
         }
         res.json({product, success : true})
    }catch(error){

        res.status(500).json({ error, success: false });
    }
}

exports.Update =  async(req, res) => {
    let {id} = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({success : false, message :"Invalid ID"})
    }
    try{
        const product = await Product.findOneAndReplace({'_id': id},req.body)
         if (!product) {
            return res.status(404).json({success: false , message :"Product Not Found !"})
         }
         res.json({product, success : true})
    }catch(error){

        res.status(500).json({ error, success: false });
   
    }
}


exports.patchPro =  async(req, res) => {
    let {id} = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({success : false, message :"Invalid ID"})
    }
    try{
        const product = await Product.findOneAndUpdate({'_id': id},req.body)
         if (!product) {
            return res.status(404).json({success: false , message :"Product Not Found !"})
         }
         res.json({product, success : true})
    }catch(error){

        res.status(500).json({ error, success: false });
   
    }
}

exports.deletepro =  async(req, res) => {
    let {id} = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({success : false, message :"Invalid ID"})
    }
    try{
        const product = await Product.findOneAndDelete({'_id': id},req.body)
         if (!product) {
            return res.status(404).json({success: false , message :"Product Not Found !"})
         }
         res.json({product, success : true})
    }catch(error){

        res.status(500).json({ error, success: false });
   
    }
}

exports.store = (req,res) => {
    let{title, content, brand, description, rating, isFeatured, countStock, images, price, category} = req.body
    let {filename} =req.file
    let thumbnail = ""

    if(filename){
        const domaine = process.env.DOMAINE_NAME
        thumbnail = `${domaine}/images/${filename}`
    }


    const myProduct = new Product({
        title, description, content, brand, rating,  isFeatured,  countStock,  thumbnail,  images, price,category
    })

    myProduct.save()
       .then(insertedProduct => {
             res.status(201).json({
                 product : insertedProduct,
                 success : true
             })
        })
        .catch(error => {
             res.status(500).json({
                 error: error,
                 success : false
             })
        })

}

exports.uploadimages = async (req, res) => {
    let id = req.params.id
    const domaine = process.env.DOMAINE_NAME

    const images = req.files.map(file => `${domaine}/images/${file.filename}`) 
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, {images: images}, {new: true})
        
        if(!updatedProduct){
            return res.status(404).json({success : false, message : "Product not Found!"})
        }
        res.json({success : true, product : updatedProduct })

    }catch(err){
        res.status(500).json({success : false, err})
    }
    }

exports.search = async (req,res) =>{

        let {search, fields }= req.query

        // let myData = {[segment]: search}

        // return res.json(myData)

        if(search){
        try {
            let result = await Product.find({
                $or:[
                    {title: {$regex: search,'$options': 'i'}},
                    {description: {$regex: search,'$options': 'i'}},
                    {content: {$regex: search,'$options': 'i'}},
                ]
            })
            // .select(fields)
            .sort({'created_at' : -1}) // desc order -1   

            if (!result.length) {
                return res.status(404).json({
                    success : false,
                    message : "Product(s) not Found !"
                }) 
            }

            res.json({
                products : result,
                success : true
            })

        } catch (error) {
            res.status(500).json({
                message : "server is down",
                success : false
            })
        }
        }
}
