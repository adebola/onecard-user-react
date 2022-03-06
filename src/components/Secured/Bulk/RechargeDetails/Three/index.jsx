import React from 'react';
import ServiceProvider from '../Service';

import eko from '../../../../../assets/eko.jpg';
import jos from '../../../../../assets/jos.png';
const nepa = [
	{ id: 1, type: 'EKEDP', img: eko },
	{ id: 2, type: 'JED', img: jos },
];
const Three = () => {
	return (
		<>
			<ServiceProvider id='true' data={nepa} />
		</>
	);
};

export default Three;
