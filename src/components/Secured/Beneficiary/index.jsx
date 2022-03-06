import React, { useState } from 'react';
import Container from '../../Container';
import SmallText from '../../SmallText';
import TopHeader from '../../TopNav';
import Wrapper from '../../Wrapper';
import CreateBeneficiary from './CreateBene';
import ListOfBene from './ListOfbene';
import { BeneficiaryBoxOne, BeneficiaryBoxTwo } from './styles';

import HamburgerMenu from '../../Hamburger';
import MenuList from '../../Hamburger/Menulist';

const Beneficiaries = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<>
			<HamburgerMenu toggle={toggle} setToggle={setToggle} />
			<MenuList toggle={toggle} setToggle={setToggle} />

			<Wrapper>
				<TopHeader header='Beneficiary' />
				<Container>
					<BeneficiaryBoxOne>
						<SmallText text='Create Beneficiary' />
						<CreateBeneficiary />
					</BeneficiaryBoxOne>
					<BeneficiaryBoxTwo>
						<SmallText text='My Beneficiaries' />
						<ListOfBene />
					</BeneficiaryBoxTwo>
				</Container>
			</Wrapper>
		</>
	);
};

export default Beneficiaries;
