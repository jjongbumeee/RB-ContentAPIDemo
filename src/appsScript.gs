/***
* Implements a service that converts Google Spreadsheet to JSON
* without Node.js
* @author DanielJung(danieltiger60@gmail.com)
***/

let data;

/***
* Get number of index from column name
* @param  {string} colName The name(first row data) of column
* @return {number} col The converted number 
***/
function getCol(colName) {
  let col = data[0].indexOf(colName);
  if (col != -1) {
    return col;
  }
}

/***
* Export data(structured data)
* 'category0' value is essential for this function
* @return {string} parsed JSON object 
***/
function exportData() {
  const spreadsheet = SpreadsheetApp.getActive();
  const sheet = spreadsheet.getActiveSheet();
  const headerRows = 1;
  const range = sheet.getDataRange();
  const numRows = range.getNumRows();
  let payload = [];
  data = range.getValues();
  
  for(let i = headerRows; i < numRows; i++) {
    if(data[i][getCol("category0")] === "") continue; //category0
    
    let content = {}, site = "", category = [], tags = [];
    if (data[i][getCol("site")] === "naver-blog") { //site
      content = { rendered: data[i][getCol("fullUrl")], protected: false } //fullUrl
      site = "naver";
    }
    else{
      content = { rendered: data[i][getCol("embedHTML")], protected: false }; //embedHTML
      site = "youtube";
    }
    category.push(data[i][getCol("category0")]);//category0
    category.push(data[i][getCol("category1")]);//category1
    if(data[i][getCol("category2")] != "") //category2
      category.push(data[i][getCol("category2")]);
    if(data[i][getCol("Tag1")] != "") //Tag1
      tags.push(data[i][getCol("Tag1")]);
    
    let formData = {
      'id' : data[i][getCol("category0")],//category0
      'date' : data[i][getCol("createdAt")], //createadAt
      'date_gmt' : data[i][getCol("updatedAt")],//updatedAt
      'type' : site,
      'link' : data[i][getCol("fullUrl")], //fullUrl
      'title' : {
        'rendered' : site + ' ' + data[i][getCol("searchKeyword")] //searchKeyword
      },
      'content' : content,
      'featured_media' : 0,
      'categories' : category,
      'tags' : tags,
      'featured_image_src' : data[i][getCol("thumbnailUrl")] //thumbnailUrl
    }
    payload.push(formData);
  }
  UrlFetchApp.fetch("https://bustling-opus-287006.an.r.appspot.com/upload/contents",{
  'method' : 'post',
  'contentType': 'application/json',
  // Convert the JavaScript object to a JSON string.
  'payload' : JSON.stringify(payload)
})
  Logger.log(payload);
  Browser.msgBox(JSON.stringify(payload));
}

/***
* Export whole data(unstructured data)
* @return {string} parsed JSON object 
***/
function exportSheetData() {
  Logger.clear();
  const spreadsheet = SpreadsheetApp.getActive();
  const sheet = spreadsheet.getActiveSheet();
  const headerRows = 1;
  const range = sheet.getDataRange();
  const numRows = range.getNumRows();
  const numColumns = range.getNumColumns();
  let payload = [];
  data = range.getValues();
  for(let i = headerRows; i < numRows; i++) {
    let formData = {};
    for(let j = 0; j < numColumns; j++) {
      let key = data[0][j].toString();
      let value = data[i][j].toString();
      formData[key] = value;
    }
    payload.push(JSON.stringify(formData));
  }
//  Browser.msgBox(payload.length);
  Browser.msgBox(payload);
  return payload;
}