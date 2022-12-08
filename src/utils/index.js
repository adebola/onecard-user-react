const isPhoneNumber = (phoneNumber) => {
  const secondDigits = ["9", "8", "7"];
  if (phoneNumber[0] !== "0" || !secondDigits.includes(phoneNumber[1])) {
    return false;
  } else {
    return true;
  }
};

const isAmount = (amount) => {
  const num = Number(amount);
  if (amount[0] === "0" || num > 10000000) {
    return false;
  } else {
    return true;
  }
};

export { isPhoneNumber, isAmount };
