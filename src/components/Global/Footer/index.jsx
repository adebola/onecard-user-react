import React from 'react';
import {
	Container,
	Inner,
	Logo,
	Title,
	LogoContainer,
	SecondBox,
	InputContainer,
	Input,
	Button,
	Left,
	Straight,
	Outer,
	CopyRight,
	Icons,
	Icon,
	FlexInner,
} from './styles';
import logo from '../../../assets/footer.png';

import {
	AiOutlineYoutube,
	AiOutlineInstagram,
	AiOutlineTwitter,
} from 'react-icons/ai';

import { FaFacebookF } from 'react-icons/fa';

const Footer = () => {
	const date = new Date();
	return (
		<Outer>
			<Container>
				<FlexInner>
					<LogoContainer>
						<Logo src={logo} alt='logo' />
					</LogoContainer>
					<SecondBox>
						<Left>
							<Title>Signup For Our Newsletter</Title>
							<InputContainer>
								<Input placeholder='Enter your email' />
								<Button>Subscribe</Button>
							</InputContainer>
						</Left>
					</SecondBox>
				</FlexInner>
			</Container>
			<Straight />
			<Inner>
				<CopyRight>
					Copyright © {date.getFullYear()}. All rights reserved.
				</CopyRight>
				<Icons>
					<Icon>
						<AiOutlineYoutube size={15} />
					</Icon>
					<Icon>
						<AiOutlineInstagram size={15} />
					</Icon>
					<Icon>
						<FaFacebookF size={15} />
					</Icon>
					<Icon>
						<AiOutlineTwitter size={15} />
					</Icon>
				</Icons>
			</Inner>
		</Outer>
	);
};

export default Footer;
