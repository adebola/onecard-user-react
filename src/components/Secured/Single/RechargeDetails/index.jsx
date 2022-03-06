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

import WalletBalance from '../../../WalletBalance';
import { FaDatabase } from 'react-icons/fa';
import { BiPhoneCall } from 'react-icons/bi';
import { GiElectric } from 'react-icons/gi';
import { MdLiveTv, MdOutlineAddCircleOutline } from 'react-icons/md';
import One from './One';
import Two from './Two';
import Three from './Three';
import { GlobalContext } from '../../../../context/GlobalProvider';

const data = [
	{ id: 1, text: 'Data', img: <FaDatabase /> },
	{ id: 2, text: 'Airtime', img: <BiPhoneCall /> },
	{ id: 3, text: 'Electricity', img: <GiElectric /> },
	{ id: 4, text: 'Cable TV', img: <MdLiveTv /> },
	{ id: 5, text: 'Others', img: <MdOutlineAddCircleOutline /> },
];

const RechargeDetails = () => {
	const { setDataType } = useContext(GlobalContext);

	const [id, setId] = useState(0);

	const handleClick = (each) => {
		setId(each.id);
		setDataType(each.text);
	};

	return (
		<RechargeDetailsContainer>
			<SmallText>What will you like to do ?</SmallText>
			<MinHeight>
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

				{id === 1 && <One />}
				{id === 2 && <Two />}
				{id === 3 && <Three />}
			</MinHeight>

			<WalletBalance />
		</RechargeDetailsContainer>
	);
};

export default RechargeDetails;
