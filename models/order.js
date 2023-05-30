const {Schema, model} = require('mongoose')

const schemaOrder = new Schema({
    shippingAddress:{type: String, required: true},
    invoiceAddress: String,
    city: String,
    country: String,
    phone:{type: Number, required: true},
    status:{type: String, enum: ['Shipped', 'Received', 'Cancled', 'Pending'], default: 'Pending'},
    total: Number,
    user:{type: Schema.Types.ObjectId, ref : 'User', required : true},
    orderItems:[{type: Schema.Types.ObjectId, ref : 'OrderItem', required : true}],
    created_at:{type: Date, default: Date.now},
    updated_at:{type: Date, default: Date.now}
})
module.exports = model('Order', schemaOrder)
