var today = new Date();
var hr = today.getHours();
var min = today.getMinutes();
var sec1 = 0;
var sec2 = 0
hr = (hr == 0) ? 24 : hr;
hr = (hr > 24) ? hr - 24 : hr;
  //Add a zero in front of numbers<10
hr = checkTime(hr);
min = checkTime(min);
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

var hoy = hr + ":" + min + ":" + sec1 + sec2

module.exports = hoy
