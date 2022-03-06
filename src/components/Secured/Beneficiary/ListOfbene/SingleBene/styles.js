import styled from 'styled-components/macro';

export const Container = styled.div`
	display: flex;
	gap: 10px;
	margin: 20px 0;
	align-items: center;
`;

export const TextContainer = styled.div`
	/* background: red; */
	height: 13px;
	width: 7px;
`;

export const Text = styled.p`
	color: var(--text-color);
	font-size: 11px;
	font-style: normal;
	font-weight: 700;
	line-height: 13px;
	letter-spacing: 0em;
	text-align: left;
`;

export const DetailsContainer = styled.div`
	display: flex;
	width: 100%;
	border-radius: 10px;
	padding: 1.3rem;
	background-color: var(--light-background);
	align-items: center;
	justify-content: space-between;
`;

export const ImageAndText = styled.div`
	display: flex;
	align-items: center;
`;

export const ImageTextContainer = styled.div`
	margin-left: 10px;
`;

export const StrongText = styled.p`
	font-size: 11px;
	font-style: normal;
	font-weight: 700;
	line-height: 13px;
	letter-spacing: 0em;
	text-align: left;
	color: var(--text-color);
`;

export const LightText = styled.p`
	font-size: 9px;
	font-style: normal;
	font-weight: 400;
	line-height: 11px;
	letter-spacing: 0em;
	text-align: left;
	color: var(--text-color);
`;

export const Action = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const SendButton = styled.button`
	outline: none;
	border: none;
	background-color: var(--btn-color);
	cursor: pointer;
	padding: 0.3rem 1rem;
	border-radius: 4px;
	color: var(--white);

	&:hover {
		opacity: 0.9;
	}
`;

export const Icon = styled.div`
	display: flex;
	align-items: center;
	height: 30px;
	width: 30px;
	justify-content: center;
	margin-left: 10px;
	cursor: pointer;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 50%;
	}
`;
