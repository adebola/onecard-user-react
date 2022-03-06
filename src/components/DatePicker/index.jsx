import { useContext } from 'react';
import DatePicker from 'react-datepicker';
import { GlobalContext } from '../../context/GlobalProvider';
import React from 'react';
import styled from 'styled-components';

const Schedule = styled.div`
	color: var(--btn-color);
	text-align: center;
	font-size: 10px;
`;

const ScheduleDatePicker = () => {
	const { startDate, setStartDate } = useContext(GlobalContext);

	return (
		<>
			<Schedule>Select a Date & Time To Schedule Your Recharge</Schedule>
			<DatePicker
				selected={startDate}
				onChange={(date) => setStartDate(date)}
				showTimeSelect
				dateFormat='MMMM d, yyyy h:mm aa'
			/>
		</>
	);
};

export default ScheduleDatePicker;
