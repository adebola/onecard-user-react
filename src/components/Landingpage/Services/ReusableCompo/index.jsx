import React from 'react';
import UserServices from '../../../../services/UserServices';
import two from '../../../../assets/circle2.png';

import {
	Container,
	ImageContainer,
	ImageCircleContainer,
	ImageCircle,
	Inner,
	Image,
	Bottom,
	Button,
	ButtonContainer,
	BottomText,
	BottomLightText,
} from './styles';

const ReuseableCompo = ({ bg, right, btnText, img, title, subtitle }) => {
	return (
		<Container bg={bg}>
			<Inner>
				<ImageContainer>
					<Image src={img} alt='phone' />
					<ImageCircleContainer right={right}>
						<ImageCircle src={two} alt='two' />
					</ImageCircleContainer>
				</ImageContainer>
				<Bottom>
					<BottomText>{title}</BottomText>
					<BottomLightText>{subtitle}</BottomLightText>
					<ButtonContainer>
						<Button onClick={UserServices.doLogin}>{btnText}</Button>
					</ButtonContainer>
				</Bottom>
			</Inner>
		</Container>
	);
};

export default ReuseableCompo;
