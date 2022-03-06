import styled, { css } from 'styled-components/macro';
import { HomepageResponsive } from '../../../responsive/responsive';

export const Container = styled.div`
	/* padding: 3rem; */
	background: var(--light-background);
	${HomepageResponsive({
		paddingLeft: '1rem',
	})};
`;

export const Inner = styled.div`
	padding: 5rem 0;
	display: flex;
	gap: 30px;
	${HomepageResponsive({
		flexDirection: 'column',
		gap: '100px',
	})}
`;

export const BoxOne = styled.div`
	flex: 1;
	display: flex;
	justify-content: end;
	align-items: center;
	${HomepageResponsive({
		justifyContent: 'center',
	})}
`;

export const BoxTwo = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	/* align-items: center; */
	flex-direction: column;
	${HomepageResponsive({
		justifyContent: 'center',
		padding: '0 1.5rem',
	})}
`;

export const ImageContainer = styled.div`
	position: relative;
`;

export const Image = styled.img``;

export const SmallImage = styled.img`
	position: absolute;
	bottom: 0;
	transform: translate(-30%, 20%);
`;

export const Title = styled.p`
	color: var(--text-color);
	font-size: 48px;
	font-style: normal;
	font-weight: 700;
	line-height: 49px;
	letter-spacing: 0em;
	${HomepageResponsive({
		fontSize: '43px',
	})}
`;
