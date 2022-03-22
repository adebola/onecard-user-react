import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ServiceProvider from '../Service';
import Loading from './Loading';

import dstv from '../../../../../assets/dstv.png';
import gotv from '../../../../../assets/gotv.png';
import starttimes from '../../../../../assets/startime.png';

const InputDiv = styled.input`
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

const Four = () => {
	const cable = [
		{ id: 1, type: 'dstv', img: dstv },
		{ id: 2, type: 'gotv', img: gotv, filter: true },
		{ id: 3, type: 'starttimes', img: starttimes, width: '20' },
	];

	const [serviceName, setServiceName] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!cardNumber) return;
		if (cardNumber.length === 12) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [cardNumber]);

	return (
		<div>
			<ServiceProvider
				filter='true'
				setServiceName={setServiceName}
				serviceName={serviceName}
				data={cable}
				id='true'
			/>
			<InputDiv
				placeholder='Enter card number'
				maxLength='12'
				value={cardNumber}
				onChange={({ target }) =>
					setCardNumber(target.value.replace(/[^0-9]/g, ''))
				}
			/>
			{loading && <Loading />}
		</div>
	);
};

export default Four;
