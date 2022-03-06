import React, { useState } from 'react';
import Container from '../../Container';
import SmallText from '../../SmallText';
import TopHeader from '../../TopNav';
import Wrapper from '../../Wrapper';
import PaymentMethod from './PaymentMethod';
import Amount from './Amount';
import { FundBoxOne, FundBoxTwo } from './styles';

import HamburgerMenu from '../../Hamburger';
import MenuList from '../../Hamburger/Menulist';

const Fund = () => {
	const [toggle, setToggle] = useState(false);
	return (
		<>
			<HamburgerMenu toggle={toggle} setToggle={setToggle} />
			<MenuList toggle={toggle} setToggle={setToggle} />
			<Wrapper>
				<TopHeader header='Fund Wallet' />
				<Container>
					<FundBoxOne>
						<SmallText text='Payment Method' />
						<PaymentMethod />
					</FundBoxOne>
					<FundBoxTwo>
						<SmallText text='Enter Amount' />
						<Amount />
					</FundBoxTwo>
				</Container>
			</Wrapper>
		</>
	);
};

export default Fund;
