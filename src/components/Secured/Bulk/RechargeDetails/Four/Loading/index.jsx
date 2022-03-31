import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SyncLoader } from 'react-spinners';
import MySelect from 'react-select';
import { getCardDetails } from '../../../../../../helper/noauthrequests';

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

const FullContainer = styled.div`
	width: 100%;
`;

const Error = styled.p`
	color: red;
	text-align: center;
	font-size: 12px;
	margin-bottom: 18px;
`;

const Loading = ({ cardNumber, cableType, selected, setSelected }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [details, setDetails] = useState([]);
	const [name, setName] = useState('');
	const [error, setError] = useState('');

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

	if (isLoading) {
		return (
			<SpinnerContainer>
				<SyncLoader size={6} color='#EB6A2B' margin={7} />
			</SpinnerContainer>
		);
	} else if (!error) {
		return (
			<FullContainer>
				<MinHeight>
					<Container>
						<Span>Name:</Span>
						<Text> {name}</Text>
					</Container>
					<NewSelect
						value={
							Object.entries(selected).length > 0 ? selected : 'Select a plan'
						}
						placeholder='Select a plan'
						onChange={handleChange}
						options={details}
					/>
				</MinHeight>
			</FullContainer>
		);
	} else {
		return <Error>{error}</Error>;
	}
};

export default Loading;
