task-manager app
================

<!--ts-->
Table of contents
-----------------
* [Installation and usage](#installation-and-usage)
* [Technologies covered](#technologies-covered)
  * [MongoDB](#mongodb)
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

Mongodb
-------
>MongoDB description

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

:page_facing_up: [Read the docs](https://www.npmjs.com/package/mongodb)  
:page_facing_up: [MongoDB database docs](https://docs.mongodb.com)  
:page_facing_up: [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/)  
