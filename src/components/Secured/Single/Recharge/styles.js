import styled from 'styled-components/macro';

export const RechargeContainer = styled.div`
	padding: 2rem 1.5rem;
	height: 484px;
	width: 100%;
	background: rgba(255, 255, 255, 0.1);
	box-shadow: 0px 4px 90px 4px rgba(0, 0, 0, 0.1);
	border-radius: 20px;
`;

export const SmallText = styled.p`
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 11px;
	letter-spacing: 0em;
	text-align: left;
	color: var(--text-color);
`;

export const RechargeBox = styled.div`
	background: var(--light-background);
	padding: 1.5rem;
	border-radius: 10px;
	margin: 10px 0;
	font-weight: 350;
	cursor: pointer;
	color: var(--text-color);

	&.active {
		background: var(--text-color);
		color: var(--white);
	}
`;

export const RechargeInner = styled.div``;
