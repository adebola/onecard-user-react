import React, { useEffect, useState, useContext } from 'react';
import Container from '../../Container';
import SmallText from '../../SmallText';
import TopHeader from '../../TopNav';
import Wrapper from '../../Wrapper';
import CreateBeneficiary from './CreateBene';
import ListOfBene from './ListOfbene';
import { BeneficiaryBoxOne, BeneficiaryBoxTwo } from './styles';

import HamburgerMenu from '../../Hamburger';
import MenuList from '../../Hamburger/Menulist';
import { getBeneficiary } from '../../../helper/requests';
import { ModalContext } from '../../../context/ModalProvider';
import { GlobalContext } from '../../../context/GlobalProvider';

const Beneficiaries = () => {
	const [toggle, setToggle] = useState(false);
	const [reload, setReload] = useState(false);
	const { setBene } = useContext(GlobalContext);
	const { setErrorModal, setErrorMessage } = useContext(ModalContext);

	useEffect(() => {}, [reload]);

	useEffect(() => {
		const awaitResponse = async () => {
			try {
				const response = await getBeneficiary();
				setBene(response.data);
				setReload(false);
			} catch (error) {
				setErrorMessage(error.response.data.message);
				setReload(false);
				setErrorModal(true);
			}
		};
		awaitResponse();
	}, [reload, setBene, setErrorMessage, setErrorModal]);

	return (
		<>
			<HamburgerMenu toggle={toggle} setToggle={setToggle} />
			<MenuList toggle={toggle} setToggle={setToggle} />

			<Wrapper>
				<TopHeader header='Beneficiary' />
				<Container>
					<BeneficiaryBoxOne>
						<SmallText text='Create Beneficiary' />
						<CreateBeneficiary setReload={setReload} />
					</BeneficiaryBoxOne>
					<BeneficiaryBoxTwo>
						<SmallText text='My Beneficiaries' />
						<ListOfBene setReload={setReload} />
					</BeneficiaryBoxTwo>
				</Container>
			</Wrapper>
		</>
	);
};

export default Beneficiaries;
