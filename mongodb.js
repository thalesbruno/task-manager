const mongodb = require('mongodb')

// const MongoClient = mongodb.MongoClient
const { MongoClient, ObjectID } = mongodb

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


const id = new ObjectID()

console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database')
  }

  // no need to create a database, just use it
  const db = client.db(databaseName)

  // db.collection('users').insertOne({
  //   name: 'Thales',
  //   age: 29
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert document')
  //   }

  //   console.log(result.ops)
  // })

  // db.collection('users').insertMany([
  //   {
  //     name: 'Nietzsche',
  //     age: 45
  //   }, {
  //     name: 'Heigel',
  //     age: 57
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to create documents')
  //   }

  //   console.log(result.ops)
  // })

  // db.collection('tasks').insertMany([{
  //   description: 'buy a monitor',
  //   completed: false
  // }, {
  //   description: 'watch lion king',
  //   completed: false
  // }, {
  //   description: 'translate node.js documentarion',
  //   completed: true
  // }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to create collection')
  //   }

  //   console.log(result.ops)
  // })
})