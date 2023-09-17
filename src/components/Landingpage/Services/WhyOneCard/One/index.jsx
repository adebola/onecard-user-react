import React from 'react';
import styled from 'styled-components';
import { HomepageResponsive } from '../../../../../responsive/responsive';
import man from '../../../../../assets/black.png';
import mancr from '../../../../../assets/mancr.png';

const BoxOne = styled.div`
	flex: 1;
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
		<>
			<BoxOne>
				<ImageContainer>
					<SmallImage src={mancr} alt='mancr' />
					<Image src={man} alt='man' />
				</ImageContainer>
			</BoxOne>
		</>
	);
};

export default One;
