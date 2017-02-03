var express = require('express');
var Facebook = require('./lib/fb-id');
var cors = require('cors')

var app = express();
var facebook = new Facebook();

app.use(cors());

app.get('/', function (req, res) {
   var url = req.query.url;
   facebook.getId(url, function(id) {
    res.setHeader('Content-Type', 'application/json');
    if (id == 0) {
    res.status(400);
    res.send(JSON.stringify({ error: "Fb id not found" }));
    } else {
    res.send(JSON.stringify({ id: id }));
    }
   });
})

var server = app.listen(8001, '127.0.0.1' , function () {
//var server = app.listen(8001, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("App listening at http://%s:%s", host, port)
})
