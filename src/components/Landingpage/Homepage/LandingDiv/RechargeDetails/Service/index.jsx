import { useContext, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { GlobalContext } from '../../../../../../context/GlobalProvider';
import { getDataPlans } from '../../../../../../helper/noauthrequests';

const Container = styled.div`
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(6, 1fr);

	${({ mb }) => {
		return mb && 'margin-bottom: 20px';
	}}

	${({ gridTemplate }) => {
		return (
			gridTemplate &&
			css`
				grid-template-columns: repeat(6, 1fr);
				gap: 20px;
			`
		);
	}}
	

	@media (max-width:400px) {
		${({ gridTemplate }) => {
			return (
				gridTemplate &&
				css`
					grid-template-columns: repeat(6, 1fr);
					gap: 5px;
				`
			);
		}}
	}
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
	width: 30px;
	${({ nepa }) => nepa && `width: 50px`};

	${({ filter }) => {
		return filter && 'filter: brightness(0) invert(1)';
	}};
`;

const ServiceProvider = ({
	type,
	nepa,
	setDataPlans,
	serviceName,
	setServiceName,
	mb,
	filter,
	data,
}) => {
	const { dataType,airtimeId,setAirtimeId } = useContext(GlobalContext);
	useEffect(() => {
		if (airtimeId === 0 || dataType === 'Airtime' || dataType === 'Cable TV')
			return;
		if(airtimeId !== 0 && dataType === 'Data'){	
			const awaitData = async () => {
			try {
				const response = await getDataPlans(serviceName);
				setDataPlans(
					response.data.map((each) => {
						return {
							id: each.product_id,
							value: `${each.allowance} ${each.validity} ${each.price}`,
							label: `${each.allowance} ${each.validity} ${each.price}`,
						};
					})
				);
			} catch (e) {
				console.log(e);
			}
		};
		awaitData();
	}
	}, [airtimeId, dataType, serviceName, setDataPlans]);

	const handleClick = (each) => {
		setAirtimeId(each.id);
		if (dataType === 'Airtime') {
			setServiceName(each.airtime);
		} else if (dataType === 'Data') {
			setServiceName(each.data);
			getDataPlans(each.data);
		} else {
			setServiceName(each.data);
		}
	};

	return (
		<Container mb={mb} gridTemplate={type}>
			{data.map((each) => {
				return (
					<Item
						onClick={() => handleClick(each)}
						className={each.id === airtimeId && 'active'}
						key={each.id}>
						<Image
							nepa={nepa}
							filter={filter && !each.filter && each.id === airtimeId}
							src={each.img}
						/>
					</Item>
				);
			})}
		</Container>
	);
};

export default ServiceProvider;
