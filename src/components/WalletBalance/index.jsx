import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context/GlobalProvider';
import { getBalance } from '../../helper/requests';
import { formatBalance } from '../../utils/formatBalance';

const Balance = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
`;

const LightText = styled.p`
	font-size: 10px;
	font-weight: 400;
	color: var(--text-color);
`;

const StrongText = styled.p`
	color: var(--text-color);
	font-size: 10px;
	font-weight: 700;
	margin-left: 3px;
`;

const WalletBalance = () => {
	const { balance, setBalance } = useContext(GlobalContext);
	useEffect(() => {
		const awaitResponse = async () => {
			try {
				const res = await getBalance();
				setBalance(res.data.balance);
			} catch (error) {
				console.error(error);
			}
		};
		awaitResponse();
	}, [setBalance]);
	return (
		<>
			<Balance>
				<LightText>Wallet Balance:</LightText>

				<StrongText>&#x20A6;{formatBalance(balance)}</StrongText>
			</Balance>
		</>
	);
};

export default WalletBalance;
