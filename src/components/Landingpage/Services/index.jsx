import React from 'react';
import Footer from '../../Global/Footer';
import Header from '../../Global/Header';
import ReuseableCompo from './ReusableCompo';
import WhyOneCard from './WhyOneCard';
import Background from '../../HeroBackground';
import HeroBackground from './HeroBackground';
import homebg from '../../../assets/womanbg.png';
import phone from '../../../assets/phone.png';
import sys from '../../../assets/sys.png';
import ben from '../../../assets/ben.png';
import mansys from '../../../assets/mansys.png';

const Services = () => {
	return (
		<>
			<Header />

			<Background img={homebg}>
				<HeroBackground />
			</Background>

			<ReuseableCompo
				bg='true'
				btnText='Quick Recharge'
				img={phone}
				title='Single Recharge'
				subtitle='Recharge as low as N50 and up to to N50,000 in a single transaction, you can also pay for scratch cards, electricity bills and TV subscriptions'
			/>
			<ReuseableCompo
				right='true'
				btnText='Recharge for 2 or more numbers'
				img={sys}
				title='Bulk Recharge'
				subtitle='A convenient way to recharge for hundreds or thousands all at once'
			/>
			<ReuseableCompo
				bg='true'
				btnText='Create Beneficiaries'
				img={ben}
				title='Beneficiaries'
				subtitle='Save numbers (phone, smartcard, meter) as beneficiaries for quick repeat transactions'
			/>
			<ReuseableCompo
				right='true'
				btnText='Schedule a recharge'
				img={mansys}
				title='Scheduled & Auto Recharge'
				subtitle='Schedule or automatically repeat your recharges or payments with a single click'
			/>

			<WhyOneCard />
			<Footer />
		</>
	);
};

export default Services;
