import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { GlobalContext } from '../../../../../context/GlobalProvider';
import { getDataPlans } from '../../../../../helper/requests';

const Container = styled.div`
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(4, 1fr);

	${({ gridTemplate }) =>
		gridTemplate &&
		css`
			grid-template-columns: repeat(6, 1fr);
			gap: 10px;
		`}
`;

const Item = styled.div`
	height: 50px;
	background: rgba(235, 106, 43, 0.1);
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--text-color);
	cursor: pointer;
	&.active {
		background: var(--text-color);
		color: var(--white);
	}
`;

const Image = styled.img`
	width: 34px;

	&.big {
		width: 60px;
	}
`;

const ServiceProvider = ({
	data,
	setDataPlans,
	serviceName,
	setServiceName,
	id,
	type,
}) => {
	const {
		dataType,
		airtimeId,
		setAirtimeId,
		selectedSingleDataPlans,
		setSelectedSingleDataPlans,
	} = useContext(GlobalContext);

	useEffect(() => {
		if (airtimeId === 0 || dataType === 'Airtime') return;
		const awaitData = async () => {
			try {
				const response = await getDataPlans(serviceName);
				setDataPlans(
					response.data.map((each) => {
						return {
							id: each.product_id,
							value: `${each.allowance === null ? '' : each.allowance} ${
								each.validity
							} ${each.price}`,
							label: `${each.allowance === null ? '' : each.allowance} ${
								each.validity
							} ${each.price}`,
						};
					})
				);
			} catch (e) {
				console.log(e);
			}
		};
		awaitData();
	}, [airtimeId, dataType, serviceName, setDataPlans]);

	return (
		<Container gridTemplate={type}>
			{data.map((each) => {
				return (
					<Item
						onClick={() => {
							setAirtimeId(each.id);
							if (selectedSingleDataPlans) {
								setSelectedSingleDataPlans({});
							}
							if (dataType === 'Airtime') {
								setServiceName(each.airtime);
							} else {
								setServiceName(each.data);
								getDataPlans(each.data);
							}
						}}
						className={each.id === airtimeId && 'active'}
						key={each.id}>
						<Image src={each.img} className={id && 'big'} />
					</Item>
				);
			})}
			{/* <p>{type}</p> */}
		</Container>
	);
};

export default ServiceProvider;
