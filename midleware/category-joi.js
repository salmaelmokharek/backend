const Joi = require('joi')

exports.validateCat = (req,res,next) =>{
    const schema = Joi.object({
        label : Joi.string().min(2).max(40).required(),
        icon : Joi.string().trim().optional(),
        color : Joi.string().optional()
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