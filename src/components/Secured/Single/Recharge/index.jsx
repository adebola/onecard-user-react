import React, { useContext } from 'react';
import ScheduleDatePicker from '../../../DatePicker';

import {
	RechargeBox,
	RechargeContainer,
	RechargeInner,
	SmallText,
} from './styles';
import { ModalContext } from '../../../../context/ModalProvider';

const Recharge = () => {
	const { rechargeType, setRechargeType } = useContext(ModalContext);

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
			</RechargeInner>
		</RechargeContainer>
	);
};

export default Recharge;
