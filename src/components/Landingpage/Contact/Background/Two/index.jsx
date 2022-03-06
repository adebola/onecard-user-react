import React from 'react';
import styled from 'styled-components';
import { LandingPage } from '../../../../../responsive/responsive';

import two from '../../../../../assets/circle2.png';

import homebg from '../../../../../assets/contact.png';

const BoxTwo = styled.div`
	flex: 1;
	overflow: hidden;
`;

const ImageContainer = styled.div`
	width: 100%;
	position: relative;
`;

const HeroImg = styled.img`
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 2;
`;

const ImageTwo = styled.img`
	z-index: 2;
	position: absolute;
	transform: translate(70%, 70%);
	${LandingPage({ display: 'none' })}
`;

const Two = () => {
	return (
		<>
			<BoxTwo>
				<ImageContainer>
					<ImageTwo src={two} alt='circle2' />
					<HeroImg src={homebg} alt='man' />
				</ImageContainer>
			</BoxTwo>
		</>
	);
};

export default Two;
