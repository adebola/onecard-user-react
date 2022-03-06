import React from 'react';
import styled from 'styled-components';
import signup1 from '../../../../../assets/signup1.png';
import signup2 from '../../../../../assets/signup2.png';
const Container = styled.div`
	position: relative;
`;

const Inner = styled.div`
	margin-top: 90px;
`;

const ImageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	top: 0;
	left: 0;
	width: 80%;
	height: 600px;
	height: inherit;
	margin: auto;
	overflow: hidden;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	max-width: 88%;
	transform: ${({ right }) => (right ? 'translateX(-50%)' : 'translateX(50%)')};
`;

const One = () => {
	return (
		<>
			<Container>
				<Inner>
					<ImageContainer>
						<Image src={signup2} alt='two' />
						<Image src={signup1} alt='one' right='true' />
					</ImageContainer>
				</Inner>
			</Container>
		</>
	);
};

export default One;
