import React from 'react';
import styled, { css } from 'styled-components';
import { LandingPage } from '../../../../../responsive/responsive';

import two from '../../../../../assets/circle2.png';
import get from '../../../../../assets/get.png';

const Top = styled.div`
	display: flex;
	gap: 30px;
	align-items: center;
	width: 90%;
	margin: auto;
	margin-top: 90px;
	${LandingPage({
		flexDirection: 'column',
		paddingTop: '10px;',
		gap: '20px',
	})};
`;

const ImageContainer = styled.div`
	flex: 1;
	width: 90%;
	margin: auto;
	position: relative;
`;

const Image = styled.img`
	width: 100%;
	/* margin: auto; */
`;

const SmallImage = styled.img`
	position: absolute;
	top: -17%;
	right: -7%;
	z-index: 10;
	width: 20%;
`;

const TextContainer = styled.div`
	flex: 1;
	display: flex;
	width: 90%;
	margin: auto;
	flex-direction: column;
	${LandingPage({ fontSize: '20px' })}
`;

const LargeText = styled.p`
	color: var(--text-color);
	font-size: 60px;
	font-style: normal;
	font-weight: 700;
	line-height: 65px;
	letter-spacing: 0em;
	${LandingPage({ fontSize: '20px', lineHeight: '20px' })}
`;

const LightText = styled(LargeText)`
	font-weight: 400;
`;

const NormalText = styled.p`
	font-size: 15px;
	font-style: normal;
	font-weight: 500;
	line-height: 24px;
	letter-spacing: 0em;
	color: var(--text-color);
	width: 90%;
	/* margin: auto; */
	margin: 20px auto;
`;

const LandingImage = styled.img`
	height: 80px;
	width: 50%;
	${({ abs }) =>
		abs &&
		css`
			position: absolute;
			height: 40px;
			width: 95%;
			left: 5%;
		`};
`;

const One = () => {
	return (
		<>
			<Top>
				<ImageContainer>
					<Image src={get} alt='board' />
					<SmallImage src={two} alt='circle' />
				</ImageContainer>
				<TextContainer>
					<LargeText>Get to know</LargeText>
					<LightText>what we offer</LightText>
				</TextContainer>
			</Top>
		</>
	);
};

export default One;
