import React, { useContext } from 'react';

import { GlobalContext } from '../../context/GlobalProvider';
import {
	Container,
	Inner,
	InnerBox,
	Text,
	DetailsContainer,
	ImageAndText,
	ImageTextContainer,
	StrongText,
	LightText,
	ScrollBar,
} from './styles';

const BeneficiaryModal = () => {
	const { bene, setPhoneNumber, setBeneModal } = useContext(GlobalContext);

	const handleClick = (each) => {
		setPhoneNumber(each.telephone);
		setBeneModal(false);
	};

	return (
		<Container>
			<Inner>
				<InnerBox>
					<Text>Beneficiary</Text>
					<ScrollBar>
						{bene.slice(5, bene.length).map((each) => {
							return (
								<DetailsContainer
									key={each.id}
									onClick={() => handleClick(each)}>
									<ImageAndText>
										<ImageTextContainer>
											<StrongText>
												{each.firstName} {each.lastName}
											</StrongText>
											<LightText>{each.telephone}</LightText>
										</ImageTextContainer>
									</ImageAndText>
								</DetailsContainer>
							);
						})}
					</ScrollBar>
				</InnerBox>
			</Inner>
		</Container>
	);
};

export default BeneficiaryModal;
