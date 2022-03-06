import styled from 'styled-components/macro';
import { LandingPage } from '../../responsive/responsive';

export const TopContainer = styled.div``;

export const TopInner = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const TopLeft = styled.div`
	font-size: 30px;
	font-style: normal;
	font-weight: 700;
	line-height: 49px;
	text-align: left;
	color: var(--btn-color);
`;

export const StrongText = styled.p`
	${LandingPage({ fontSize: '26px' })}
`;

export const TopRight = styled.div`
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: 21px;
	letter-spacing: 0em;
	text-align: left;
	color: var(--text-color);
`;

export const UserName = styled.p``;
