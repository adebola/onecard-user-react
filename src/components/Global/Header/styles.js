import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';
import {
	HideHamburger,
	LandingPage,
	LandingPageResponsive,
	MobileResponsive,
} from '../../../responsive/responsive';

export const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	padding: 1rem 2rem;
	z-index: 100;
	${({ toggle }) => (toggle ? 'background: rgba(255, 255, 255, 0.9)' : null)};
	transition: all 0.25s;

	${({ scroll }) => {
		return (
			scroll &&
			css`
				/* background: rgba(255, 255, 255, 0.8); */
				background: rgba(0, 0, 0, 0.5);
				transition: all 0.25s;
			`
		);
	}}

	${MobileResponsive({ padding: '.5rem' })}
`;

export const Inner = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const LogoContainer = styled.div`
	${LandingPage({ flex: '0.1' })};
`;

export const Logo = styled.img`
	width: 80px;
	${LandingPage({ width: '80px' })}
	${MobileResponsive({ width: '60px' })}
`;

export const NavContainer = styled.div`
	display: flex;
	justify-content: center;
	flex: 2;
	align-items: center;
	/* background: blue; */
	/* ${LandingPage({ flex: '1.6' })} */
	${LandingPageResponsive({ display: 'none' })}
`;

export const NavMenu = styled.ul``;

export const NavItem = styled(NavLink)`
	text-decoration: none;
	margin: 0 7px;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: 21px;
	color: var(--text-color);
`;

export const Responsive = styled.div`
	flex: 0.5;
	${LandingPageResponsive({ display: 'none' })}
`;

export const ButtonContainer = styled.div`
	border: 1px solid var(--btn-color);
	border-radius: 30px;
	height: 45px;
	overflow: hidden;
	/* width: 50%; */
	margin-left: auto;
`;
export const SignIn = styled.button`
	/* padding: 1rem; */
	background: var(--btn-color);
	outline: none;
	height: 45px;
	border: none;
	color: var(--white);
	width: 50%;
	cursor: pointer;
	font-size: 17px;
	font-style: normal;
	font-weight: 500;
	line-height: 21px;

	&:hover {
		opacity: 0.9;
	}
`;

export const SignUp = styled(SignIn)`
	color: var(--text-color);
	background-color: var(--white);

	&:hover {
		background: var(--light-background);
	}
`;

export const HamburgerDiv = styled.div`
	color: var(--text-color);
	display: flex;
	align-items: center;
	${HideHamburger({ display: 'none' })}
`;

export const MenuList = styled.div`
	position: fixed;
	top: 60px;
	left: 0;
	height: 65vh;
	width: 100%;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0px 4px 90px 4px rgba(0, 0, 0, 0.1);
	border-radius: 0 0 30px 30px;
	transform: translateY(-130%);
	transition: all 0.3s;
	z-index: 100000;
	&.show {
		transform: translateY(0%);
		transition: all 0.3s;
	}

	${HideHamburger({ display: 'none' })}
`;

export const MenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 70%;
	margin: auto;
	margin-top: 20px;
	display: flex;
	text-align: left;
	align-items: center;
`;

export const MenuItem = styled(NavLink)`
	text-decoration: none;
	margin: 10px 0;
	color: var(--text-color);
	font-size: 19px;
	font-weight: 500;
`;

export const NavSignIn = styled.button`
	background: transparent;
	color: var(--text-color);
	outline: none;
	border: none;
	font-size: 15px;
	margin-right: 10px;
	padding: 0.3rem 0.5rem;
	border: 1px solid var(--btn-color);
	border-radius: 9px;
`;

export const NavSignUp = styled(NavSignIn)`
	color: var(--white);
	background: var(--btn-color);
`;
