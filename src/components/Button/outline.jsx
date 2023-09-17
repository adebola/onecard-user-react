import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div``;

const ButtonInner = styled.button`
	cursor: pointer;
	width: 100%;
	outline: none;
	background: white;
	padding: 0.9rem 1rem;
	border-radius: 7px;
	color: var(--btn-color);
	font-size: 14px;

	border: 1px solid var(--btn-color);

	${({ myStyle }) => {
		return { ...myStyle };
	}}
	&:hover {
		background-color: var(--light-background);
	}

	&:disabled {
		opacity: 0.5;
	}
`;

const OutlineButton = ({ name, onClick }) => {
	return (
		<ButtonContainer>
			<ButtonInner onClick={onClick}>{name}</ButtonInner>
		</ButtonContainer>
	);
};

export default OutlineButton;
