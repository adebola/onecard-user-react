import styled from 'styled-components';

export const TextAndButton = styled.div`
	position: relative;
	padding: 2rem;
	display: flex;
	align-items: center;
	/* transform: translateY(300%); */
	top: 0;
	/* background-color: red; */
	flex-direction: column;
	justify-content: center;
`;

export const BigText = styled.p`
	font-size: 30px;
	color: var(--text-color);
	font-style: normal;
	font-weight: 500;
	letter-spacing: 0em;
	text-align: center;
`;

export const SignUpButton = styled.button`
	cursor: pointer;
	outline: none;
	border: none;
	background: var(--btn-color);
	border-radius: 6px;
	padding: 1rem 2rem;
	margin-top: 20px;
	color: var(--white);

	&:hover {
		opacity: 0.9;
	}
`;
