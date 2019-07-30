task-manager app
================

<!--ts-->
Table of contents
-----------------
* [Installation and usage](#installation-and-usage)
* [Technologies covered](#technologies-covered)
  * [bcrypt.js](#bcryptjs)
  * [JWT](#jwt)
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

bcrypt.js
---------
>Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser.

Install
```bash
npm i bcryptjs
```

Usage
```javascript
const bcrypt = require('bcryptjs')

const myFunction = async () => {
  const password = 'Red1234!'
  const hashedPassword = await bcrypt.hash(password, 8)
  const isMatch = await bcrypt.compare('red1234!', hashedPassword)
  console.log(isMatch) //true
}

myFunction()
```

:page_facing_up: [Read the docs](https://www.npmjs.com/package/bcryptjs)

JWT
---
>An implementation of JSON Web Tokens.

Usage  

```javascript
const jwt = require('jsonwebtoken')

const myFunction = async () => {
  const token = jwt.sign({ _id: 'abc1234' }, 'thisisjustanexample', { expiresIn: '7 days' })
  console.log(token)
  
  const data = jwt.verify(token, 'thisisjustanexample')
  console.log(data)
}

myFunction()
```

>The token is divided in three parts separated by periods. Like in:  
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjM0IiwiaWF0IjoxNTY0MTM5MDc3fQ.mZGpzs5WnvxPRQ3ZCjOSfW9poOnMunUHcHYi51ugL4o`  
The first piece is a base64 encoded json string, known as the header contains the metadata about the token itself, like
the type of and the algorithm used for its creation;  
The second piece, known as the body or payload, also a base64 encoded json string contains the data that we provided
(in our the the _id);  
The last piece contains the signature used to verify the token.  

:page_facing_up: [NPM | jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  
:page_facing_up: [RFC 7519 | JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519)  

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

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  }
})

const Resource = mongoose.model('Resource', resourceSchema)

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

:arrow_up:[Back to top](#table-of-contents)
