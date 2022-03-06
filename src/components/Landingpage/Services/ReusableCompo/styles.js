import styled, { css } from 'styled-components/macro';
import { LandingPage } from '../../../../responsive/responsive';

export const Container = styled.div`
	position: relative;
	z-index: 30;
	background: ${({ bg }) => (bg ? 'var(--light-background)' : 'var(--white)')};
	padding: 2rem;
	${LandingPage({ padding: '1rem' })}
`;

export const Inner = styled.div`
	position: relative;
	height: 800px;
	display: flex;
	width: 90%;
	align-items: center;
	margin: auto;
	justify-content: center;
	${LandingPage({ width: '100%', height: '600px' })}
`;

export const ImageContainer = styled.div`
	width: 70%;
	position: absolute;
	/* height: 400px; */
	${LandingPage({ width: '80%' })}
`;

export const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const ImageCircleContainer = styled.div`
	position: absolute;
	width: 100px;
	border-radius: 50%;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	right: 0;
	transform: translate(50%, -300%);
	${({ right }) =>
		right &&
		css`
			left: 0;
			transform: translate(-50%, -300%);
		`}
`;

export const ImageCircle = styled.img`
	position: absolute;
	width: 100%;
	z-index: 30;
`;
export const ButtonContainer = styled.div`
	width: 40%;
	position: absolute;
	bottom: 0;
	transform: translateY(50%);
	${LandingPage({ width: '60%' })}
`;

export const Button = styled.button`
	padding: 1.2rem 0rem;
	width: 100%;
	outline: none;
	border: none;
	font-size: 17px;
	color: var(--white);
	border-radius: 7px;
	cursor: pointer;
	background: var(--btn-color);
	${LandingPage({ padding: '1rem', fontSize: '15px' })}
`;

export const Bottom = styled.div`
	position: absolute;
	height: 180px;
	padding: 0.5rem;
	background: var(--text-color);
	border-radius: 10px;
	width: 90%;
	bottom: 0;
	transform: translateY(-80%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	${LandingPage({
		width: '100%',
		height: 'auto',
		transform: 'translateY(-64%)',
	})}
`;

export const BottomText = styled.p`
	font-size: 36px;
	font-style: normal;
	font-weight: 700;
	line-height: 37px;
	letter-spacing: 0em;
	text-align: center;
	color: var(--white);
	margin-bottom: 20px;
	${LandingPage({ fontSize: '15px', fontWeight: '500', width: '70%' })}
`;

export const BottomLightText = styled.p`
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 21px;
	letter-spacing: 0em;
	color: var(--white);
	text-align: center;
	${LandingPage({ fontSize: '10px', lineHeight: '10px', marginBottom: '60px' })}
`;
