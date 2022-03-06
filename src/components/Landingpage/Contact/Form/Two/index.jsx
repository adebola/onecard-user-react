import React from 'react';
import form from '../../../../../assets/contactwe.jpg';

import { MdOutlineLocationOn, MdOutlineEmail } from 'react-icons/md';
import {
	AiOutlineYoutube,
	AiOutlineTwitter,
	AiOutlineInstagram,
} from 'react-icons/ai';
import { BiPhoneCall } from 'react-icons/bi';
import { FaFacebookF } from 'react-icons/fa';
import styled from 'styled-components';

const BoxTwo = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin: auto;
	flex-direction: column;
`;

const ImageContainer = styled.div`
	width: 86%;
	border-radius: 20px;
	overflow: hidden;
`;

const Image = styled.img`
	width: 100%;
`;

const TextBox = styled.div`
	display: flex;
	/* align-items: center; */
	margin-top: 30px;
	/* justify-content: center; */
	/* background-color: red; */
	width: 86%;
`;

const Icon = styled.div`
	color: var(--btn-color);
	margin-right: 10px;
`;

const SmallText = styled.p`
	font-size: 14px;
	color: var(--btn-color);
`;

const Two = () => {
	return (
		<>
			<BoxTwo>
				<ImageContainer>
					<Image src={form} alt='form' />
				</ImageContainer>
				<TextBox>
					<Icon>
						<MdOutlineLocationOn />
					</Icon>
					<SmallText>
						Information technologies building, Victoria Island, Lagos Nigeria
					</SmallText>
				</TextBox>
				<TextBox>
					<Icon>
						<BiPhoneCall />
					</Icon>
					<SmallText>+234 811-236-4568</SmallText>
				</TextBox>
				<TextBox>
					<Icon>
						<MdOutlineEmail />
					</Icon>
					<SmallText>hello@info.com.ng</SmallText>
				</TextBox>
				<TextBox>
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
				</TextBox>
			</BoxTwo>
		</>
	);
};

export default Two;
