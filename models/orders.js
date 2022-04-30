const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    orderId: {
        type: Number,
        unique: true,
        required: true,
    },
    orderName: String,
    orderDate: Date,
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Products',
        }
    ],
    status: {
        type: String,
        default: "Processing"
    }
});

module.exports = mongoose.model('Orders', OrdersSchema);