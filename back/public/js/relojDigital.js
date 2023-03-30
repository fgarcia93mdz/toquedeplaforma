function startTime() {
  var today = new Date();
  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
  hr = (hr == 0) ? 24 : hr;
  hr = (hr > 24) ? hr - 24 : hr;
  //Add a zero in front of numbers<10
  hr = checkTime(hr);
  min = checkTime(min);
  sec = checkTime(sec);
  document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " ";

  var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  var curWeekDay = days[today.getDay()];
  var curDay = today.getDate();
  var curMonth = months[today.getMonth()];
  var curYear = today.getFullYear();
  var date = curWeekDay + " " + curDay + "/" + curMonth + "/" + curYear;
  document.getElementById("date").innerHTML = date;

  var time = setTimeout(function () { startTime() }, 500,);
  
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}