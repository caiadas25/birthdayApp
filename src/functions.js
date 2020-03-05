import db from './firebase/firebaseInit';

function getDatesAsMiliseconds(formattedBirthDate){
  const allDatesInMiliseconds = [formattedBirthDate].map(s => {
    return (moment(s, "DD/MM/YYYY")._d.getTime()) - Date.now();
  });
  return allDatesInMiliseconds;
}

function getDaysInTheFuture(allDatesInMiliseconds) {
  //this checks if the value in milisseconds is positive(in the future), or negative(in the past), and filters just the positive values
  const datesInFutureInMiliseconds = allDatesInMiliseconds.filter(value => value > 0);
  return datesInFutureInMiliseconds;
}

function convertMilisecondsToDate(datesInFutureInMiliseconds) {
  const converted = datesInFutureInMiliseconds.map(n => n + Date.now());
  return converted;
}

function parseDates(converted){
  const parsed = converted.map(n => moment(n).format("DD/MM/YYYY"));
  return parsed;
}

function allDates(pastDaysInMs){
  return (new Date(parseFloat(pastDaysInMs) + Date.now()));
}

function getCurrentDayInDateFormat(){
  let d = new Date();
  d.setHours(0,0,0,0);
  return new Date(d);
}

function isPropertyEmpty(property) {
  return property.length === 0
}

export {
  getDatesAsMiliseconds,
  getDaysInTheFuture,
  convertMilisecondsToDate,
  parseDates,
  allDates,
  getCurrentDayInDateFormat,
  isPropertyEmpty
};
