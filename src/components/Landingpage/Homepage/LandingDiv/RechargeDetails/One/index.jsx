import React, { useContext, useState, useEffect } from 'react';
import ServiceProvider from '../Service';
import mtn from '../../../../../../assets/mtn.svg';
import glo from '../../../../../../assets/glo.svg';
import mobile from '../../../../../../assets/9mobile.svg';
import airtel from '../../../../../../assets/airtel.svg';
import ReactInputMask from 'react-input-mask';
import styled from 'styled-components';
import Button from '../../../../../Button/normal';
import Select from 'react-select';
import { GlobalContext } from '../../../../../../context/GlobalProvider';
import { ModalContext } from '../../../../../../context/ModalProvider';
import { makeSingleRecharge } from '../../../../../../helper/noauthrequests';

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

const Form = styled.form``;

const One = () => {
	const [dataPlans, setDataPlans] = useState([]);
	const [serviceName, setServiceName] = useState('');
	const [authUrl, setAuthUrl] = useState('');
	const [btnDisabled, setBtnDisabled] = useState(false);

	const { setResponseModal } = useContext(ModalContext);

	const {
		singlePhoneNumber,
		setSinglePhoneNumber,
		selectedSingleDataPlans,
		setSelectedSingleDataPlans,
		setResponseMessage,
	} = useContext(GlobalContext);

	useEffect(() => {
		if (authUrl !== '') {
			window.location = authUrl;
			return;
		}
		return;
	}, [authUrl]);

	const handelSelectedDataPlans = (e) => {
		setSelectedSingleDataPlans(e);
	};

	const disabled =
		singlePhoneNumber === '' ||
		Object.entries(selectedSingleDataPlans).length === 0;

	const handleSubmit = async (e) => {
		e.preventDefault();

		let localData;
		setBtnDisabled(true);
		if (btnDisabled) return;
		const data = {
			recipient: singlePhoneNumber.replace(/\D+/g, ''),
			productId: selectedSingleDataPlans.id,
			paymentMode: 'paystack',
			serviceCode: serviceName,
			redirectUrl: `${window.origin}${window.location.pathname}`,
		};
		localData = {
			amount: selectedSingleDataPlans.value,
			recipient: singlePhoneNumber,
		};

		try {
			const response = await makeSingleRecharge(data);

			if (response.data.authorizationUrl !== null) {
				setAuthUrl(response.data.authorizationUrl);
				localStorage.setItem('id', JSON.stringify(response.data.id));
				localStorage.setItem('data', JSON.stringify(localData));
				setBtnDisabled(false);
				resetAllValue();
				return;
			}
		} catch (e) {
			setResponseModal(true);
			setResponseMessage('Something went wrong, please try again');
			setBtnDisabled(false);
		}
	};

	const resetAllValue = () => {
		setSelectedSingleDataPlans({});
		setSinglePhoneNumber('');
	};

	return (
		<Form onSubmit={handleSubmit}>
			<ServiceProvider
				setServiceName={setServiceName}
				serviceName={serviceName}
				setDataPlans={setDataPlans}
				data={airtime}
				mb='true'
			/>
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
				onChange={({ target }) => {
					setSinglePhoneNumber(target.value);
				}}
				type='tel'
				maskChar=' '
				value={singlePhoneNumber}
				mask='999 9999 9999'
				placeholder='Enter phone number'
			/>

			<Button
				className={btnDisabled && 'not-allowed'}
				disabled={disabled}
				name='Submit'
				type={'submit'}
			/>
		</Form>
	);
};

export default One;
