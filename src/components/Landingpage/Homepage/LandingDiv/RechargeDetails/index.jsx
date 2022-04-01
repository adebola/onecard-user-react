import React, { useContext, useState } from 'react';
import {
	Container,
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
import Four from './Four';
import Five from './Five';
import { GlobalContext } from '../../../../../context/GlobalProvider';

const data = [
	{ id: 1, text: 'Data', img: <FaDatabase /> },
	{ id: 2, text: 'Airtime', img: <BiPhoneCall /> },
	{ id: 3, text: 'Electricity', img: <GiElectric /> },
	{ id: 4, text: 'Cable TV', img: <MdLiveTv /> },
	{ id: 5, text: 'Others', img: <MdOutlineAddCircleOutline /> },
];

const RechargeDetails = () => {
	const { setDataType , setAirtimeId} = useContext(GlobalContext);

	const [id, setId] = useState(0);

	const handleClick = (each) => {
		setId(each.id);
		setAirtimeId(0)
		setDataType(each.text);
	};

	return (
		<Container>
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
					{id === 4 && <Four />}
					{id === 5 && <Five />}
				</MinHeight>
			</RechargeDetailsContainer>
		</Container>
	);
};

export default RechargeDetails;
