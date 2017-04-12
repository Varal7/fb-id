var express = require('express');
var Facebook = require('./lib/fb-id');
var cors = require('cors')

var appApi = express();
var appFrontend = express();
var facebook = new Facebook();

var portApi = 8001;
var portFrontend = 8002;

appApi.use(cors());

appApi.get('/', function (req, res) {
   var url = req.query.url;
   var cleanUrl = "https://www.facebook.com/" + url.split("facebook.com/")[1]
   facebook.getId(cleanUrl, function(id) {
    res.setHeader('Content-Type', 'application/json');
    if (id == 0) {
    res.status(400);
    res.send(JSON.stringify({ error: "Fb id not found" }));
    } else {
    res.send(JSON.stringify({ id: id }));
    }
   });
})

appFrontend.use(express.static('frontend'));

appApi.listen(portApi, function () {
  console.log('API listening on port ' + portApi);
});

appFrontend.listen(portFrontend, function () {
  console.log('Frontend listening on port ' + portFrontend);
});
