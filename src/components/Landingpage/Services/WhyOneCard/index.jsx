import React from 'react';
import NoAuthContainer from '../../Container';
import One from './One';
import Two from './Two';

const WhyOneCard = () => {
	return (
		<NoAuthContainer>
			<>
				<One />
			</>
			<>
				<Two />
			</>
		</NoAuthContainer>
	);
};

export default WhyOneCard;
