const express = require('express')
const { ObjectId, MongoClient } = require('mongodb')
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
  let books = []
  db.collection('books')//in the shell we had db.books
    .find() //returns a cursor toArray for Each-iterate each at a time so we cn process 
    .sort({ author: 1 })
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch the documents' })
    })
})

app.get('/books/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .findOne({ _id: new ObjectId(req.params.id) })
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not fetch the documents' })
      })

  }
  else {
    res.status(500).json({ error: 'Not a valid doc id' })
  }



})