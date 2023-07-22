const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://bilpbilp65:bilpbilp@cluster0.evrj1bu.mongodb.net/MERN-expense-tracker')
const connection=mongoose.connection

connection.on('error',err=> console.log(err))

connection.on('connected',err=> console.log('MongoDB COnnection secure'))