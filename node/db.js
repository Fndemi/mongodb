const { MongoClient } = require('mongodb')
let dbConnection
let uri = 'mongodb+srv://mongoflo:testing123@cluster0.riveki9.mongodb.net/CompanyDB?retryWrites=true&w=majority&appName=Cluster0'
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri).then
      ((client) => {
        dbConnection = client.db()
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection


}