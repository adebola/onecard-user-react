import styled from 'styled-components/macro';
import { LandingPage } from '../../../../responsive/responsive';

export const Container = styled.div`
	/* padding: 2rem; */
	position: relative;
	top: 60px;
`;

export const Inner = styled.div`
	margin-top: 4rem;
	width: 90%;
	margin: auto;
`;

export const Text = styled.p`
	font-size: 40px;
	font-style: normal;
	font-weight: 700;
	line-height: 45px;
	letter-spacing: 0em;
	text-align: center;
	max-width: 70%;
	margin: auto;
	color: var(--btn-color);
	${LandingPage({ maxWidth: '100%', fontSize: '20px', lineHeight: '20px' })}
`;

export const GridContainer = styled.div`
	/* display: grid; */
	/* grid-template-columns: repeat(4, 1fr); */ */
	width: 100%;
	gap: 20px;
	/* 
	/* margin: auto; */
	margin: 30px auto;
	justify-content: space-between;
	display: flex;
	/* background:red; */
	flex-wrap: wrap;
	${LandingPage({ width: '100%', gap: '30px' })}
`;

export const Grid = styled.div`
	height: 120px;
	width: 120px;
	background: var(--light-background);
	border-radius: 8px;
	display: flex;
	/* margin: 20px; */
	align-items: center;
	justify-content: center;
`;

export const Image = styled.img`
	width: 40%;
	height: 100%;
	object-fit: contain;
`;

export const GridText = styled.p`
	width: 80px;
	text-align: center;
	margin: auto;
	margin-top: 20px;
	color: var(--text-color);
`;

export const GridImageAndText = styled.div`
	/* text-align: center; */
`;
