var express = require('express');
var server = express();
const path = require('path')
const parser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client){
  if(err) {
    console.log(err);
    return;
  }
  const db = client.db("countries");
  console.log("Connect to database");

// ADD to DB this req ie body.req
  server.post('/api/countries', function(req, res){
    db.collection('wishlist').insert(req.body, function(err, result){
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
        return;
      }
      console.log('saved to database');
      res.status(201);
      res.json(result.ops[0]);
    });
  });

// READ all quotes from DB
  server.get('/api/countries', function(req, res){
    db.collection('wishlist').find().toArray(function(err, result){
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
        return;
      }
      res.json(result);
    });
  });
});
//
// DELETE all quotes from DB
server.delete('/api/countries', function(req, res) {
 db.collection('wishlist').remove({}, function(err, result) {
    if(err) {
     console.log(err);
     res.status(500);
     res.send();
     return;
    }

    console.log("Deleted");
    res.status(204);
    res.send();
   });
 });


server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

server.use(express.static('build'));

server.listen(3000, function(){
  console.log("Listening on port 3000");
});
