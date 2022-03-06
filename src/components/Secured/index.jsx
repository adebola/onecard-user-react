import { Route, Routes } from 'react-router-dom';

import Dashboard from './Dashboard';
import Single from './Single';

const Secured = () => {
	return (
		<Routes>
			<Route exact element={<Dashboard />} path='/dashboard' />
			<Route element={<Single />} path='/single' />
		</Routes>
	);
};
export default Secured;
