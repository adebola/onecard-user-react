import React, { useContext, useState } from 'react';
import {
	Grid,
	GridInner,
	GridText,
	MinHeight,
	RechargeDetailsContainer,
	SmallText,
	TopContainer,
} from './styles';

import { FaDatabase } from 'react-icons/fa';
import { BiPhoneCall } from 'react-icons/bi';
import { GiElectric } from 'react-icons/gi';
import { MdLiveTv, MdOutlineAddCircleOutline } from 'react-icons/md';
import One from './One';
import Two from './Two';
import Three from './Three';
import { GlobalContext } from '../../../../context/GlobalProvider';
import WalletBalance from '../../../WalletBalance';
import ModePayment from '../../../PaymentType';
import Button from '../../../Button/normal';
import ExcelFileUpload from './ExcelFileUpload';

const data = [
	{ id: 1, text: 'Data', img: <FaDatabase /> },
	{ id: 2, text: 'Airtime', img: <BiPhoneCall /> },
	{ id: 3, text: 'Electricity', img: <GiElectric /> },
	{ id: 4, text: 'Cable TV', img: <MdLiveTv /> },
	{ id: 5, text: 'Others', img: <MdOutlineAddCircleOutline /> },
];

const RechargeDetails = ({ rechargeId }) => {
	const {
		setDataType,
		setServiceName,
		serviceName,
		phoneNumber,
		setPhoneNumber,
		setListOfBulk,
		listOfBulk,
		balance,
		setAirtimeId,
		selectedSingleDataPlans,
		setSelectedSingleDataPlans,
		singleAmount,
		setSingleAmount,
	} = useContext(GlobalContext);

	const [id, setId] = useState(0);
	const [optionId, setOptionId] = useState(1);
	const [rechargeType, setRechargeType] = useState('');
	const [fileSelect, setFileSelect] = useState(false);

	const resetDetails = () => {
		setPhoneNumber('');
		setSingleAmount('');
		setSelectedSingleDataPlans({});
	};

	const disabled = phoneNumber === '' || serviceName === '';

	const handleAdd = () => {
		let singleDetails;
		if (rechargeType === 'Data') {
			singleDetails = {
				recipient: phoneNumber,
				serviceCode: serviceName,
				productId: selectedSingleDataPlans.id,
			};
		} else {
			singleDetails = {
				recipient: phoneNumber,
				serviceCode: serviceName,
				serviceCost: singleAmount,
			};
		}
		setListOfBulk([...listOfBulk, singleDetails]);
		resetDetails();
	};

	const handleClick = (each) => {
		setId(each.id);
		setRechargeType(each.text);
		setDataType(each.text);
		setServiceName('');
		setAirtimeId(0);
	};

	return (
		<RechargeDetailsContainer>
			<SmallText>What will you like to do ?</SmallText>
			<MinHeight>
				<ExcelFileUpload
					rechargeId={rechargeId}
					setFileSelect={setFileSelect}
					setOptionId={setOptionId}
					optionId={optionId}
					fileSelect={fileSelect}
				/>
				{optionId === 1 && (
					<TopContainer>
						{data.map((each) => {
							return (
								<Grid
									key={each.id}
									onClick={() => handleClick(each)}
									className={each.id === id && 'active'}>
									<GridInner>
										{each.img}
										<GridText>{each.text}</GridText>
									</GridInner>
								</Grid>
							);
						})}
					</TopContainer>
				)}
				{optionId === 1 && (
					<>
						{id === 1 && <One rechargeType={rechargeType} />}
						{id === 2 && <Two rechargeType={rechargeType} />}
						{id === 3 && <Three rechargeType={rechargeType} />}
						<ModePayment />
						<Button
							disabled={disabled}
							onClick={() => handleAdd()}
							name='Add'
							type='button'
						/>
					</>
				)}
			</MinHeight>
			{optionId === 1 && <WalletBalance balance={balance} />}{' '}
		</RechargeDetailsContainer>
	);
};

export default RechargeDetails;
