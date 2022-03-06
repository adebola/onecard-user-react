import styled from 'styled-components';

import { MobileResponsive } from '../../../../responsive/mobileresponsive';

export const Container = styled.div`
	background: linear-gradient(182.03deg, #eb6a2b 24.15%, #ff0000 128.13%);
	border-radius: 20px;
	padding: 30px 50px 20px 20px;

	color: white;
	height: 301px;
	display: flex;
	flex-direction: column;
	${MobileResponsive({
		width: '400px',
		marginBottom: '40px',
	})}

	@media (max-width: 430px) {
		width: 100%;
	}
`;
export const Top = styled.div`
	margin-bottom: 10px;
`;

export const Middle = styled.div`
	height: 280px;
`;

export const Bottom = styled.div``;

export const OneCard = styled.p`
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: 21px;
	letter-spacing: 0em;
	text-align: left;
`;

export const BalanceText = styled.p`
	font-size: 36px;
	font-style: normal;
	font-weight: 900;
	line-height: 37px;
	letter-spacing: 0em;
	text-align: left;
	flex: 2;
`;

export const DateText = styled.p`
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 16px;
	letter-spacing: 0em;
	text-align: left;
`;
