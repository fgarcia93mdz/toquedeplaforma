// create a new `Date` object
var today = new Date();

// `getDate()` returns the day of the month (from 1 to 31)
var day = today.getDate();

// `getMonth()` returns the month (from 0 to 11)
var month = + (today.getMonth() + 1);

// `getFullYear()` returns the full year
var year = today.getFullYear();

// output today's date in `MM/DD/YYYY` format
const date = `${year}-${month}-${(day - 1)}`

// document.querySelector('.date h1').innerHTML = date

module.exports = date;

