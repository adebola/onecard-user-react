import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ServiceProvider from '../Service';
import Loading from './Loading';

import dstv from '../../../../../assets/dstv.png';
import gotv from '../../../../../assets/gotv.png';
import startimes from '../../../../../assets/startime.png';
import { GlobalContext } from '../../../../../context/GlobalProvider';

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

const Four = ({
	cardNumber,
	serviceName,
	setServiceName,
	setCardNumber,
	selected,
	setSelected,
}) => {
	const { airtimeId, setAirtimeId } = useContext(GlobalContext);

	const cable = [
		{ id: 1, data: 'DSTV', img: dstv },
		{ id: 2, data: 'GOTV', img: gotv, filter: true },
		{ id: 3, data: 'STARTIMES', img: startimes },
	];

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!cardNumber) return;
		if (cardNumber.length === 11) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [cardNumber]);

	return (
		<div>
			<ServiceProvider
				filter='true'
				airtimeId={airtimeId}
				setAirtimeId={setAirtimeId}
				setServiceName={setServiceName}
				serviceName={serviceName}
				data={cable}
				id='true'
			/>
			{airtimeId !== 0 && (
				<InputDiv
					placeholder='Enter card number'
					maxLength={(airtimeId === 1 || airtimeId === 2) && '11'}
					value={cardNumber}
					onChange={({ target }) =>
						setCardNumber(target.value.replace(/[^0-9]/g, ''))
					}
				/>
			)}

			{airtimeId !== 0 && loading && (
				<Loading
					cardNumber={cardNumber}
					selected={selected}
					setSelected={setSelected}
					cableType={serviceName}
				/>
			)}
		</div>
	);
};

export default Four;
