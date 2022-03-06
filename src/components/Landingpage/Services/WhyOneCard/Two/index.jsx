import React from 'react';
import styled from 'styled-components';
import { HomepageResponsive } from '../../../../../responsive/responsive';
import Button from '../../../../Button/normal';

const BoxTwo = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	/* align-items: center; */
	flex-direction: column;
	${HomepageResponsive({
		justifyContent: 'center',
		padding: '0 1.5rem',
	})}
`;

const Title = styled.p`
	color: var(--text-color);
	font-size: 48px;
	font-style: normal;
	font-weight: 700;
	line-height: 49px;
	letter-spacing: 0em;
	${HomepageResponsive({
		fontSize: '43px',
	})}
`;

const Two = () => {
	return (
		<>
			<BoxTwo>
				<Title>Sign up and enjoy swift recharge service to any network</Title>
				<Button
					myStyle={{ width: '50%', marginTop: '30px' }}
					name='Sign up for free'
				/>
			</BoxTwo>
		</>
	);
};

export default Two;
