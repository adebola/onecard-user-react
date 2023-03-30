import Swal from "sweetalert2";

const getMessage = (message, error, rm, price, data, type) => {
  if (!error) {
    const dataToDisplay = type === 1 ? data : data.recipients[0];
    const { serviceCode, serviceCost, recipient, productId } = dataToDisplay;

    const msg = type === 1 ? "completed" : "submitted";

    Swal.fire({
      title: message,
      text: `Your ${serviceCode} ${
        type === 1 ? "instant" : type === 2 ? "schedule " : "auto"
      } recharge of ₦${
        productId ? price : serviceCost
      } to ${recipient} was ${msg} successfully.`,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--btn-color)",
    }).then(() => {
      rm();
    });
  } else {
    Swal.fire({
      title: "Error",
      iconColor: "#F27474",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    }).then(() => {
      rm();
    });
  }
};

const getPayStackMessage = ({ msg, error, rm, data, type }) => {
  const { serviceCode, serviceCost, price, recipient, productId } = data;

  if (!error) {
    const msg = type === 1 ? "completed" : "submitted";
    Swal.fire({
      title: msg,
      text: `Your ${serviceCode} ${
        type === 1 ? "instant" : type === 2 ? "schedule " : "auto"
      } recharge of ₦${
        productId ? price : serviceCost
      } to ${recipient} was ${msg} successfully.`,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--btn-color)",
    }).then(() => {
      rm();
    });
  } else {
    Swal.fire({
      title: "Error",
      iconColor: "#F27474",
      text: msg,
      icon: "error",
      confirmButtonText: "OK",
    }).then(() => {
      rm();
    });
  }
};

const getExcelMessage = (msg, err, setShowModal) => {
  if (err) {
    Swal.fire({
      title: "Error",
      iconColor: "#F27474",
      text: msg,
      icon: "error",
      confirmButtonText: "OK",
    }).then(() => {
      setShowModal();
    });
  } else {
    Swal.fire({
      title: msg,
      text: "Your excel file has been uploaded successfully.",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--btn-color)",
    }).then(() => {
      setShowModal();
    });
  }
};

export { getMessage, getPayStackMessage, getExcelMessage };
