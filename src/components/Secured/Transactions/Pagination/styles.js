import styled from 'styled-components';

export const PaginationPage = styled.div`
	/* background-color: red; */
	display: flex;

	align-items: center;
	justify-content: space-between;
	/* max-width: 93%; */
	margin: auto;
	width: 100%;
	/* background-color: red; */
	/* margin-top: 50px; */
`;

export const BtnContainer = styled.div``;

export const PageDescription = styled.div`
	display: flex;
	align-items: center;
`;

export const StrongFont = styled.p`
	margin: 0px 2px;
	font-size: 14px;
	color: var(--text-color);
	font-weight: 500;
`;

export const LightFont = styled(StrongFont)`
	font-weight: 500;
	font-size: 12px;
`;
