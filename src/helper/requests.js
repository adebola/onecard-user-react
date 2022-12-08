import axios from "./axios";

export const getBalance = () => {
  return axios.get("/account/balance");
};

export const getTransaction = (num) => {
  return axios.get(
    num ? `/transaction/?pageNumber=${num}&pageSize=20` : `/transaction`
  );
};

export const getDataPlans = (type) => {
  return axios.get(`/recharge/plans/${type}`);
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
  return axios.post("/auth-recharge/bulk", data);
};

export const getBulkRechargeResponse = (id) => {
  return axios.get(`/auth-recharge/bulk/${id}`);
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

export const makeBulkAutoRechargeWithExcel = (data) => {
  return axios.post("/auth-recharge/auto/file", data);
};

export const makeBulkRechargeWithExcel = (data) => {
  return axios.post("/auth-recharge/bulk/file", data);
};

export const makeBulkScheduleRechargeWithExcel = (data) => {
  return axios.post("/auth-recharge/scheduled/file", data);
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

export const getAutoRechargePlans = (num = 1) => {
  return axios.get(`/auth-recharge/auto/list?pageNumber=${num}&pageSize=20`);
};

export const getSingleAutoRechargePlan = (id) => {
  return axios.get(`/auth-recharge/auto/${id}`);
};

export const getSingleAutoRechargePlanBulk = (id) => {
  return axios.get(`/auth-recharge/auto/bulk/${id}`);
};

export const editSingleAutoRechargePlan = (id, data) => {
  return axios.put(`/auth-recharge/auto/${id}`, data);
};

export const deleteSingleAutoRechargePlan = (id) => {
  return axios.delete(`/auth-recharge/auto/${id}`);
};

export const getAllSingleRequest = (num = 1) => {
  return axios.get(`/auth-recharge/singlelist?pageNumber=${num}&pageSize=20`);
};

export const getSingleDetail = (id) => {
  return axios.get(`/auth-recharge/single/${id}`);
};

export const searchSingleDetail = (query, num = 1) => {
  return axios.get(
    `/auth-recharge/single/searchrecipient?searchString=${query}&pageNumber=${num}&pageSize=20`
  );
};

export const getAllBulkRequest = (num = 1) => {
  return axios.get(`/auth-recharge/bulk/list?pageNumber=${num}&pageSize=20`);
};

export const searchByDate = (data) => {
  return axios.post("/auth-recharge/bulk/searchdate", data);
};

export const searchByDateSchedule = (data) => {
  return axios.post("/auth-recharge/scheduled/searchdate", data);
};

export const searchByName = (query) => {
  return axios.get(`/auth-recharge/auto/searchname?name=${query}`);
};

export const searchByDateAuto = (data) => {
  return axios.post("/auth-recharge/auto/searchdate", data);
};

export const getBulkDetail = (id, num = 1) => {
  return axios.get(
    `/auth-recharge/bulk/individual/${id}?pageNumber=${num}&pageSize=20`
  );
};

export const getAllScheduledRequest = (num = 1) => {
  return axios.get(
    `/auth-recharge/scheduled/list?pageNumber=${num}&pageSize=20`
  );
};

export const getAllScheduledRequestDetail = (id, num = 1) => {
  return axios.get(
    `/auth-recharge/scheduled/individual/${id}?pageNumber=${num}&pageSize=20`
  );
};

export const downloadExcelBulk = (id) => {
  return axios.get(`/auth-recharge/bulk/download/${id}`, {
    responseType: "blob",
  });
};

export const downloadExcelSchedule = (id) => {
  return axios.get(`/auth-recharge/scheduled/download/${id}`, {
    responseType: "blob",
  });
};

export const downloadExcelAuto = (id) => {
  return axios.get(`/auth-recharge/bulk/download/${id}`, {
    responseType: "blob",
  });
};

export const retryRequest = (id) => {
  return axios.get(`/auth-recharge/bulk/retry/${id}`);
};

export const transactionExcelDownload = (data) => {
  return axios.post(`/transaction/print`, data, {
    responseType: "blob",
  });
};

export const downloadSingleTransactions = (data) => {
  return axios.post(`/auth-recharge/single/download `, data, {
    responseType: "blob",
  });
};

export const downloadBulkTransactions = (data) => {
  return axios.post(`/auth-recharge/bulk/download `, data, {
    responseType: "blob",
  });
};

export const downloadScheduledTransactions = (data) => {
  return axios.post(`/auth-recharge/scheduled/download`, data, {
    responseType: "blob",
  });
};

export const downloadAutoTransactions = (data) => {
  return axios.post(`/auth-recharge/auto/download`, data, {
    responseType: "blob",
  });
};

export const getWalletFunding = (num = 1) => {
  return axios.get(`/account/wallet?pageNumber=${num}&pageSize=20`);
};

export const singleAutoRechargePlanBulk = (id, num = 1) => {
  return axios.get(
    `/auth-recharge/auto/bulk/${id}?pageNumber=${num}&pageSize=20`
  );
};

export const bulkSearchBy = (data) => {
  return axios.post(`/auth-recharge/bulk/individual/search`, data);
};

export const verifyUser = (id) => {
  return axios.get(`/user/verify/${id}`);
};

export const transferFund = (data) => {
  return axios.post("/account/transfer", data);
};

export const makeSingleSearchRequest = (data, num = 1) => {
  return axios.post(
    `/auth-recharge/single/search?pageNumber=${num}&pageSize=20`,
    data
  );
};
