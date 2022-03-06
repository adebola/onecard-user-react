import axios from './noauthaxios';

export const getDataPlans = (each) => {
	return axios.get(`/recharge/plans/${each}`);
};

export const makeSingleRecharge = (data) => {
	return axios.post('/recharge', data);
};
export const getSingleRechargeResponse = (id) => {
	return axios.get(`/recharge/${id}`);
};
