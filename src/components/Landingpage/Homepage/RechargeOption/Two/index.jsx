import React from 'react';
import styled from 'styled-components';
import {
	BoxAndText,
	BoxIcon,
	BoxTwo,
	BoxTwoInner,
	Image,
	ImageContainer,
	LightText,
	RadiusBox,
	StrongLightText,
} from './styles';
import auto from '../../../../../assets/auto.png';
import inst from '../../../../../assets/inst.png';
import schde from '../../../../../assets/schde.png';

const Container = styled.div`
	flex: 1;
	background: var(--btn-color);
	@media (max-width: 768px) {
		margin: 20px 0;
	}
`;

const Two = () => {
	return (
		<Container>
			<BoxTwo>
				<BoxTwoInner>
					<RadiusBox></RadiusBox>
					<RadiusBox right='true'></RadiusBox>
					<ImageContainer>
						<BoxAndText>
							<BoxIcon>
								<Image src={inst} alt='instant' />
							</BoxIcon>
							<StrongLightText>Instant Recharge</StrongLightText>
							<LightText>This allows you to recharge instantly</LightText>
						</BoxAndText>
						<BoxAndText>
							<BoxIcon>
								<Image src={schde} alt='schedule' />
							</BoxIcon>
							<StrongLightText>Scheduled Recharge</StrongLightText>
							<LightText>
								You can set a future date and time for a recharge
							</LightText>
						</BoxAndText>
						<BoxAndText>
							<BoxIcon>
								<Image src={auto} alt='auto' />
							</BoxIcon>
							<StrongLightText>Auto Recharge</StrongLightText>
							<LightText>
								Recharges can be set to automically repeat daily, weekly or
								monthly
							</LightText>
						</BoxAndText>
					</ImageContainer>
				</BoxTwoInner>
			</BoxTwo>
		</Container>
	);
};

export default Two;
