import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	/* padding: ${({ padding }) => (padding ? padding : '2rem')}; */
	background: ${({ bg }) => (bg ? bg : null)};
	display: flex;
	position: relative;
	display: flex;
	align-items: center;
	gap: 25px;
	${({ top }) => {
		return top && `top: 100px;`;
	}}
	@media (max-width: 768px) {
		flex-direction: column;
		padding: 1rem;

		${({ top }) => {
			return top && `top: 80px;`;
		}}
		gap: 40px;
	}
`;

const NoAuthContainer = ({ top, bg, padding, children }) => {
	return (
		<Container bg={bg} padding={padding} top={top}>
			{children}
		</Container>
	);
};

export default NoAuthContainer;
