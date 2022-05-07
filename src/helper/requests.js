import axios from "./axios";

export const getBalance = () => {
  return axios.get("/account/balance");
};

export const getTransaction = (num) => {
  return axios.get(
    num ? `/transaction/?pageNumber=${num}&pageSize=10` : `/transaction`
  );
};

export const getDataPlans = (each) => {
  return axios.get(`/recharge/plans/${each}`);
};

export const makeSingleRecharge = (data) => {
  return axios.post("/auth-recharge", data);
};

export const getSingleRechargeResponse = (id) => {
  return axios.get(`/auth-recharge/${id}`);
};

export const makeScheduleRecharge = (data) => {
  return axios.post("/auth-recharge/scheduled", data);
};

export const makeBulkRecharge = (data) => {
  return axios.post("/auth-recharge/newbulk", data);
};

export const getBulkRechargeResponse = (id) => {
  return axios.get(`/auth-recharge/newbulk/${id}`);
};

export const fundWallet = (data) => {
  return axios.post("/account/fund", data);
};

export const getFundWalletResponse = (id) => {
  return axios.get(`/account/fund/${id}`);
};

export const getBeneficiary = () => {
  return axios.get("/beneficiary");
};

export const createBeneficiary = (data) => {
  return axios.post("/beneficiary", data);
};

export const deleteBeneficiary = (id) => {
  return axios.delete(`/beneficiary/${id}`);
};

export const makeScheduledRecharge = (data) => {
  return axios.post("/auth-recharge/scheduled", data);
};

export const getScheduledRechargeResponse = (id) => {
  return axios.get(`/auth-recharge/scheduled/${id}`);
};

export const makeBulkRechargeWithExcel = (data) => {
  return axios.post("/auth-recharge/bulkfile", data);
};

export const makeBulkScheduleRechargeWithExcel = (data) => {
  return axios.post("/auth-recharge/schedulefile", data);
};

export const makeCableRecharge = (data) => {
  return axios.post("/auth-recharge", data);
};

//edit requests
export const getUserDetails = () => {
  return axios.get("/user/self");
};

export const passwordRequest = (data) => {
  return axios.put("/user/password", data);
};

export const updateUserDetails = (data) => {
  return axios.put("/user/self", data);
};

export const getUserGeneratedSecret = () => {
  return axios.get("/user/generate");
};

export const getOrganizationDetails = (id) => {
  return axios.get(`/organization/orgusers/${id}`);
};

export const getUserRoles = (id) => {
  return axios.get(`/role/company/${id}`);
};

export const getUserAssignedRoles = (id) => {
  return axios.get(`/role/assignable/${id}`);
};

export const removeUserFromOrganization = (id, data) => {
  return axios.post(`/organization/removeuser/${id}`, data);
};

export const removeUserRoleRequest = (id, data) => {
  return axios.put(`/role/companyremove/${id}`, data);
};

export const addUserRoleRequest = (id, data) => {
  return axios.put(`/role/companyadd/${id}`, data);
};

export const makeAutoRechargeRequest = (data) => {
  return axios.post("/auth-recharge/auto", data);
};

export const getAutoRechargePlans = () => {
  return axios.get("/auth-recharge/getauto");
};

export const getSingleAutoRechargePlan = (id) => {
  return axios.get(`/auth-recharge/auto/${id}`);
};

export const editSingleAutoRechargePlan = (id, data) => {
  return axios.put(`/auth-recharge/auto/${id}`, data);
};

export const deleteSingleAutoRechargePlan = (id) => {
  return axios.delete(`/auth-recharge/auto/${id}`);
};
