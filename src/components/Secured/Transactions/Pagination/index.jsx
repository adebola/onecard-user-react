import React, { useEffect } from 'react';
import {
	BtnContainer,
	LightFont,
	PageDescription,
	PaginationPage,
	StrongFont,
} from './styles';

import Button from '../../../Button/normal';
import OutlineButton from '../../../Button/outline';
import { getTransaction } from '../../../../helper/requests';

const Pagination = ({ pages, setPages, pageNumber, setPageNumber }) => {
	useEffect(() => {
		const awaitResponse = async () => {
			const response = await getTransaction(pageNumber);
			setPages(response.data.pages);
		};
		awaitResponse();
	}, [pages, setPages, pageNumber, setPageNumber]);

	return (
		<PaginationPage>
			<BtnContainer>
				<OutlineButton
					name='Previous'
					onClick={() =>
						setPageNumber(pageNumber <= 1 ? pageNumber : pageNumber - 1)
					}
				/>
			</BtnContainer>
			<PageDescription>
				<StrongFont>{pageNumber}</StrongFont>
				<LightFont>of</LightFont>
				<StrongFont>{pages}</StrongFont>
			</PageDescription>
			<BtnContainer>
				<Button
					myStyle={{ padding: ' 1rem 2rem' }}
					onClick={() =>
						setPageNumber(pageNumber < pages ? pageNumber + 1 : pages)
					}
					name='Next'
				/>
			</BtnContainer>
		</PaginationPage>
	);
};

export default Pagination;
