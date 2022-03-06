import React from 'react';
import NoAuthContainer from '../../Container';
import One from './One';
import Two from './Two';

const Background = () => {
	return (
		<NoAuthContainer height='600px' padding='6rem 2rem'>
			<>
				<One />
			</>
			<>
				<Two />
			</>
		</NoAuthContainer>
	);
};

export default Background;
