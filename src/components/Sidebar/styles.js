import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { MobileResponsive } from '../../responsive/mobileresponsive';
// import { SidebarResponsive } from '../../responsive/responsive';

export const Container = styled.div`
	/* flex: 1; */
	background: #124a80;
	height: 100vh;
	position: fixed;
	width: 23%;

	${MobileResponsive({
		display: 'none',
	})}
`;
export const Inner = styled.div`
	padding: 2rem;
`;

export const LogoContainer = styled.div`
	display: flex;
	align-items: start;
	/* justify-content: center; */
	height: 120px;
`;

export const Logo = styled.img``;

export const SidebarContainer = styled.div``;

export const SmallText = styled.p`
	color: rgba(255, 255, 255, 0.5);
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px;
	letter-spacing: 0em;
	text-align: left;
	margin-bottom: 15px;
`;

export const SidebarInner = styled.ul`
	list-style-type: none;
	margin-bottom: 60px;
`;

export const SidebarLinkItem = styled.li`
	margin: 20px 0;
	color: var(--btn-color);
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 21px;
	letter-spacing: 0em;
	text-align: left;
	cursor: pointer;
`;

export const SidebarLink = styled(NavLink)`
	color: #fff;
	font-size: 16px;
	font-style: normal;
	font-weight: 300;
	line-height: 21px;
	letter-spacing: 0em;
	text-align: left;
	text-decoration: none;

	&.active {
		font-weight: 500;
	}
`;
