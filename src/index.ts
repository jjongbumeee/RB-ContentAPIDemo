import _ from 'lodash';
import testJSON from '../samplejson/tag.json';
import bodyParser from 'body-parser';
import cors from 'cors';
import goodsData from '../data/output(goods).json';
import periodData from '../data/output(period).json';

const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.route('/goodscategory')
  .get(function (req, res) {
     
  })
  .post(function(req, res) {
    // let goodsCategory = [180, 202, 204, 206, 208, 210, 212, 216, 218, 220, 224, 226, 228];
    let goodsCategoryArr: any[] = [];
    for (let c = 0 ; c < req.body.goodsCategory.length ; c++) {
      goodsCategoryArr.push(req.body.goodsCategory[c]);
      for (let i = 0 ; i < goodsData.length ; i++) {
        for (let j = 0 ; j < 3 ; j++) {
          if (goodsData[i].categories[j] == req.body.goodsCategory[c]) {
            goodsCategoryArr.push(goodsData[i]);
          } 
        }
      }
    }
    res.send(goodsCategoryArr); 
  });

app.route('/goodstag')
  .get(function(req, res) {
    
  })
  .post(function(req, res) {
    // let goodsTag = [246, 248, 249, 250, 251, 253, 254];
    let goodsTagArr: any[] = [];
    for (let c = 0 ; c < req.body.goodsTag.length ; c++) {
      goodsTagArr.push(req.body.goodsTag[c]);
      for (let i = 0 ; i < goodsData.length ; i++) {
        for (let j = 0 ; j < 1 ; j++) {
          if (goodsData[i].tags[j] == req.body.goodsTag[c]) {
            goodsTagArr.push(goodsData[i]);
          } 
        }
      }
    }
    res.send(goodsTagArr);
  });

app.route('/periodcategory')
  .get(function(req, res) {
    
  })
  .post(function(req, res) {
    // let periodCategory = [182, 184, 186, 188, 190, 192, 194, 196, 198, 200];
    let periodCategoryArr: any[] = [];
    for (let c = 0 ; c < req.body.periodCategory.length ; c++) {
      periodCategoryArr.push(req.body.periodCategory[c]);
      for (let i = 0 ; i < periodData.length ; i++) {
        for (let j = 0 ; j < 2 ; j++) {
          if (periodData[i].categories[j] == req.body.periodCategory[c]) {
            periodCategoryArr.push(periodData[i]);
          } 
        }
      }
    }
    res.send(periodCategoryArr);
  });

/*app.post('/post', function (req, res) {
  let outputArr: any[] = [];
  outputArr.push(req.body.category);
  res.send(req.body.category);
  res.send(outputArr);
});*/

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Server is working : PORT - ',port);
});


