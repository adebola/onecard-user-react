import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SyncLoader } from 'react-spinners';
import MySelect from 'react-select';
import MyStyledButton from '../../../../../MyStyledButton';

const Container = styled.div`
	background-color: var(--light-background);
	padding: 10px;
	/* padding-left: 5px; */
	border-radius: 4px;
	display: flex;
	align-items: center;
`;

const SpinnerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 15px;
`;

const MinHeight = styled.div`
	height: 150px;
`;

const Text = styled.div`
	color: var(--text-color);
	text-transform: uppercase;
	font-size: 12px;
`;

const Span = styled.div`
	font-size: 12px;
	font-weight: 500;
	margin-right: 3px;
	color: var(--text-color);
`;

const NewSelect = styled(MySelect)``;

const FullContainer = styled.div`
	width: 100%;
`;

const details = [
	{ id: 1, value: 'Dstv One', label: 'Dstv One' },
	{ id: 2, value: 'Dstv Two', label: 'Dstv Two' },
];

const Loading = () => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setTimeout(() => setIsLoading(true), 5000);
	}, [isLoading]);

	if (!isLoading) {
		return (
			<SpinnerContainer>
				<SyncLoader size={6} color='#EB6A2B' margin={7} />
			</SpinnerContainer>
		);
	} else {
		return (
			<FullContainer>
				<MinHeight>
					<Container>
						<Span>Name:</Span>
						<Text> AdeAjayi Abolaji</Text>
					</Container>
					<NewSelect options={details} />
				</MinHeight>
				<MyStyledButton name='Submit' myStyles={{ width: '100%' }} />
			</FullContainer>
		);
	}
};

export default Loading;
