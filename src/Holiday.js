function test1() {
  var date = new Date('2016/11/3');

  if(isBusinessDay(date)){
     Logger.log('働きなさい');
  }else{
     Logger.log('休みなさい');
  }
}

function test2() {
  var date = new Date('2016/11/3');

  if(isWeekDay(date)){
     Logger.log('平日');
  }else{
     Logger.log('土日');
  }
}

function isWeekDay(date){
  if (date.getDay() == 0 || date.getDay() == 6) {
    return false;
  }
  return true;
}

function isBusinessDay(date){
  if (date.getDay() == 0 || date.getDay() == 6) {
    return false;
  }
  var calJa = CalendarApp.getCalendarById('ja.japanese#holiday@group.v.calendar.google.com');
  if(calJa.getEventsForDay(date).length > 0){
    return false;
  }
  return true;
}
