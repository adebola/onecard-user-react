import React from 'react';
import styled from 'styled-components';
import {
	RechargeLastResponsive,
	RechargeResponsive,
} from '../../../../../responsive/responsive';

const Container = styled.div`
	flex: 1;
	padding: 1rem;
	height: 380px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--btn-color);
	${RechargeResponsive({ height: 'auto' })}

	@media (max-width: 768px) {
		margin: 20px 0;
	}
`;

const BoxOne = styled.div`
	flex: 1;
	display: flex;
	/* align-items: center; */
	justify-content: center;
	flex-direction: column;
	${RechargeLastResponsive({ marginTop: '30px' })}
`;

const BoxAndDot = styled.div`
	display: flex;
	align-items: center;
	margin-top: 30px;
`;

const StraightLine = styled.div`
	height: 1px;
	width: 150px;
	background: var(--white);
`;

const Dot = styled.div`
	height: 4px;
	width: 4px;
	border-radius: 50%;
	background: var(--white);
`;

const TextContainer = styled.div``;

const SmallText = styled.div`
	font-size: 36px;
	font-style: normal;
	font-weight: 500;
	color: var(--white);
	line-height: 37px;
	letter-spacing: 0em;
`;

const StrongText = styled.span`
	font-size: 36px;
	font-style: normal;
	/* margin-left: 10px; */
	font-weight: 700;
	line-height: 37px;
	letter-spacing: 0em;
	text-align: left;
`;

const One = () => {
	return (
		<Container>
			<BoxOne>
				<TextContainer></TextContainer>
				<SmallText>Recharge options</SmallText>
				<SmallText>
					with <StrongText>OneCard</StrongText>
				</SmallText>
				<BoxAndDot>
					<StraightLine />
					<Dot />
				</BoxAndDot>
			</BoxOne>
		</Container>
	);
};

export default One;
