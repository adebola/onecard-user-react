import Swal from "sweetalert2";

const notifySuccess = (message, text) => {
  Swal.fire({
    title: message,
    text,
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonColor: "var(--btn-color)",
  });
};

const notifyError = (err) => {
  Swal.fire({
    title: "Error",
    text: err,
    icon: "error",
    confirmButtonText: "Retry",
  });
};

export { notifySuccess, notifyError };
