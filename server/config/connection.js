const mongoose = require('mongoose');

require('dotenv').config()

//const connectionString = "mongodb+srv://Johan123:O8PaM3qsTozcgxz1@cluster0.untky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const dbURI = process.env.MONGODB_URI ||'mongodb://localhost/medconnect360'

console.log('DB URI', dbURI)

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
