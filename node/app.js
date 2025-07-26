const express = require('express')
const { connectToDb, getDb } = require('./db')
//init app & mddleware
const app = express()



//db connection

let db
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('app listening on port 3000')
    })
    db = getDb()
  }
})


//routes
app.get('/books', (req, res) => {
  res.json({ mssage: "Welcome to the api" })
})