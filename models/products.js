const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
    skuId: {
        type: Number,
        unique: true,
        required: true,
    },
    productName: String,
    quantity: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Products', ProductsSchema);