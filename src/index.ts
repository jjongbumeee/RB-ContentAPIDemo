import _ from 'lodash';
import testJSON from '../samplejson/tag.json';
import bodyParser from 'body-parser';
import cors from 'cors';

import dbdata from '../data/accountdata.json';
import { SSL_OP_NO_QUERY_MTU } from 'constants';
import { isNull } from 'util';

const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://epicmobile:" + dbdata.password +
  "@cluster0.qp0wy.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

let goodsArr: any[] = [];
let periodArr: any[] = [];
let limit = 5; // limit 조건이 req.body에 없을 경우 default = 5
let type = { $in: ["naver", "youtube"] }; // type 조건이 req.body에 없을 경우 default = ["naver", "youtube"]
let perpage = 10; // 한 번에 출력되는 page 개수 default = 10
let page = 1; // perpage되는 번호 default = 1(ex.1~10번 결과 출력)

app.route('/staging').post(
  async (req, res) => {
    client.connect(async (err) => {
      let query_req: any[] = []; // categories, tags 조건 => $or 처리 필요하므로 배열 따로 생성
      let tagArr: any[] = [];
      let cateArr: any[] = [];
      let goodsArr: any[] = [];
      let query: any[] = []; // query_req와 type에 대한 조건을 모두 담은 배열
      let perpage: number = 10;
      let page: number = 1;
      let outputArr: any[] = [];
      console.log(req.body);
      let flag: boolean = false;
      if (req.body.tags) {
        for (let i in req.body.tags) {
          tagArr.push(Number(req.body.tags[i]));
        }
        console.log(tagArr);
        query_req.push({ tags: { $in: tagArr } })
      }
      if (req.body.categories) {
        for (let i in req.body.categories) {
          cateArr.push(Number(req.body.categories[i]));
        }
        console.log(cateArr);
        query_req.push({ categories: { $in: cateArr } })
      }
      query.push({ $or: query_req });

      if (req.body.type) {
        query.push({ type: req.body.type });
      }
      else query.push({ type: { $in: ["naver", "youtube"] } });
      
      if (req.body.page != null) {
        page = req.body.page;
      }

      try {
        const goodsCollection = await client.db("test").collection("goods");
        goodsArr = await goodsCollection.find({ }).toArray();
        if (req.body) {
          goodsArr = await goodsCollection.find({ $and: query }).toArray();
        }
        console.log(goodsArr);
      } catch (e) {
        console.log(e);
      } finally {
        for (let i = (perpage * page - perpage) ; i < (perpage * page); i++) {
          if (goodsArr[i]) {
            outputArr.push(goodsArr[i]);
          }
        }
        console.log(goodsArr.length);
        res.send(outputArr);
        console.log(outputArr.length);
      }
      
      client.close();
    });
  }
);
app.route('/goods')
  .get(function (req, res) {

  })
  .post(function (req, res) {
    client.connect(async (err) => {
      const goodsCollection = await client.db("test").collection("goods");  // goods data를 저장한 collection
      // perform actions on the collection object
      console.log(req.body);
      let query: any;
      query = {
        $or:
          [{ tags: { $in: req.body.tags } },
          { categories: { $in: req.body.categories } }]
      }
      if (req.body.limit != null) {
        limit = req.body.limit;
      }
      if (req.body.type != null) {
        type = req.body.type;
      }

      try {
        goodsArr = await goodsCollection.find(query).limit(limit).toArray();
      } catch (e) {
        console.log(e);
      } finally {
        console.log(goodsArr);
      }

      res.send(goodsArr);

      client.close();
    });
  });

app.route('/period')
  .get(function (req, res) {

  })
  .post(function (req, res) {
    client.connect(async (err) => {
      const periodCollection = await client.db("test").collection("period"); // period data를 저장한 collection
      // perform actions on the collection object
      console.log(req.body);
      let query: any;
      query = {
        categories: { $in: req.body.categories }
      }
      if (req.body.limit != null) {
        limit = req.body.limit;
      }
      if (req.body.type != null) {
        type = req.body.type;
      }

      try {
        periodArr = await periodCollection.find(query).limit(limit).toArray();
      } catch (e) {
        console.log(e);
      } finally {
        console.log(periodArr);
      }

      res.send(periodArr);

      client.close();
    });
  });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server is working : PORT - ', port);
});

// let goodsCategoryArr: any[] = []; 
// let goodsTagArr: any[] = [];
// let periodCategoryArr: any[] = []; 

