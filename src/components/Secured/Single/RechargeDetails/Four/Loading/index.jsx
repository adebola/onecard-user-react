import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { SyncLoader } from 'react-spinners';
import MySelect from 'react-select';
import MyStyledButton from '../../../../../MyStyledButton';
import { getCardDetails } from '../../../../../../helper/noauthrequests';
import { makeCableRecharge } from '../../../../../../helper/requests';
import { GlobalContext } from '../../../../../../context/GlobalProvider';
import { convertDate } from '../../../../../../utils/dateformat';
import { ModalContext } from '../../../../../../context/ModalProvider';
import ModePayment from '../../../../../PaymentType/index';

const Container = styled.div`
	background-color: var(--light-background);
	padding: 10px;
	border-radius: 4px;
	display: flex;
	align-items: center;
`;

const SpinnerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 15px;
`;

const MinHeight = styled.div`
	height: 150px;
`;

const Text = styled.div`
	color: var(--text-color);
	text-transform: uppercase;
	font-size: 12px;
`;

const Span = styled.div`
	font-size: 12px;
	font-weight: 500;
	margin-right: 3px;
	color: var(--text-color);
`;

const NewSelect = styled(MySelect)``;

const FullContainer = styled.form`
	width: 100%;
`;

const Error = styled.p`
	color: red;
	text-align: center;
	font-size: 12px;
`;

const Loading = ({ cardNumber, cableType }) => {
	const [btnDisabled, setBtnDisabled] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [details, setDetails] = useState([]);
	const [selected, setSelected] = useState({});
	const [name, setName] = useState('');
	const [error, setError] = useState('');

	const [authUrl, setAuthUrl] = useState('')
	const { startDate, paymentMode } = useContext(GlobalContext);
	const { rechargeType } = useContext(ModalContext);

	useEffect(() => {
		if(authUrl !== ''){
			window.location = authUrl;
			return;
		}
		return;
	}, [authUrl])

	useEffect(() => {
		const data = {
			recipient: cardNumber,
			serviceCode: cableType,
		};
		const awaitResponse = async () => {
			const response = await getCardDetails(data);

			if (response.data.status === 400) {
				setError('User with card number not found, please try again');
				setIsLoading(false);
				return;
			}
			setName(response.data.customerName);
			setDetails(
				response.data.object.map((each, index) => {
					return {
						label: `${each.name} ${each.price}`,
						value: `${each.name} ${each.price}`,
						id: index,
						...each,
					};
				})
			);
			setIsLoading(false);
			setError('');
		};
		awaitResponse();
	}, [cardNumber, cableType]);

	const handleChange = (e) => {
		setSelected(e);
	};

	const handleSubmit = async (e) => {
		setBtnDisabled(true);
		e.preventDefault();
		const scheduledDate = convertDate(startDate);
		let data;
		if (rechargeType === 2) {
			data = {
				recipient: cardNumber,
				name: selected.name,
				serviceCost: selected.price,
				productId: selected.code,
				scheduledDate,
				paymentMode,
				serviceCode: cableType,
			};
		} else {
			data = {
				recipient: cardNumber,
				name: selected.name,
				serviceCost: selected.price,
				productId: selected.code,
				serviceCode: cableType,
				paymentMode
			};
		}

		try {
			const response = await makeCableRecharge(data);
			console.log(response);
			setBtnDisabled(false)
			if(response.data.authorizationUrl){
				setBtnDisabled(false)
				console.log(response);
				setAuthUrl(response.data.authorizationUrl)
			}

		} catch (error) {
			console.log(error);
		}
	};

	const disabled = Object.entries(selected).length === 0;

	if (isLoading) {
		return (
			<SpinnerContainer>
				<SyncLoader size={6} color='#EB6A2B' margin={7} />
			</SpinnerContainer>
		);
	} else if (!error) {
		return (
			<FullContainer onSubmit={handleSubmit}>
				<MinHeight>
					<Container>
						<Span>Name:</Span>
						<Text> {name}</Text>
					</Container>
					<NewSelect
						placeholder={
							Object.entries(selected).length === 0 && 'Select a plan'
						}
						onChange={handleChange}
						options={details}
					/>
				</MinHeight>

			<ModePayment />
				<MyStyledButton
					clicked={btnDisabled}
					disabled={disabled}
					name='Submit'
					myStyles={{ width: '100%' }}
				/>
			</FullContainer>
		);
	} else {
		return <Error>{error}</Error>;
	}
};

export default Loading;
