const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: String,
    data: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Orders'
        }
    ] 
});

module.exports = mongoose.model('Customer', CustomerSchema);