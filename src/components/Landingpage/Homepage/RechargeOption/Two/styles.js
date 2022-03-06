import styled, { css } from 'styled-components';
import {
	RechargeLastResponsive,
	RechargeResponsive,
} from '../../../../../responsive/responsive';

export const BoxTwo = styled.div`
	flex: 1.6;
	display: flex;
	gap: 20px;
	/* background: red; */
`;

export const BoxTwoInner = styled.div`
	position: relative;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

export const RadiusBox = styled.div`
	position: absolute;
	height: 200px;
	width: 200px;
	top: ${({ right }) => !right && '10%'};
	bottom: ${({ right }) => right && '30px'};
	border-radius: 15px;
	right: ${({ right }) => right && '0'};
	left: ${({ right }) => !right && '0'};
	transform: ${({ right }) => (right ? 'translateX(-66%)' : 'translateX(56%)')};
	border: 2px solid white;

	${RechargeResponsive({ display: 'none' })};
`;

export const ImageContainer = styled.div`
	height: 250px;
	width: 100%;
	background: var(--btn-color);
	z-index: 2;
	display: flex;

	align-items: center;
	justify-content: center;
	gap: 30px;
	${RechargeResponsive({
		// flexDirection: 'column',
		gap: '0',
		alignItems: 'start',
		justifyContent: 'space-between',
		height: 'auto',
		marginTop: '50px',
	})}

	${RechargeLastResponsive({
		flexDirection: 'column',
		gap: '20px',
		alignItems: 'center',
	})}
`;

export const BoxAndText = styled.div`
	display: flex;
	width: 161px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const BoxIcon = styled.div`
	height: 120px;
	width: 120px;
	border-radius: 10px;
	background: #f29e75;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const StrongLightText = styled.p`
	font-size: 12.5px;
	margin-top: 10px;
	color: var(--white);
	font-weight: 590;
	line-height: 18px;
	text-align: center;
`;

export const LightText = styled.p`
	font-size: 10px;
	font-style: normal;
	font-weight: 400;
	letter-spacing: 0em;
	text-align: center;
	color: var(--white);
	margin-top: 10px;
`;

export const Image = styled.img`
	width: 40px;
`;

export const LandingImage = styled.img`
	height: 80px;
	width: 50%;
	${({ abs }) =>
		abs &&
		css`
			position: absolute;
			height: 40px;
			width: 95%;
			left: 5%;
		`};
`;
