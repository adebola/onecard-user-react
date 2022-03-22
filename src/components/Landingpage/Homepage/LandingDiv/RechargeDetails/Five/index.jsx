import React from 'react';
import ServiceProvider from '../Service';

import eko from '../../../../../../assets/waec.png';
const nepa = [{ id: 1, type: 'EKEDP', img: eko }];

const Five = () => {
	return (
		<div>
			<ServiceProvider nepa='true' id='true' data={nepa} />
		</div>
	);
};

export default Five;
