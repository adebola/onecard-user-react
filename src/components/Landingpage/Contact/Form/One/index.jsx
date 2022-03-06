import React from 'react';
import styled from 'styled-components';

const BoxOne = styled.div`
	flex: 1;
	width: 100%;
`;

const FormContainer = styled.form`
	width: 100%;
	margin: auto;
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	padding: 1rem;
	border-radius: 6px;
	outline: none;
	border: none;
	border: 1px solid var(--text-color);
	margin-bottom: 10px;
	&::placeholder {
		color: var(--text-color);
	}
`;

const Textarea = styled.textarea`
	border: 1px solid var(--text-color);
	height: 100px;
	margin-bottom: 20px;
	padding: 1rem;
	border-radius: 6px;

	&::placeholder {
		color: var(--text-color);
	}
`;

const Button = styled.button`
	padding: 1.5rem;
	border-radius: 6px;
	cursor: pointer;
	outline: none;
	border: none;
	background-color: var(--btn-color);
	color: var(--white);

	&:hover {
		opacity: 0.9;
	}
`;

const One = () => {
	return (
		<>
			<BoxOne>
				<FormContainer>
					<Input placeholder='Name' />
					<Input placeholder='Email' />
					<Input placeholder='Phone' />
					<Textarea placeholder='Message' />
					<Button>Send</Button>
				</FormContainer>
			</BoxOne>
		</>
	);
};

export default One;
