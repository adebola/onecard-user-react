import React from 'react';
import keyboard from '../../../../assets/keyboard.png';
import outing from '../../../../assets/outing.png';
import circle2 from '../../../../assets/circle2.png';
import circle from '../../../../assets/circle.png';

import {
	Container,
	ImageCircle,
	ImageCircleTwo,
	ImageOne,
	ImageTwo,
	Inner,
	WImageContainer,
	Wrapper,
} from './styles';

const ImageContainer = () => {
	return (
		<Container>
			<Inner>
				<WImageContainer>
					<Wrapper>
						<ImageTwo src={keyboard} alt='keyboard' />
						<ImageCircle src={circle2} alt='circle2' />
					</Wrapper>
					<Wrapper>
						<ImageOne src={outing} alt='out' />
						<ImageCircleTwo src={circle} alt='circle' />
					</Wrapper>
				</WImageContainer>
				{/* <WImageContainer>
				</WImageContainer> */}
			</Inner>
		</Container>
	);
};

export default ImageContainer;
