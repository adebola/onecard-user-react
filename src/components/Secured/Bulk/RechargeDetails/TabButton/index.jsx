import React from 'react';
import styled from 'styled-components';
const Container = styled.div``;

const Inner = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	width: 170px;
`;

const NavItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	/* z-index: 3; */
	width: 85px;
	font-size: 11px;
	font-weight: 500;
	padding: 0.6rem 0.3rem;
	color: var(--text-color);
	cursor: pointer;
	&.active {
		font-weight: 600;
	}

	&:hover {
		background-color: var(--light-background);
	}
`;

const Underline = styled.div`
	height: 2px;
	width: 100%;

	position: absolute;
	bottom: 0px;
	background: var(--light-background);
	border-radius: 10px;
	background: #e7bea7;
`;

const Stroke = styled.div`
	position: absolute;
	bottom: 0;
	height: 2px;
	border-radius: 10px;
	background: var(--btn-color);
	width: 85px;
	transition: all 0.3s ease;
	left: ${(props) => `${props.left}px`};
`;

const Hover = ({ onClickOne, onClickTwo, id, left }) => {
	return (
		<Container>
			<Inner>
				<NavItem className={id === 1 && 'active'} onClick={onClickOne}>
					Manual Entry
				</NavItem>
				<NavItem className={id === 2 && 'active'} onClick={onClickTwo}>
					Upload a file
				</NavItem>
				<Underline />
				<Stroke left={left} />
			</Inner>
		</Container>
	);
};

export default Hover;
