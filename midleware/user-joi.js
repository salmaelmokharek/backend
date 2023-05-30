const Joi = require('joi')

exports.validateUser = (req, res, next) =>{
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(30).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).required(),
        address: Joi.string().trim().required(),
        city: Joi.string().trim().required(),
        country: Joi.string().trim().required(),
        phone: Joi.number().min(10).required(),
        isAdmin: Joi.boolean()
      });
      
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