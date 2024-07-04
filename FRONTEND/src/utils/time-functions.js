import moment from "moment";

export const dateFormat = (date) => {
  return moment(date).format("DD.MM.YYYY");
};

export const thisMonth = moment().month() + 1;

export const thisYear = moment().year();

export const dateFormatNormal = (date) => {
  return moment(date).format();
};

export const generateArrayOfYears = (historicalYear) => {
  var max = thisYear;
  var fark = thisYear - historicalYear;
  var min = max - fark;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

const dateNow = new Date(); // Creating a new date object with the current date and time
const year = dateNow.getFullYear(); // Getting current year from the created Date object
const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
const month = // Setting current Month number from current Date object
  monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${monthWithOffset}`
    : monthWithOffset;
const date =
  dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${dateNow.getUTCDate()}`
    : dateNow.getUTCDate();

export const todayDateInput = `${year}-${month}-${date}`;
