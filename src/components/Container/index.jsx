import React from 'react';
import styled from 'styled-components';
import { MobileResponsive } from '../../responsive/mobileresponsive';

const InnerContainer = styled.div`
	margin-top: 50px;
	display: flex;
	gap: 20px;

	${MobileResponsive({
		flexDirection: 'column',
	})}
`;

const Container = ({ children }) => {
	return <InnerContainer> {children}</InnerContainer>;
};

export default Container;
