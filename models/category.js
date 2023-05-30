const {Schema , model, SchemaType} = require('mongoose')


const schemaCategory = new Schema({   
    label : String,
    icon : String,
    color : String,
    // products : [{type: Schema.Types.ObjectId, ref : 'Product'}]
})

module.exports = model('Category' , schemaCategory) 