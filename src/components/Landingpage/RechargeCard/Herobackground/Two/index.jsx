import React from 'react';
import styled from 'styled-components';
import { LandingPage } from '../../../../../responsive/responsive';

import two from '../../../../../assets/rechargecard.png';
import homebg from '../../../../../assets/rechargeman.png';

const BoxTwo = styled.div`
	flex: 1;
	width: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ImageContainer = styled.div`
	width: 100%;
	position: relative;
	height: 100%;
`;

const HeroImg = styled.img`
	width: 100%;
	/* width: 700px; */
	height: 100%;
	object-fit: contain;
	position: relative;
	z-index: 2;
`;

const ImageRechargeContainer = styled.div`
	padding: 30px;
	position: absolute;
	z-index: 3;
	/* top: 90px; */
	/* width: 260px; */
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	/* background: red; */
	/* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
	/* box-shadow: 1px 18px 30px 0px rgba(0,0,0,0.75);
-webkit-box-shadow: 1px 18px 30px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 1px 18px 30px 0px rgba(0,0,0,0.75); */
	filter: drop-shadow(0px 18px 10px rgba(18, 74, 128, 0.4));
	${LandingPage({
		// display: 'none',
	})}
`;

const ImageTwo = styled.img`
	width: 40%;
	transform: translate(29%, 43%);
`;

const Two = () => {
	return (
		<>
			<BoxTwo>
				<ImageContainer>
					<ImageRechargeContainer>
						<ImageTwo src={two} alt='circle2' />
					</ImageRechargeContainer>
					<HeroImg src={homebg} alt='man' />
				</ImageContainer>
			</BoxTwo>
		</>
	);
};

export default Two;
