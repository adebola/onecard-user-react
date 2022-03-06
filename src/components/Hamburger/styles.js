import styled from 'styled-components/macro';
import { ShowHamburger } from '../../responsive/responsive';

export const Container = styled.div`
	position: fixed;
	z-index: 10;
	left: 0;
	width: 100%;
	/* height: 70px; */
	background: var(--text-color);
	${ShowHamburger({ display: 'none' })}
`;

export const Inner = styled.div`
	display: flex;

	padding: 0.7rem 1rem;
	justify-content: space-between;
	align-items: center;
`;

export const LogoContainer = styled.div`
	width: 60px;
	/* background-color: red; */
`;

export const Logo = styled.img`
	width: 100%;
`;

export const HamburgerDiv = styled.div`
	color: var(--white);
`;
