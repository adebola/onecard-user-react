import React from 'react';
import {
	BoxOne,
	BoxTwo,
	Button,
	Container,
	Form,
	ImageContainer,
	ImageOne,
	ImageTwo,
	Inner,
	Input,
	Middle,
	SmallTitle,
	Title,
} from './styles';
import card from '../../../../assets/rechargecard.png';

const GetYourCustomized = () => {
	return (
		<Container>
			<Inner>
				<Title>Get Your Customized Recharge Cards</Title>
				<SmallTitle>
					Our multipurpose recharge card (OneCard); available in various
					denominations N50 - N10,000. Also customizable for brands and service
					providers
				</SmallTitle>
				<Middle>
					<BoxOne>
						<Form>
							<Input placeholder='Name' type='text' />
							<Input placeholder='Phone' type='tel' />
							<Input placeholder='Order quantity' type='text' />
							<Input placeholder='Denomination' type='text' />
							<Button>Request Recharge Cards</Button>
						</Form>
					</BoxOne>
					<BoxTwo>
						<ImageContainer>
							<ImageTwo src={card} alt='card' />
							<ImageOne src={card} alt='card' />
						</ImageContainer>
					</BoxTwo>
				</Middle>
			</Inner>
		</Container>
	);
};

export default GetYourCustomized;
