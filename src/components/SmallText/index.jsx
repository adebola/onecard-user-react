import React from 'react';
import styled from 'styled-components';

export const SmallTitle = styled.p`
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: 16px;
	letter-spacing: 0em;
	text-align: left;
	color: var(--text-color);
	margin: 13px 0;
`;

const SmallText = ({ text }) => {
	return <SmallTitle>{text}</SmallTitle>;
};

export default SmallText;
