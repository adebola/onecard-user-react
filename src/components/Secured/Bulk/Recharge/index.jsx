import React, { useState } from 'react';
import ScheduleDatePicker from '../../../DatePicker';
import ListOfBene from './ListOfBene';

import {
	RechargeBox,
	RechargeContainer,
	RechargeInner,
	SmallText,
} from './styles';

const Recharge = () => {
	const [rechargeType, setRechargeType] = useState(1);
	const rechargeOptions = [
		{
			id: 1,
			text: 'Instant Recharge',
		},
		{
			id: 2,
			text: 'Schedule Recharge',
		},
	];

	return (
		<RechargeContainer>
			<SmallText>Select recharge type</SmallText>

			<RechargeInner>
				{rechargeOptions.map((each) => {
					return (
						<div key={each.id}>
							<RechargeBox
								onClick={() => {
									setRechargeType(each.id);
								}}
								className={each.id === rechargeType && 'active'}>
								{each.text}
							</RechargeBox>
							{each.id === 2 && rechargeType === 2 && <ScheduleDatePicker />}
						</div>
					);
				})}
				<ListOfBene />
			</RechargeInner>
		</RechargeContainer>
	);
};

export default Recharge;
