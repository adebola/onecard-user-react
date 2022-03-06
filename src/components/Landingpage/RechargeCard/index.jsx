import GetYourCustomized from './GetCustomizedCard';
import GetToKnow from './GetToKnow';
import ImageContainer from './ImageContainer';
import WhoCanYou from './WhocanYou';
import Header from '../../Global/Header';
import Footer from '../../Global/Footer';
import Background from '../../HeroBackground';
import HeroBackground from './Herobackground';

import homebg from '../../../assets/homebg.png';
const RechargeCard = () => {
	return (
		<>
			<Header />

			<Background height='750' img={homebg}>
				<HeroBackground />
			</Background>
			<GetToKnow />
			<WhoCanYou />
			<ImageContainer />
			<GetYourCustomized />
			<Footer />
		</>
	);
};

export default RechargeCard;
