const mongodb = require('mongodb')

// const MongoClient = mongodb.MongoClient
const { MongoClient, ObjectID } = mongodb

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database')
  }

  // no need to create a database, just use it
  const db = client.db(databaseName)

  db.collection('tasks').deleteOne({ description: "translate node.js documentation" })
    .then((result) => console.log(result.deletedCount))
    .catch((error) => console.error(error))

  client.close()
})