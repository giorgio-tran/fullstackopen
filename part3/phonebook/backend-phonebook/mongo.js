const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://giorgio808:${password}@cluster0.v27tswu.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})
const personName = process.argv[3]
const personNumber = process.argv[4]

const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')
        const person = new Person({
            name: personName,
            number: personNumber,
        })
        console.log(
            `added ${personName} number ${personNumber}`
        )
        
        return person.save()
    })
    .then(() => {
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))