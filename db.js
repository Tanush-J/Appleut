const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		const conn = await mongoose.connect('mongodb://localhost:27017/appleut', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		console.log(`MongoDB Connected: ${conn.connection.host}`)
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
}

module.exports = connectDB