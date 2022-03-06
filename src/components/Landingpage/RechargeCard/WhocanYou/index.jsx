import React from 'react';
import occa from '../../../../assets/occa.png';
import family from '../../../../assets/family.png';
import employees from '../../../../assets/employees.png';
import compo from '../../../../assets/compo.png';
import {
	Container,
	Grid,
	GridContainer,
	GridImageAndText,
	GridText,
	Image,
	Inner,
	Text,
} from './styles';

const WhoCanYou = () => {
	return (
		<Container>
			<Inner>
				<Text>Who can you gift your OneCard Recharge Cards to?</Text>
				<GridContainer>
					<GridImageAndText>
						<Grid>
							<Image src={employees} alt='employees' />
						</Grid>
						<GridText>Employees</GridText>
					</GridImageAndText>
					<GridImageAndText>
						<Grid>
							<Image src={family} alt='family' />
						</Grid>
						<GridText>Family and friends</GridText>
					</GridImageAndText>
					<GridImageAndText>
						<Grid>
							<Image src={occa} alt='occa' />
						</Grid>
						<GridText>Occasion Guests</GridText>
					</GridImageAndText>
					<GridImageAndText>
						<Grid>
							<Image src={compo} alt='compo' />
						</Grid>
						<GridText>Competition Winners</GridText>
					</GridImageAndText>
				</GridContainer>
			</Inner>
		</Container>
	);
};

export default WhoCanYou;
