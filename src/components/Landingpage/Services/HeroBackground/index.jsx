import React from 'react';
import NoAuthContainer from '../../Container';
import One from './One';
import Two from './Two';

const Background = () => {
	return (
		<NoAuthContainer padding='3rem 0'>
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
