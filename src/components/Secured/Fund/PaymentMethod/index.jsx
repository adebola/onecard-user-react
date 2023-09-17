import React, { useState } from 'react';
import styled from 'styled-components';

const BoxTwo = styled.div`
	flex: 1;
`;

const BoxTwoInner = styled.div`
	height: 300px;
	background: rgba(255, 255, 255, 0.1);
	box-shadow: 0px 4px 90px 4px rgba(0, 0, 0, 0.1);
	border-radius: 20px;

	padding: 2rem 1rem;
`;

export const Text = styled.p`
	color: var(--text-color);
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: 16px;
	text-align: left;
	margin: 3rem 0 1rem 0;
`;

export const PaymentInner = styled.div`
	margin-bottom: 10px;
	background: var(--light-background);
	border-radius: 10px;

	&.active {
		background: var(--text-color);
		color: var(--white);
	}
`;

const PaymentButton = styled.button`
	padding: 1.3rem 2rem;
	outline: none;
	border-radius: 10px;
	border: none;
	cursor: pointer;
	width: 100%;
	color: inherit;
	background: transparent;
	/* height: 100%; */

	&:disabled {
		opacity: 0.5;
		cursor: default;
	}
`;

const PaymentMethod = () => {
	const [id, setId] = useState(1);

	const methods = [
		{ id: 1, name: 'Debit Card' },
		{ id: 2, name: 'OneCard Recharge PIN', disabled: true },
		{ id: 3, name: 'Others', disabled: true },
	];

	return (
		<BoxTwo>
			<BoxTwoInner>
				{methods.map((each) => {
					return (
						<PaymentInner
							onClick={() => setId(each.id)}
							className={each.id === id && 'active'}
							key={each.id}>
							<PaymentButton disabled={each.disabled}>
								{each.name}
							</PaymentButton>
						</PaymentInner>
					);
				})}
			</BoxTwoInner>
		</BoxTwo>
	);
};

export default PaymentMethod;
