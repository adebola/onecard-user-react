import React, { useContext } from 'react';
import Landing from './LandingDiv';
import RechargeOptions from './RechargeOption';
import WhyOneCard from './WhyOneCard';
import Signup from './Signup';
import Header from '../../Global/Header';
import Footer from '../../Global/Footer';
import HeroBackground from '../../HeroBackground';
import homebg from '../../../assets/homebg.png';
import { ModalContext } from '../../../context/ModalProvider';
import styled, { css } from 'styled-components';
import ResponseModal from '../../Modal/ResponseModal';

const HomeContainer = styled.div`
	${({ modal }) =>
		modal &&
		css`
			height: 100vh;
			overflow: hidden;
		`}
`;

const Homepage = () => {
	const { responseModal } = useContext(ModalContext);
	return (
		<HomeContainer modal={responseModal}>
			{responseModal && <ResponseModal />}
			<Header />
			<HeroBackground img={homebg}>
				<Landing />
			</HeroBackground>
			<RechargeOptions />
			<WhyOneCard />
			<Signup />
			<Footer />
		</HomeContainer>
	);
};

export default Homepage;
