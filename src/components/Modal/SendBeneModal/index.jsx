import styled from 'styled-components';

import React, { useContext } from 'react';
import { ModalContext } from '../../../context/ModalProvider';

const Container = styled.div`
	background: rgba(255, 255, 255, 0.7);
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	z-index: 100;
	justify-content: center;

	@media (max-width: 400px) {
		background-color: rgba(0, 0, 0, 0.3);
	}
`;
const Inner = styled.div`
	width: 400px;
	background-color: var(--text-color);
	border-radius: 20px;
	padding: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 400px) {
		background-color: transparent;
	}
`;

const InnerBox = styled.div`
	background: var(--white);
	width: 320px;
	border-radius: 20px;
	height: 350px;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const StrongText = styled.p`
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	margin: 4px 0;
	line-height: 24px;
	letter-spacing: 0em;
	text-align: center;
	color: var(--text-color);
`;

const LightText = styled.p`
	font-size: 9px;
	font-style: normal;
	font-weight: 400;
	line-height: 11px;
	letter-spacing: 0em;
	text-align: center;
	color: var(--text-color);
`;

const details = [
	{ id: 1, title: 'Airtime' },
	{ id: 2, title: 'Data' },
	{ id: 3, title: 'Utility' },
	{ id: 4, title: 'Others' },
];

const OptionBox = styled.div`
	/* background-color: red; */
	display: flex;
	flex-direction: column;
	width: 80%;
	margin-top: 20px;
`;

const EachOption = styled.button`
	padding: 1rem;
	margin: 6px 0;
	color: var(--btn-color);
	outline: none;
	border: none;
	cursor: pointer;
	border-radius: 6px;
	border: 1px solid var(--btn-color);
	background: transparent;
	&:hover {
		background-color: var(--light-background);
	}
`;

const SendBeneModal = () => {
	const { name, setName, setSendToBeneModal } = useContext(ModalContext);
	return (
		<Container>
			<Inner>
				<InnerBox>
					<StrongText>Send to {name}</StrongText>
					<LightText>Choose your preferred service</LightText>

					<OptionBox>
						{details.map((each) => {
							return (
								<EachOption
									onClick={() => {
										setSendToBeneModal(false);
										setName('');
									}}
									key={each.id}>
									{each.title}
								</EachOption>
							);
						})}
					</OptionBox>
				</InnerBox>
			</Inner>
		</Container>
	);
};

export default SendBeneModal;
