import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landingpage';
import { PrivateRoute, PublicRoute } from './components/Routes';
import Beneficiaries from './components/Secured/Beneficiary';
import Bulk from './components/Secured/Bulk';
import Dashboard from './components/Secured/Dashboard';
import Fund from './components/Secured/Fund';
import Single from './components/Secured/Single';
import Transactions from './components/Secured/Transactions';

const App = () => {
	return (
		<Routes>
			<Route element={<PublicRoute />}>
				<Route exact path='/*' element={<Landing />} />
			</Route>
			<>
				<Route element={<PrivateRoute />}>
					{/* <Route exact path='/*' element={<Secured />} /> */}
					<Route exact path='/dashboard' element={<Dashboard />} />
					<Route exact path='/single' element={<Single />} />
					<Route exact path='/bulk' element={<Bulk />} />
					<Route exact path='/fund' element={<Fund />} />
					<Route exact path='/bene' element={<Beneficiaries />} />
					<Route exact path='/transactions' element={<Transactions />} />
				</Route>
			</>
		</Routes>
	);
};

export default App;
