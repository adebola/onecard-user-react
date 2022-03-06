import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../../../../context/GlobalProvider';
import { getBeneficiary } from '../../../../../helper/requests';

const ChooseBeneficiary = styled.div``;

export const Item = styled.div`
	color: var(--text-color);
	/* height: 50px; */
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 13px;
	text-align: center;
	width: 100px;
	border-radius: 10px;
	cursor: pointer;
	button {
		background-color: var(--light-background);
		outline: none;
		border-radius: 9px;
		border: none;
		color: var(--text-color);
		cursor: pointer;
		padding: 0.4rem;
	}
`;

export const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 20px;
`;

export const GridItem = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--text-color);
	background-color: var(--light-background);
	cursor: pointer;

	&:hover {
		background-color: var(--text-color);
		color: var(--white);
	}
`;

const Outer = styled.div`
	display: flex;
	gap: 20px;
`;

const Bene = () => {
	const { bene, setBene, setSingleBene, setBeneModal, setPhoneNumber } =
		useContext(GlobalContext);

	useEffect(() => {
		const awaitResponse = async () => {
			try {
				const response = await getBeneficiary();
				setBene(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		awaitResponse();
	}, []);

	const handleClick = (each) => {
		setSingleBene(each);
		setPhoneNumber(each.telephone);
	};

	const handleModalClick = (each) => {
		setBeneModal(true);
	};

	return (
		<Outer>
			<Item>
				<button type='button' onClick={handleModalClick}>
					Choose Beneficiary
				</button>
			</Item>
			<ChooseBeneficiary>
				<GridContainer>
					{bene.slice(0, 4).map((each) => {
						return (
							<GridItem onClick={() => handleClick(each)} key={each.id}>
								{each.firstName.slice(0, 1)}
								{each.lastName.slice(0, 1)}
							</GridItem>
						);
					})}
				</GridContainer>
			</ChooseBeneficiary>
		</Outer>
	);
};

export default Bene;
