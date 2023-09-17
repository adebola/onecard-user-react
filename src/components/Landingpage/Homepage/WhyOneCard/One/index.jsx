import React from 'react';
import styled from 'styled-components';
import { HomepageResponsive } from '../../../../../responsive/responsive';

import man from '../../../../../assets/man.png';
import mancr from '../../../../../assets/mancr.png';

const Container = styled.div`
	flex: 1;

	@media (max-width: 768px) {
		margin: 30px 0;
	}
`;

const BoxOne = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;
	${HomepageResponsive({
		justifyContent: 'center',
	})}
`;

const ImageContainer = styled.div`
	position: relative;
`;

const Image = styled.img``;

const SmallImage = styled.img`
	position: absolute;
	bottom: 0;
	transform: translate(-30%, 20%);
`;

const One = () => {
	return (
		<Container>
			<BoxOne>
				<ImageContainer>
					<SmallImage src={mancr} alt='mancr' />
					<Image src={man} alt='man' />
				</ImageContainer>
			</BoxOne>
		</Container>
	);
};
export default One;
