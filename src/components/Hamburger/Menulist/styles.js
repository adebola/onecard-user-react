import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';
import { ShowHamburger } from '../../../responsive/responsive';

export const Container = styled.div`
	height: 80vh;
	position: fixed;
	z-index: 11;
	right: 0;
	top: 71px;
	width: 100%;
	border-radius: 0 0 15px 15px;
	background-color: var(--text-color);
	transform: translateY(-120%);
	opacity: 0.95;
	transition: all 0.5s ease-in;

	display: flex;
	align-items: center;
	justify-content: center;
	&.show {
		transform: translateY(0%);
		transition: all 0.5s ease-in;
	}

	${ShowHamburger({ display: 'none' })}
`;

export const Inner = styled.div`
	width: 90%;
	/* background-color: red; */
	margin: auto;
	padding: 2rem;
	color: var(--white);
	/* height: 600px; */
`;

export const Top = styled.div``;

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

export const LinkMenu = styled.ul`
	list-style-type: none;
	margin-bottom: 60px;
`;

export const LinkItem = styled.li`
	margin: 20px 0;

	${({ logout }) => {
		return (
			logout &&
			css`
				color: var(--btn-color);
				font-weight: 500;
			`
		);
	}}
`;

export const SideLink = styled(NavLink)`
	color: #fff;
	font-size: 16px;
	font-style: normal;
	font-weight: 300;
	line-height: 21px;
	letter-spacing: 0em;
	text-align: left;
	text-decoration: none;

	&.active {
		font-weight: 700;
	}
`;
