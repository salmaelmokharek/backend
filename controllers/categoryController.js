const Category = require('./../models/category')
const mongoose =require('mongoose')

exports.Categories =  async(req, res, next) => {
    try{
        const myCategories = await Category.find()
        res.json({myCategories, success : true });
    }catch(error){

        res.status(500).json({ error, success: false });
    }
}

exports.oneCategory =  async(req, res, next) => {
    let {id} = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({success : false, message :"Invalid ID"})
    }

    try{
        const category = await Category.findById(id)
         if (!category) {
            return res.status(404).json({success: false , message :"categories Not Found !"})
         }
         res.json({category, success : true})
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
        const categories = await Category.findOneAndReplace({'_id': id},req.body)
         if (!categories) {
            return res.status(404).json({success: false , message :"categories Not Found !"})
         }
         res.json({categories, success : true})
    }catch(error){

        res.status(500).json({ error, success: false });
   
    }
}


exports.patchCat =  async(req, res) => {
    let {id} = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({success : false, message :"Invalid ID"})
    }
    try{
        const categories = await Category.findOneAndUpdate({'_id': id},req.body)
         if (!categories) {
            return res.status(404).json({success: false , message :"categories Not Found !"})
         }
         res.json({categories, success : true})
    }catch(error){

        res.status(500).json({ error, success: false });
   
    }
}

exports.deleteCat =  async(req, res) => {
    let {id} = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({success : false, message :"Invalid ID"})
    }
    try{
        const categories = await Category.findOneAndDelete({'_id': id},req.body)
         if (!categories) {
            return res.status(404).json({success: false , message :"categories Not Found !"})
         }
         res.json({categories, success : true})
    }catch(error){

        res.status(500).json({ error, success: false });
   
    }
}

exports.store = (req,res) => {
    let{label, icon, color} = req.body
    const mycategories = new Category({
        label : label,
        icon: icon,
        color: color
    })

    mycategories.save()
       .then(insertedcategories => {
             res.status(201).json({
                 Category : insertedcategories,
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

