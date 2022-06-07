export const dateFormat = (params) => {
  if (!params) return;
  const timeDate = params.split(" ");

  if (timeDate[0].includes("T")) {
    const formatTimeAndDate = timeDate[0].split("T");
    const time = convertTime(formatTimeAndDate[1]);
    const d = convertDate(formatTimeAndDate[0]);
    return `${d} ${time}`;
  } else {
    const time = convertTime(timeDate[1]);
    const d = convertDate(timeDate[0]);

    //   let yr, month, day;
    return `${d} ${time}`;
  }
};

export const convertDate = (params) => {
  const dateSplit = params.split("-");
  let months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  return `${dateSplit[2]} ${months[Number(dateSplit[1])]} ${dateSplit[0]}`;
};

export const convertTime = (params) => {
  const splitTime = params.split(":");
  let firstIndex = splitTime[0];
  let timeString, min, splitTimeFormat;

  if (firstIndex === "00") {
    timeString = "12 AM";
  } else {
    timeString = `${firstIndex} AM`;

    if (firstIndex === "12") {
      timeString = `${firstIndex} PM`;
    } else {
      const formatTime = Number(firstIndex) - 12;
      if (formatTime.toString().charAt(0)) {
        timeString = `${formatTime} PM`;
      } else {
        timeString = `0${formatTime} PM`;
      }
    }
  }
  min = splitTime[1];

  splitTimeFormat = timeString.split(" ");

  return `${splitTimeFormat[0]}:${min} ${splitTimeFormat[1]}`;
};
