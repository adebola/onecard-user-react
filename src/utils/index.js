const isPhoneNumber = (phoneNumber, selectedId) => {
  if (selectedId === 5 || selectedId === 6) {
    return true;
  }

  // return;

  const secondDigits = ["9", "8", "7"];

  if (phoneNumber) {
    const firstDigit = phoneNumber[0];
    const secondDigit = phoneNumber[1];

    if (firstDigit === "0" && secondDigits.includes(secondDigit)) {
      return true;
    } else {
      return false;
    }
  }

  // if (phoneNumber[0] !== "0" || !secondDigits.includes(phoneNumber[1])) {
  //   console.log("no");
  //   return false;
  // } else {
  //   console.log("yes");
  //   return true;
  // }
};

const isAmount = (amount) => {
  const num = Number(amount);
  if (amount[0] === "0" || num > 10000000) {
    return false;
  } else {
    return true;
  }
};

const isPositive = (number) => {
  const numericValue = parseFloat(number);
  return !isNaN(numericValue) && numericValue > 0 && number.indexOf(0) !== 0;
};

export { isPhoneNumber, isAmount, isPositive };
