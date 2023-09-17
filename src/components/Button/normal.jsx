import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
	/* width: 100%; */
`;

const ButtonInner = styled.button`
	cursor: pointer;
	width: 100%;
	outline: none;
	border: none;
	background: var(--btn-color);
	padding: 0.9rem 1rem;
	border-radius: 7px;
	color: var(--white);
	font-size: 14px;
	${({ myStyle }) => {
		return { ...myStyle };
	}}

	&:hover {
		background-color: #dd5c1c;
	}

	&:disabled {
		opacity: 0.5;
		cursor: default;
	}

	&.not-allowed {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const Button = ({ onClick, className, disabled, name, type, myStyle }) => {
	return (
		<ButtonContainer>
			<ButtonInner
				className={className}
				disabled={disabled}
				myStyle={myStyle}
				onClick={onClick}
				type={type}>
				{name}
			</ButtonInner>
		</ButtonContainer>
	);
};

export default Button;
