import styled from 'styled-components/macro';
import { LandingPage } from '../../../../responsive/responsive';

export const Container = styled.div`
	position: relative;
	margin-top: 200px;
	/* top: 90px; */

	@media (max-width: 768px) {
		height: 370px;
	}
	${LandingPage({ top: '0px' })}
`;

export const Inner = styled.div`
	display: flex;
	width: 90%;
	margin: auto;
	padding: 2rem;
	align-items: center;
	justify-content: center;
	/* height: 500px; */
	/* gap: 20px; */
	/* background: red; */
	margin: 30px;
	/* ${LandingPage({})}; */
`;

export const WImageContainer = styled.div`
	position: relative;
	width: 70%;
	/* display: flex;
	align-items: center;
	justify-content: center; */
	height: 500px;
	${LandingPage({
		alignItems: 'start',
		justifyContent: 'center',
		width: '100%',
	})}
`;

export const ImageOne = styled.img`
	width: 50%;
	position: absolute;
	left: 40%;
	transform: translate(0%, 20%);
	/* top: 30%; */
	/*
	height: 100%;
	object-fit: contain;
	${LandingPage({
		width: '50%',
		margin: 'auto',
		transform: 'translate(0%, -7%)',
	})} */
`;

export const ImageTwo = styled.img`
	width: 50%;
	position: absolute;
	left: 10%;
	transform: translate(0%, 0%);
	top: 0%;
	/* object-fit: contain;
	height: 100%;

	${LandingPage({
		width: '50%',
		margin: 'auto',
		transform: 'translate(-30%, 0%)',
	})} */
`;

export const ImageCircle = styled.img`
	position: absolute;
	/* top: -10%;
	left: 20%;
	*/
	width: 10%;
	right: 0px;
	transform: translate(-50%, 330%);
	z-index: 30;
`;

export const ImageCircleTwo = styled.img`
	position: absolute;

	width: 10%;
	z-index: 30;

	left: 0px;
	transform: translate(50%, -30%);
`;

export const Wrapper = styled.div`
	position: absolute;
	width: 100%;
	/* top: 0; */
`;
