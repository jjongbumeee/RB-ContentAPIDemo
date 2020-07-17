import _ from 'lodash';
import testJSON from '../samplejson/tag.json';
import bodyParser from 'body-parser';
import cors from 'cors';
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/test', function (req, res) {
  res.send(testJSON[0]);
});

app.post('/post', function (req, res) {
    res.send(req.body);
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Server is working : PORT - ',port);
});


