const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
	// eslint-disable-next-line no-unused-vars
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB', error.message)
	})


const val = [
	{ validator: function(v) {
		return v.length >= 8 && v.length <= 15
	}, message: 'Length of phone number must be between 8-15 characters' },
	{ validator: function(v) {
		//if - is present, it needs to be at index 2 or index 3
		return !((v.indexOf('-') < 2 && v.indexOf('-') !== -1) || v.indexOf('-') > 3)
	}, message: 'Inadequate placement of `-` in phone number' }
]

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		validate: val,
		required: true
	}
})

//mongoose's _id is an object, so need to convert everything to string just to be safe
personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		//
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)