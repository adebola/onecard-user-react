import styled from 'styled-components/macro';

export const Container = styled.div`
	background: rgba(255, 255, 255, 0.7);
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	z-index: 100;
	justify-content: center;

	@media (max-width: 400px) {
		background-color: rgba(0, 0, 0, 0.3);
	}
`;

export const Inner = styled.div`
	width: 400px;
	/* height: 400px; */
	background-color: var(--text-color);
	border-radius: 20px;
	padding: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 400px) {
		background-color: transparent;
	}
`;

export const InnerBox = styled.div`
	background-color: white;
	/* height: 350px; */
	width: 100%;
	/* height: 100%; */
	border-radius: 20px;

	padding: 2rem 1rem;
	margin-right: 10px;
`;

export const Text = styled.p`
	color: var(--btn-color);
	font-size: 26px;
	font-weight: 500;
`;

export const BeneficiaryFlexContainer = styled.div`
	margin-top: 30px;
`;

export const BeneficiaryFlexItem = styled.div`
	padding: 0.5rem;
	background: var(--light-background);
	margin-top: 10px;
`;

export const ScrollBar = styled.div`
	margin-right: 5px;

	max-height: 260px;

	overflow: hidden;
	overflow-y: scroll;
	padding-right: 10px;

	&::-webkit-scrollbar {
		width: 8px;
		margin-block: 20px;
	}

	&::-webkit-scrollbar-track {
		background: rgba(18, 74, 128, 0.1);
		border-radius: 20px;
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(18, 74, 128, 0.5);
		opacity: 0.5;
		border-radius: 20px;
	}
`;

export const DetailsContainer = styled.div`
	display: flex;
	width: 99%;
	border-radius: 10px;
	padding: 0.7rem;
	margin: 5px 0px;
	background-color: var(--light-background);
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	margin-right: 9px;
	&:hover {
		opacity: 0.9;
		/* background-color: var(--btn-color); */
		/* color: #fff; */
	}
`;

export const ImageAndText = styled.div`
	display: flex;
	align-items: center;
	&:hover {
		color: #fff;
	}
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
