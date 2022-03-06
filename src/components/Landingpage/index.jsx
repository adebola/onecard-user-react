import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Blog from './Blog';
import Contact from './Contact';
import HomePage from './Homepage';
import RechargeCard from './RechargeCard';
import Services from './Services';

const Landing = () => {
	return (
		<Routes>
			<Route exact element={<HomePage />} path='/' />
			<Route element={<Blog />} path='/blog' />
			<Route element={<Contact />} path='/contact' />
			<Route element={<RechargeCard />} path='/recharge' />
			<Route element={<Services />} path='/services' />
		</Routes>
	);
};

export default Landing;
