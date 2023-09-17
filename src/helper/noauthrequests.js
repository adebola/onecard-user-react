import axios from "./noauthaxios";

export const getDataPlansNoAuth = (each) => {
  return axios.get(`/recharge/plans/${each}`);
};

export const makeSingleRechargeNoAuth = (data) => {
  return axios.post("/recharge", data);
};
export const getSingleRechargeResponseNoAuth = (id) => {
  return axios.get(`/recharge/${id}`);
};

export const getCardDetails = (data) => {
  return axios.post("/recharge/plans", data);
};

export const makeCableRechargeNoAuth = (data) => {
  return axios.post("/recharge", data);
};

export const makeContactRequest = (data) => {
  return axios.post("/contactus", data);
};
