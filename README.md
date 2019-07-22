task-manager app
================

<!--ts-->
Table of contents
-----------------
* [Installation and usage](#installation-and-usage)
* [Technologies covered](#technologies-covered)
  * [mongoose](#mongoose)
  * [MongoDB](#mongodb)
  * [validator](#validator)
<!--te-->

Installation and usage
======================

Clone repository  
```bash
git clone https://github.com/thalesbruno/task-manager
```

On brand new task-manager directory created, run `npm install` to install all project dependencies.  

Technologies covered
====================

mongoose
--------
>Mongoose provides a straight-forward, schema-based solution to model your application data.

Install
```bash
npm i mongoose
```

Usage  
In `./src/db/mongoose.js`:
```javascript
const mongoose = require('mongoose')

// connect to localhost database
mongoose.connect('mongodb://127.0.0.1:27017/db-name', {
  useNewUrlParser: true, 
  useCreateIndex: true,
  useFindAndModify: false
})
// the options provided above are about deprecation warnings: https://mongoosejs.com/docs/deprecations.html
```

In `./src/app.js`:
```javascript
require('./db/mongoose')
```

In `./src/models/resource.js`:
```javascript
const mongoose = require('mongoose')

const Resource = mongoose.Model('Resource', {
  name: {
    type: String,
    require: true
  }
})

module.exports = Resource
```

:page_facing_up: [Read the docs](https://mongoosejs.com/docs/guide.html)

Mongodb
-------
>The official MongoDB driver for Node.js. Provides a high-level API on top of mongodb-core that is meant for end users.

Install
```bash
npm i mongodb
```

Usage
```javascript
const mongodb = require('mongodb')
const { MongoClient } = mongodb
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error('Unable to connect to database')
  }
 
  const db = client.db(dbName)
  
  client.close()
})
```

:page_facing_up: [node.js mongodb driver docs](https://www.npmjs.com/package/mongodb)  
:page_facing_up: [MongoDB database docs](https://docs.mongodb.com)  
:page_facing_up: [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/)  


validator
---------
>A library of string validators and sanitizers.

Install
```bash
npm i validator
```

Usage
```javascript
const validator = require('validator')

// Resource mongoose model, email field:
// ...
email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('e-mail is invalid')
    }
  }
// ...
```

:page_facing_up: [Read the docs](https://www.npmjs.com/package/validator)