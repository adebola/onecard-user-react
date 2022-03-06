import React from 'react';
import NoAuthContainer from '../../Container';
import One from './One';
import Two from './Two';

const RechargeOptions = () => {
	return (
		<NoAuthContainer bg='#EB6A2B' padding='0'>
			<>
				<One />
			</>
			<>
				<Two />
			</>
		</NoAuthContainer>
	);
};

export default RechargeOptions;
