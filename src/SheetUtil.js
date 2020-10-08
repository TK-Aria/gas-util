function MoveSheetToFirst()
{
  SpreadsheetApp.getActiveSpreadsheet().moveActiveSheet(1);
}

function ReplaceNOW()
{
  var range = SpreadsheetApp.getActiveRange();
  var values = range.getDisplayValues();
  
  var now = new Date();
  var now_string = (now.getMonth() + 1) + "/" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes();
  
  Logger.log(now.getDay());
  
  for(var r = 0, r_l = values.length; r < r_l; r++)
  {
    for(var c = 0, c_l = values[r].length; c < c_l; c++)
    {
      values[r][c] = values[r][c].replace(/_NOW_/g, now_string);
    }
  }
  
  range.setValues(values);
}