// app.route('/goodscategory') // 품목 카테고리에 따른 url
//   .get(function (req, res) {

//   })
//   .post(function(req, res) {
//     let goodsCategory = [180, 202, 204, 206, 208, 210, 212, 216, 218, 220, 224, 226, 228];
//     // let goodsCategoryArr: any[] = [];
//     for (let c = 0 ; c < goodsCategory.length ; c++) {
//       goodsCategoryArr.push(goodsCategory[c]);
//       for (let i = 0 ; i < goodsData.length ; i++) {
//         for (let j = 0 ; j < 3 ; j++) {
//           if (goodsData[i].categories[j] == goodsCategory[c]) {
//             goodsCategoryArr.push(goodsData[i]);
//           } 
//         }
//       }
//     } 

//     client.connect(async (err) => {
//       const goodsCollection = await client.db("test").collection("goods");  // goods data를 저장한 collection
//       // perform actions on the collection object
//       console.log(req.body);
//       let query: any;
//       query = {
//         $or: 
//         [ {tags: {$in:req.body.tags}},
//           {categories:{$in:req.body.categories}}]
//       }
//       if (req.body.limit != null) {
//         limit = req.body.limit;
//       }
//       if (req.body.type != null) {
//         type = req.body.type;
//       }

//       try {
//         goodsCategoryArr = await goodsCollection.find(query).limit(limit).toArray();
//       } catch(e) {
//         console.log(e);
//       } finally {
//         console.log(goodsCategoryArr);
//       }

//       res.send(goodsCategoryArr);

//       client.close();
//     });
//   });

// app.route('/goodstag') // 품목 태그에 따른 url
//   .get(function(req, res) {

//   })
//   .post(function(req, res) {
//     let goodsTag = [246, 248, 249, 250, 251, 253, 254];
//     // let goodsTagArr: any[] = [];
//     for (let c = 0 ; c < goodsTag.length ; c++) {
//       goodsTagArr.push(goodsTag[c]);
//       for (let i = 0 ; i < goodsData.length ; i++) {
//         for (let j = 0 ; j < 1 ; j++) {
//           if (goodsData[i].tags[j] == goodsTag[c]) {
//             goodsTagArr.push(goodsData[i]);
//           } 
//         }
//       }
//     }

//     client.connect(async (err) => {
//       const goodsCollection = await client.db("test").collection("goods");  // goods data를 저장한 collection
//       // perform actions on the collection object
//       console.log(req.body);
//       let query: any;
//       query = {
//         $or: 
//         [ {tags: {$in:req.body.tags}},
//           {categories:{$in:req.body.categories}}]
//       }
//       if (req.body.limit != null) {
//         limit = req.body.limit;
//       }
//       if (req.body.type != null) {
//         type = req.body.type;
//       }

//       try {
//         goodsTagArr = await goodsCollection.find(query).limit(limit).toArray();
//       } catch(e) {
//         console.log(e);
//       } finally {
//         console.log(goodsTagArr);
//       }

//       res.send(goodsTagArr);

//       client.close();
//     });
//   });

// app.route('/periodcategory') // 시기 카테고리에 따른 url
//   .get(function(req, res) {

//   })
//   .post(function(req, res) {
//     let periodCategory = [182, 184, 186, 188, 190, 192, 194, 196, 198, 200];
//     // let periodCategoryArr: any[] = [];
//     for (let c = 0 ; c < periodCategory.length ; c++) {
//       periodCategoryArr.push(periodCategory[c]);
//       for (let i = 0 ; i < periodData.length ; i++) {
//         for (let j = 0 ; j < 2 ; j++) {
//           if (periodData[i].categories[j] == periodCategory[c]) {
//             periodCategoryArr.push(periodData[i]);
//           } 
//         }
//       }
//     }

//     client.connect(async (err) => {
//       const periodCollection = await client.db("test").collection("period"); // period data를 저장한 collection
//       // perform actions on the collection object
//       console.log(req.body);
//       let query: any;
//       query = {
//         categories:{$in:req.body.categories}
//       }
//       if (req.body.limit != null) {
//         limit = req.body.limit;
//       }
//       if (req.body.type != null) {
//         type = req.body.type;
//       }

//       try {
//         periodCategoryArr = await periodCollection.find(query).limit(limit).toArray();
//       } catch(e) {
//         console.log(e);
//       } finally {
//         console.log(periodCategoryArr);
//       }

//       res.send(periodCategoryArr);

//       client.close();
//     });
//   });