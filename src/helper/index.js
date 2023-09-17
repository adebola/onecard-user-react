const setAuthId = async (id) => localStorage.setItem("authId", id);

const getAuthId = () => localStorage.getItem("authId");

const removeAuthId = () => localStorage.removeItem("authId");

const setIdDetails = async (details) =>
  localStorage.setItem("details", JSON.stringify(details));

const getIdDetails = () => JSON.parse(localStorage.getItem("details"));

const removeIdDetails = () => localStorage.removeItem("details");

export {
  setAuthId,
  getAuthId,
  removeAuthId,
  setIdDetails,
  removeIdDetails,
  getIdDetails,
};
