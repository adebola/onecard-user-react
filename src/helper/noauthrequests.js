import axios from "./noauthaxios";

export const getDataPlans = (each) => {
  return axios.get(`/recharge/plans/${each}`);
};

export const makeSingleRecharge = (data) => {
  return axios.post("/recharge", data);
};
export const getSingleRechargeResponse = (id) => {
  return axios.get(`/recharge/${id}`);
};

export const getCardDetails = (data) => {
  return axios.post("/recharge/plans", data);
};

export const makeCableRecharge = (data) => {
  return axios.post("/recharge", data);
};

export const makeContactRequest = (data) => {
  return axios.post("/contactus", data);
};
