const express = require('express')
const app = express()
const port = 5000
const dbConnect = require('./dbConnect')
const userRoute = require('./routes/usersRoute')
app.use(express.json())
const transactionsRoute = require('./routes/transactionsRoute')
app.use('/api/users/', userRoute)
app.use('/api/transactions/', transactionsRoute)

app.listen(port, () => {
  console.log(`Node JS server staerted at port ${port}`)
})