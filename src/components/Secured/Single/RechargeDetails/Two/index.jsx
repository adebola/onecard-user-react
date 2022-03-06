import React, { useState, useEffect, useContext } from 'react';
import ServiceProvider from '../Service';
import mtn from '../../../../../assets/mtn.svg';
import glo from '../../../../../assets/glo.svg';
import mobile from '../../../../../assets/9mobile.svg';
import airtel from '../../../../../assets/airtel.svg';
import ReactInputMask from 'react-input-mask';
import styled from 'styled-components';
import Button from '../../../../Button/normal';
import ModePayment from '../../../../PaymentType';
import { GlobalContext } from '../../../../../context/GlobalProvider';
import {
	makeScheduledRecharge,
	makeSingleRecharge,
} from '../../../../../helper/requests';
import { ModalContext } from '../../../../../context/ModalProvider';
import { convertDate } from '../../../../../utils/dateformat';

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

const NormalInput = styled.input`
	width: 100%;
	height: 50px;
	margin-top: 15px;
	border: 1px solid var(--text-color);
	border-radius: 4px;
	outline: none;
	padding: 0.5rem;
	color: var(--text-color);
	&::placeholder {
		color: var(--text-color);
	}
`;

const Form = styled.form``;

const Two = () => {
	const [btnDisabled, setBtnDisabled] = useState(false);
	const [serviceName, setServiceName] = useState('');
	const [authUrl, setAuthUrl] = useState('');

	const {
		singlePhoneNumber,
		singleAmount,
		setSingleAmount,
		setSinglePhoneNumber,
		paymentMode,
		setResponseMessage,
		startDate,
	} = useContext(GlobalContext);

	const { setResponseModal, setResponseDetail, rechargeType } =
		useContext(ModalContext);

	useEffect(() => {
		if (authUrl !== '') {
			window.location = authUrl;
			return;
		}
		return;
	}, [authUrl]);

	const disabled = singlePhoneNumber === '' || singleAmount === '';

	const handleSubmit = async (e) => {
		e.preventDefault();
		setBtnDisabled(true);

		if (btnDisabled) {
			return;
		}

		let data;
		let localData;

		const scheduledDate = convertDate(startDate);

		if (rechargeType === 2) {
			if (paymentMode === 'wallet') {
				console.log('Wallet');
				data = {
					serviceCost: singleAmount,
					recipient: singlePhoneNumber.replace(/\D+/g, ''),
					paymentMode,
					rechargeType: 'single',
					scheduledDate,
					serviceCode: serviceName,
				};
				const dataToDisplay = {
					amount: singleAmount,
					recipient: singlePhoneNumber,
				};
				setResponseDetail(dataToDisplay);
			} else {
				data = {
					serviceCost: singleAmount,
					recipient: singlePhoneNumber.replace(/\D+/g, ''),
					paymentMode,
					serviceCode: serviceName,
					scheduledDate,
					rechargeType: 'single',
					redirectUrl: `${window.origin}${window.location.pathname}`,
				};
				localData = {
					amount: singleAmount,
					recipient: singlePhoneNumber,
				};
			}

			try {
				const response = await makeScheduledRecharge(data);
				if (response.data.authorizationUrl !== null) {
					setAuthUrl(response.data.authorizationUrl);
					localStorage.setItem('id', JSON.stringify(response.data.id));
					localStorage.setItem('data', JSON.stringify(localData));
					localStorage.setItem('type', JSON.stringify(rechargeType));
					setBtnDisabled(false);
					resetAllValue();
					return;
				} else {
					setResponseModal(true);
					setBtnDisabled(false);
					resetAllValue();
					setResponseMessage('SUCCESS');
				}
			} catch (error) {
				setResponseModal(true);
				setResponseMessage('Something went wrong, please try again');
				setBtnDisabled(false);
			}
		} else {
			if (paymentMode === 'wallet') {
				data = {
					serviceCost: singleAmount,
					recipient: singlePhoneNumber.replace(/\D+/g, ''),
					paymentMode,
					serviceCode: serviceName,
				};
				const dataToDisplay = {
					amount: singleAmount,
					recipient: singlePhoneNumber,
				};
				setResponseDetail(dataToDisplay);
			} else {
				data = {
					serviceCost: singleAmount,
					recipient: singlePhoneNumber.replace(/\D+/g, ''),
					paymentMode,
					serviceCode: serviceName,
					redirectUrl: `${window.origin}${window.location.pathname}`,
				};
				localData = {
					amount: singleAmount,
					recipient: singlePhoneNumber,
				};
			}
			try {
				const response = await makeSingleRecharge(data);
				if (response.data.authorizationUrl !== null) {
					setAuthUrl(response.data.authorizationUrl);
					localStorage.setItem('id', JSON.stringify(response.data.id));
					localStorage.setItem('data', JSON.stringify(localData));
					setBtnDisabled(false);
					resetAllValue();
					return;
				} else {
					setResponseModal(true);
					setBtnDisabled(false);
					resetAllValue();
					setResponseMessage('SUCCESS');
				}
			} catch (error) {
				setResponseModal(true);
				setResponseMessage('Something went wrong, please try again');
				setBtnDisabled(false);
			}
		}
	};

	const resetAllValue = () => {
		setSinglePhoneNumber('');
		setSingleAmount('');
	};

	return (
		<Form onSubmit={handleSubmit}>
			<ServiceProvider
				data={airtime}
				serviceName={serviceName}
				setServiceName={setServiceName}
			/>
			<NormalInput
				placeholder='Enter amount'
				type='number'
				value={singleAmount}
				onChange={({ target }) => {
					setSingleAmount(target.value);
				}}
			/>
			<Input
				type='tel'
				maskChar=' '
				value={singlePhoneNumber}
				onChange={({ target }) => {
					setSinglePhoneNumber(target.value);
				}}
				mask='999 9999 9999'
				placeholder='Enter phone number'
			/>

			<ModePayment />
			<Button
				className={btnDisabled && 'not-allowed'}
				disabled={disabled}
				name='Submit'
				type={'submit'}
			/>
		</Form>
	);
};

export default Two;
