import React from 'react';
import styled from 'styled-components';

const ImageBackground = styled.div`
	height: 700px;
	${({ img }) => {
		return `
		background-image: url(${img});
	`;
	}}

	@media (max-width:768px) {
		height: 900px;
	}

	@media (max-width: 408px) {
		height: ${({ height }) => `${height}px`};
	}
`;

const Background = ({ img, height, children }) => {
	return (
		<ImageBackground height={height} img={img}>
			{children}
		</ImageBackground>
	);
};

export default Background;
