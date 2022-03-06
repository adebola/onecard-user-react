import {
	Action,
	Container,
	DetailsContainer,
	Icon,
	ImageAndText,
	ImageTextContainer,
	LightText,
	SendButton,
	StrongText,
	Text,
	TextContainer,
} from './styles';

import { MdDeleteOutline } from 'react-icons/md';
import { useContext } from 'react';
import { ModalContext } from '../../../../../context/ModalProvider';
const SingleBeneficiary = ({ each }) => {
	const { setSendToBeneModal, setName } = useContext(ModalContext);

	return (
		<Container>
			{each?.text ? (
				<TextContainer>
					<Text>{each?.text}</Text>
				</TextContainer>
			) : (
				<TextContainer>
					<Text></Text>
				</TextContainer>
			)}
			<DetailsContainer>
				<ImageAndText>
					<ImageTextContainer>
						<StrongText>
							{each.firstName} {each.lastName}
						</StrongText>
						<LightText>{each.telephone}</LightText>
					</ImageTextContainer>
				</ImageAndText>
				<Action>
					<SendButton
						onClick={() => {
							setName(each.firstName);
							setSendToBeneModal(true);
						}}>
						Send
					</SendButton>
					<Icon>
						<MdDeleteOutline size={22} color='#FF0000' />
					</Icon>
				</Action>
			</DetailsContainer>
		</Container>
	);
};

export default SingleBeneficiary;
