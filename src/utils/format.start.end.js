import { convertDate } from "./dateformat";

export const convertNewDate = (str) => {
  if (str === "") {
    return;
  }
  let yr, month, day, reply;

  str = str.toString();
  let parts = str.split(" ");

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let newDate = parts[0];

  if (isNaN(newDate.charAt(0))) {
    newDate = convertDate(str).split(" ");

    reply = convertNewTime(parts[1]);

    const eachDate = newDate[0].split("-");
    yr = eachDate[0];
    day = eachDate[2];

    if (eachDate[1].charAt(0) === "0") {
      const eachmonth = eachDate[1].slice(1);
      month = months[eachmonth - 1];
    } else {
      month = months[eachDate[1] - 1];
    }

    reply = convertNewTime(newDate[1]);

    //
  } else {
    //
    reply = convertNewTime(parts[1]);
    const eachDate = newDate.split("-");
    yr = eachDate[0];
    day = eachDate[2];

    if (eachDate[1].charAt(0) === "0") {
      const eachmonth = eachDate[1].slice(1);
      month = months[eachmonth - 1];
    } else {
      month = months[eachDate[1] - 1];
    }
  }

  return `${month} ${day}, ${yr} ${reply}`;
};

const convertNewTime = (str) => {
  let text, timeString;

  const firstString = str.split(":")[0];
  const secondString = str.split(":")[1];

  if (firstString === "00") {
    timeString = `12 AM`;
  } else {
    text = Number(firstString);

    if (text < 12) {
      if (text < 10) {
        timeString = `0${text} AM`;
      } else {
        timeString = `${text} AM`;
      }
    } else if (text === 12) {
      timeString = `${text} PM`;
    } else {
      text = text - 12;

      if (text < 10) {
        timeString = `0${text} PM`;
      } else {
        timeString = `${text} PM`;

        if (text === 12) {
          timeString = `${text} AM`;
        }
      }
    }
  }

  return (
    timeString.split(" ")[0] +
    ":" +
    secondString +
    " " +
    timeString.split(" ")[1]
  );
};
