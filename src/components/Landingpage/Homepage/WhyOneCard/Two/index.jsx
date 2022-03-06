import React from 'react';
import styled from 'styled-components';
import { HomepageResponsive } from '../../../../../responsive/responsive';

const Container = styled.div`
	flex: 1;

	padding: 1rem;
`;
const BoxTwo = styled.div`
	display: flex;
	justify-content: center;
	/* align-items: center; */
	flex-direction: column;
	${HomepageResponsive({
		justifyContent: 'center',
		// padding: '0 1.5rem',
	})}

	${HomepageResponsive({
		paddingLeft: '0rem',
	})};
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

const Subtitle = styled.p`
	color: var(--text-color);
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: 21px;
	max-width: 80%;
	margin-top: 20px;
	${HomepageResponsive({
		maxWidth: '100%',
	})}
`;

const Two = () => {
	return (
		<Container>
			<BoxTwo>
				<Title>Why oneCard ?</Title>
				<Subtitle>
					We have built a robust technology that enables every individual to
					enjoy easy, convenient and extensive recharge or payment solutions for
					various services.{' '}
				</Subtitle>
				<Subtitle>
					Verified individuals and businesses have access to even more powerful
					capabilities
				</Subtitle>{' '}
			</BoxTwo>
		</Container>
	);
};

export default Two;
