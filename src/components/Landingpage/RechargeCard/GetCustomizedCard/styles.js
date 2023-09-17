import styled from 'styled-components/macro';
import {
	LandingPage,
	LandingPageResponsive,
} from '../../../../responsive/responsive';

export const Container = styled.div`
	position: relative;
	padding: 3rem;
	background-color: var(--light-background);

	${LandingPage({ padding: '10px', height: '870px' })}
`;

export const Inner = styled.div`
	padding-left: 30px;
	${LandingPage({ padding: '10px' })}
`;

export const Title = styled.p`
	font-size: 48px;
	font-style: normal;
	font-weight: 700;
	/* line-height: 49px; */
	/* text-align: left; */
	color: var(--btn-color);
	margin: 10px 0;
	${LandingPage({ fontSize: '20px' })}
`;

export const SmallTitle = styled.p`
	max-width: 50%;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 19px;
	letter-spacing: 0em;
	color: var(--text-color);
	${LandingPage({ maxWidth: '100%' })}
`;

export const Middle = styled.div`
	display: flex;
	margin-top: 70px;
	gap: 20px;
	${LandingPage({ flexDirection: 'column', gap: '80px' })}
`;

export const BoxOne = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;

export const BoxTwo = styled.div`
	flex: 1;
	position: relative;
	/* height: 300px; */
`;

export const Form = styled.form`
	width: 90%;
	display: flex;
	flex-direction: column;
`;

export const Input = styled.input`
	padding: 1rem;
	margin-bottom: 1rem;
	border-radius: 7px;
	outline: none;
	border: 1px solid var(--text-color);
	background: transparent;
	::placeholder {
		color: var(--text-color);
	}
`;

export const Button = styled.button`
	outline: none;
	border: none;
	padding: 1rem;
	background: var(--btn-color);
	width: 50%;
	border-radius: 9px;
	color: var(--white);
	cursor: pointer;

	&:hover {
		opacity: 0.9;
	}
	${LandingPage({ width: '80%' })}
`;

export const ImageOne = styled.img`
	position: absolute;
	left: 0px;
	/* z-index: 9; */
	top: -30px;
	// transform: translate(10%, 0%);
	${LandingPageResponsive({ width: '70%' })}
`;

export const ImageTwo = styled(ImageOne)`
	/* z-index: 10; */
	transform: translate(25%, 20%);
	left: 0;
`;

export const ImageContainer = styled.div`
	background-color: red;
`;
