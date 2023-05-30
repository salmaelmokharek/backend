const Joi = require('joi')

exports.validateProduct = (req, res, next) =>{
    const schema = Joi.object({
        title: Joi.string().uppercase().trim().min(5).required(),
        description: Joi.string().trim().min(10).required(),
        content: Joi.string().trim().min(10).required(),
        brand: Joi.string().trim().min(2).max(20).required(),
        countStock: Joi.number().positive().required(),
        price: Joi.number().required(),
        thumbnail: Joi.string(),
        images: Joi.string(),
        rating: Joi.number().integer().positive().optional(),
        isFeatured: Joi.boolean(),
        category: Joi.string().trim().required()
    })
    const {value, error } = schema.validate(req.body)
    
      if(error){
          const {path, message} = error.details[0];
          return res.send({
            value,
            error: {
                path: path[0],message
            }
        });
        }
    
        next();

}