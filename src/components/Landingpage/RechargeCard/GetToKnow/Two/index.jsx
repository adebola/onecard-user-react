import React from 'react';
import styled, { css } from 'styled-components';

import down from '../../../../../assets/down.png';
import down1 from '../../../../../assets/downlong.png';

const Bottom = styled.div``;

const NormalText = styled.p`
	font-size: 15px;
	font-style: normal;
	font-weight: 500;
	line-height: 24px;
	letter-spacing: 0em;
	color: var(--text-color);
	width: 90%;
	/* margin: auto; */
	margin: 20px auto;
`;

const LandingImage = styled.img`
	height: 80px;
	width: 50%;
	${({ abs }) =>
		abs &&
		css`
			position: absolute;
			height: 40px;
			width: 95%;
			left: 5%;
		`};
`;

const Two = () => {
	return (
		<>
			<Bottom>
				<NormalText>
					The OneCard recharge cards can be customized for brands, individuals
					and organizations with the front of the card-carrying specific design
					as desired by the client.{' '}
				</NormalText>
				<NormalText>
					{' '}
					Customized OneCard can only be used for promotional purposes, they are
					not allowed for sale in trade except for orders relating to designated
					revenue collection{' '}
				</NormalText>
				<NormalText>
					Usage of the card is very simple; to recharge any mobile network, a
					user simply dials *979*PIN# while to top up any bank account, user
					simply dials *979*SPID*PIN*NUBAN# where SPID represents the USSD code
					of the bank e.g 737 for GTB. Instructions for use are also written on
					the cards.
				</NormalText>

				<NormalText>
					These multipurpose cards come in sizes and denominations as desired by
					the customer.
				</NormalText>
			</Bottom>

			<LandingImage src={down} />
			<LandingImage src={down1} abs='true' />
		</>
	);
};

export default Two;
