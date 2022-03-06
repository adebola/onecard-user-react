import React, { useContext, useState } from 'react';
import ServiceProvider from '../Service';
import mtn from '../../../../../assets/mtn.svg';
import glo from '../../../../../assets/glo.svg';
import mobile from '../../../../../assets/9mobile.svg';
import airtel from '../../../../../assets/airtel.svg';
import ReactInputMask from 'react-input-mask';
import styled from 'styled-components';
import Select from 'react-select';
import Bene from '../Beneficiary';
import { GlobalContext } from '../../../../../context/GlobalProvider';

const airtime = [
	{ id: 1, airtime: 'MTN-AIRTIME', data: 'MTN-DATA', name: 'mtn', img: mtn },
	{
		id: 2,
		airtime: 'AIRTEL-AIRTIME',
		data: 'AIRTEL-DATA',
		name: 'airtel',
		img: airtel,
	},
	{ id: 3, airtime: 'GLO-AIRTIME', data: 'GLO-DATA', name: 'glo', img: glo },
	{
		id: 4,
		airtime: '9MOBILE-AIRTIME',
		data: '9MOBILE-DATA',
		name: '9mobile',
		img: mobile,
	},
];

const Input = styled(ReactInputMask)`
	width: 100%;
	margin: 15px 0;
	height: 50px;
	border: 1px solid var(--text-color);
	border-radius: 4px;
	outline: none;
	padding: 0.5rem;
	color: var(--text-color);
	&::placeholder {
		color: var(--text-color);
	}
`;

const MySelect = styled(Select)`
	border: 1px solid #7f8e97;
	border-radius: 4px;
	background: transparent;
	padding: 5px;
`;

const One = () => {
	const {
		airtimeId,
		phoneNumber,
		setPhoneNumber,
		setSelectedSingleDataPlans,
		selectedSingleDataPlans,
		serviceName,
		setServiceName,
	} = useContext(GlobalContext);

	const [dataPlans, setDataPlans] = useState([]);

	const handelSelectedDataPlans = (e) => {
		setSelectedSingleDataPlans(e);
	};

	return (
		<>
			<ServiceProvider
				setServiceName={setServiceName}
				serviceName={serviceName}
				setDataPlans={setDataPlans}
				data={airtime}
			/>
			{airtimeId !== 0 && (
				<>
					<Bene />
					<MySelect
						value={
							Object.entries(selectedSingleDataPlans).length > 0
								? selectedSingleDataPlans
								: 'Select a plan'
						}
						options={dataPlans}
						onChange={handelSelectedDataPlans}
						placeholder='Select a plan'
						styles={{
							control: () => ({
								backgroundColor: 'transparent',
								display: 'flex',
							}),
						}}
					/>
					<Input
						type='tel'
						maskChar=' '
						onChange={({ target }) => {
							setPhoneNumber(target.value);
						}}
						value={phoneNumber}
						mask='999 9999 9999'
						placeholder='Enter phone number'
					/>
				</>
			)}
		</>
	);
};

export default One;
