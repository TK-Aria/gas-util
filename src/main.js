function doGet() {
  
  var url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010'; //URL+cityID
  var res = UrlFetchApp.fetch(url);
  var object = JSON.parse(res.getContentText()); 
  Logger.log(object);
  
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  response.setContent(JSON.stringify(res.getContentText()));
  return response; 
}