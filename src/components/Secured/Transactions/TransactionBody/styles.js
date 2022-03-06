import styled from 'styled-components';

export const TransactionView = styled.div`
	@media (max-width: 768px) {
		display: none;
	}
`;

export const Inner = styled.div`
	max-width: 100%;
	margin: auto;
	/* background: red; */
	/* height: 420px; */
`;

export const GridContainer = styled.div`
	display: grid;
	padding: 1rem;
	grid-template-columns: repeat(5, 1fr);
	justify-items: center;

	@media (max-width: 768px) {
		padding: 0rem 0.7rem;
	}
`;

export const GridItemHeader = styled.div`
	color: var(--btn-color);
	font-size: 11px;
	font-style: normal;
	font-weight: 700;
	line-height: 13px;
	letter-spacing: 0em;
	text-align: left;
	margin-bottom: 25px;
`;

export const InnerGrid = styled.div`
	padding: 0.5rem;
	/* margin: 0 1.5rem; */
	background: var(--light-background);
	border-radius: 20px;
	margin-bottom: 10px;
`;

export const GridItem = styled.div`
	color: var(--text-color);
	font-size: 11px;
	font-style: normal;
	font-weight: 400;
	line-height: 13px;
	letter-spacing: 0em;
	text-align: left;
`;

export const ResponsiveItem = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0.2rem;
	color: var(--text-color);
	font-size: 11px;
	font-style: normal;
	font-weight: 400;
	line-height: 13px;
	letter-spacing: 0em;
	text-align: left;
`;
