import React from 'react';
import styled from 'styled-components';
import { LandingPage } from '../../../../../responsive/responsive';

import two from '../../../../../assets/circle2.png';
import homebg from '../../../../../assets/woman.png';

const Container = styled.div`
	flex: 1;
	padding: 1rem;
	/* background: red; */

	@media (max-width: 768px) {
		margin: 20px 0;
	}
`;

export const BoxTwo = styled.div`
	flex: 1;
	overflow: hidden;
`;

const ImageContainer = styled.div`
	width: 100%;
	position: relative;
`;

const HeroImg = styled.img`
	width: 87%;
	height: 100%;
	position: relative;
	z-index: 2;
`;

const ImageTwo = styled.img`
	z-index: 2;
	position: absolute;
	transform: translate(20%, 90%);
	${LandingPage({ display: 'none' })}
`;

const Two = () => {
	return (
		<Container>
			<BoxTwo>
				<ImageContainer>
					<ImageTwo src={two} alt='circle2' />
					<HeroImg src={homebg} alt='man' />
				</ImageContainer>
			</BoxTwo>
		</Container>
	);
};

export default Two;
