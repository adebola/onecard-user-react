import React, { useState, useEffect } from 'react';
import {
	ButtonContainer,
	Container,
	HamburgerDiv,
	Inner,
	Logo,
	LogoContainer,
	MenuContainer,
	MenuItem,
	MenuList,
	NavContainer,
	NavItem,
	NavMenu,
	NavSignIn,
	NavSignUp,
	Responsive,
	SignIn,
	SignUp,
} from './styles';

import UserServices from '../../../services/UserServices';

import { Squash as Hamburger } from 'hamburger-react';

import logo from '../../../assets/lightlogo.svg';

const Header = () => {
	const [toggle, setToggle] = useState(false);
	const [scroll, setScroll] = useState(false);

	useEffect(() => {
		const getScroll = () => {
			if (window.scrollY > 50) {
				setScroll(true);
				if (toggle) {
					setScroll(false);
				} else {
					setScroll(true);
				}
			} else {
				setScroll(false);
			}
		};
		window.addEventListener('scroll', getScroll);
		return () => window.removeEventListener('scroll', getScroll);
	}, [scroll, toggle]);

	useEffect(() => {
		if (toggle) {
			setScroll(false);
		}
	}, [toggle, scroll]);

	return (
		<Container scroll={scroll} toggle={toggle}>
			<Inner>
				<LogoContainer>
					<Logo src={logo} alt='logo' />
				</LogoContainer>
				<NavContainer>
					<NavMenu>
						<NavItem to='/'>Home</NavItem>
						<NavItem to='/services'>Services</NavItem>
						<NavItem to='/recharge'>Recharge Cards</NavItem>
						<NavItem to='/contact'>Contact</NavItem>
						{/* <NavItem to='/blog'>Blog</NavItem> */}
					</NavMenu>
				</NavContainer>
				<Responsive>
					<ButtonContainer>
						<SignIn onClick={UserServices.doLogin}>Sign In</SignIn>
						<SignUp onClick={UserServices.doRegister}>Sign Up</SignUp>
					</ButtonContainer>
				</Responsive>

				<HamburgerDiv>
					<NavSignIn onClick={UserServices.doLogin}>Sign In</NavSignIn>
					<NavSignUp onClick={UserServices.doRegister}>Sign Up</NavSignUp>
					<Hamburger
						size={25}
						hideOutline={true}
						toggled={toggle}
						toggle={setToggle}
					/>
				</HamburgerDiv>
				<MenuList className={toggle && 'show'}>
					<MenuContainer>
						<MenuItem to='/'>Home</MenuItem>
						<MenuItem to='/services'>Services</MenuItem>
						<MenuItem to='/recharge'>Recharge Cards</MenuItem>
						<MenuItem to='/contact'>Contact</MenuItem>
						{/* <MenuItem to='/blog'>Blog</MenuItem> */}
					</MenuContainer>
				</MenuList>
			</Inner>
		</Container>
	);
};

export default Header;
