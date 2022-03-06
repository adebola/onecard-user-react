import React from 'react';
import Footer from '../../Global/Footer';
import Header from '../../Global/Header';
import HeroBackground from './Background';
import Background from '../../HeroBackground';

import homebg from '../../../assets/contactbg.png';

import Form from './Form';

const Contact = () => {
	return (
		<>
			<Header />
			<Background img={homebg}>
				<HeroBackground />
			</Background>

			<Form />
			<Footer />
		</>
	);
};

export default Contact;
