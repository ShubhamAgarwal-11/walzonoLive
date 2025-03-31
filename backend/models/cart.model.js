const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    cartItems : {
        type : Array,
        required : true
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
