import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
	flex: 1;
	padding: 1rem;
	/* background: red; */

	@media (max-width: 768px) {
		margin: 20px 0;
	}
`;

const Inner = styled.div``;

const Two = () => {
	return <Container>Two</Container>;
};

export default Two;
