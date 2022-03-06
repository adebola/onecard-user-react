import React, { useState } from 'react';
import TopHeader from '../../TopNav';
import Wrapper from '../../Wrapper';
import { TransactionBoxOne } from './styles';
import SmallText from '../../SmallText';
import styled from 'styled-components';
import TransactionBody from './TransactionBody';

import HamburgerMenu from '../../Hamburger';
import MenuList from '../../Hamburger/Menulist';

const Container = styled.div`
	margin-top: 50px;
`;

const Transactions = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<>
			<HamburgerMenu toggle={toggle} setToggle={setToggle} />
			<MenuList toggle={toggle} setToggle={setToggle} />

			<Wrapper>
				<TopHeader header='Transactions' />
				<Container>
					<TransactionBoxOne>
						<SmallText text='Transactions History' />
						<TransactionBody />
					</TransactionBoxOne>
				</Container>
			</Wrapper>
		</>
	);
};

export default Transactions;
