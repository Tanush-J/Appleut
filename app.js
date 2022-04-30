const express = require('express');
const connectDB = require('./db');

const Customer = require('./models/customer');
const Order = require('./models/orders');
const Product = require('./models/products');

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }))

app.get('/customer', async (req, res) => {
    await Customer.deleteMany({});
    const customer = new Customer({
        name: 'Tanush'
    })
    await customer.save();
    const post = await Customer.find({});
    res.send(post)
    // res.redirect(`/orders/${customer._id}`)
})

app.get('/orders/:id', async (req, res) => {
    const {id} = req.params;
    const post = await Customer.findById(id).populate('data');
    res.send(post.data);
})

app.post('/orders/:id', async (req, res) => {
    const {id} = req.params;
    const {product, quantity} = req.body;

    const cust = await Customer.findById(id);
    const order = new Order({
        orderId: req.body.orderId,
        orderName: req.body.orderName,
        orderDate: Date.now(),
    })
    let i = 0;
    for(let prodct of product){
        let prod = await Product.findOne({productName: prodct});
        prod.quantity = quantity[i];
        await prod.save();
        order.products.push(prod._id);
        await order.save();
        i+=1;
    }
    cust.data.push(order._id);
    cust.save();
})

app.put('/orders/:orderId', async (req, res) => {
    const {orderId} = req.params;
    const {orderName, status} = req.body;

    orderName && await Order.findOneAndUpdate({orderId: orderId},{orderName: orderName})
    status && await Order.findOneAndUpdate({orderId: orderId},{status: status})
})

app.get('/products', async (req, res) => {
    const post = await Order.find({}).populate('products');
    res.send(post);
})

app.post('/products', async (req, res) => {
    const product = new Product({
        skuId: req.body.skuId,
        productName: req.body.prodName,
        quantity: 0,
    })
    await product.save();
})

app.put('/products/:skuid', async (req, res) => {
    const {skuId} = req.params;
    const productName = req.body.prodName
    const qty = req.body.quantity

    productName && await Product.findOneAndUpdate({skuId: skuId},{productName: productName})

    // Not Working && can not update status from here, due to some error in quantity part of code
    qty && await Product.findOneAndUpdate({skuId: skuId},{quantity: qty})
})

app.listen(3000 , () => {
    console.log('Serving on port 3000');
})