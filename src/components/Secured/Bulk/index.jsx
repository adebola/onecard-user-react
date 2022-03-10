import React, { useState, useContext, useEffect } from 'react';
import Container from '../../Container';
import Wrapper from '../../Wrapper';
import TopHeader from '../../TopNav';
import { BulkBoxOne, BulkBoxTwo } from './styles';

import Recharge from './Recharge';
import RechargeDetails from './RechargeDetails';
import SmallText from '../../SmallText';
import HamburgerMenu from '../../Hamburger';
import MenuList from '../../Hamburger/Menulist';
import { AuthContext } from '../../../context/AuthProvider';
import { GlobalContext } from '../../../context/GlobalProvider';
import { ModalContext } from '../../../context/ModalProvider';
import { getBulkRechargeResponse } from '../../../helper/requests';

const Bulk = () => {
	const [toggle, setToggle] = useState(false);
	const [rechargeType, setRechargeType] = useState(1);

	const { authId } = useContext(AuthContext);

	const { setResponseMessage } = useContext(GlobalContext);
	const { setResponseModal } = useContext(ModalContext);
	useEffect(() => {
		if (authId === null) {
			return;
		}
		const awaitResponse = async () => {
			if (localStorage.getItem('id')) {
				try {
					const parsedId = JSON.parse(localStorage.getItem('id'));
					const response = await getBulkRechargeResponse(parsedId);
					setResponseModal(true);
					setResponseMessage(response.data.message);
				} catch (error) {
					setResponseMessage('Something went wrong, please try again');
					setResponseModal(true);
				}
			}
		};
		awaitResponse();
	}, [authId, setResponseMessage, setResponseModal]);

	return (
		<>
			<HamburgerMenu toggle={toggle} setToggle={setToggle} />
			<MenuList toggle={toggle} setToggle={setToggle} />

			<Wrapper>
				<TopHeader header='Bulk Recharge' />
				<Container>
					<BulkBoxOne>
						<SmallText text='Recharge' />
						<Recharge
							rechargeType={rechargeType}
							setRechargeType={setRechargeType}
						/>
					</BulkBoxOne>
					<BulkBoxTwo>
						<SmallText text='Recharge Details' />
						<RechargeDetails rechargeId={rechargeType} />
					</BulkBoxTwo>
				</Container>
			</Wrapper>
		</>
	);
};

export default Bulk;
