import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../../context/GlobalProvider';
import {
	Amount,
	Container,
	EachTransaction,
	NumberAndDetail,
	Recipient,
	Transaction,
	TransactionBody,
	TransactionButtonContainer,
	TransactionText,
	TransactionTextStrong,
	TransactionTop,
	TransactionType,
	View,
	ViewAll,
} from './styles';

import {
	SINGLERECHARGE,
	BULKRECHARGE,
	TRANSACTIONS,
} from '../../../../constant';
import LinkButton from '../../../LinkButton';
import { getTransaction } from '../../../../helper/requests';
import NoContainer from '../../../NoContainer';

const Transactions = () => {
	const { transactions, setTransactions } = useContext(GlobalContext);
	useEffect(() => {
		const awaitResponse = async () => {
			try {
				const res = await getTransaction();
				setTransactions(res.data.list);
			} catch (error) {
				console.error(error);
			}
		};
		awaitResponse();
	}, [setTransactions]);
	return (
		<Container>
			<>
				{transactions.length === 0 && (
					<NoContainer>You don't have any transactions yet</NoContainer>
				)}
				{transactions.length > 0 && (
					<>
						<Transaction>
							<TransactionTop>
								<Recipient>Recipient</Recipient>
								<TransactionType>Transaction Type</TransactionType>
								<Amount>Amount </Amount>
							</TransactionTop>

							<TransactionBody>
								{transactions.slice(0, 5).map((each) => {
									return (
										<EachTransaction key={each.id}>
											<Recipient>
												<NumberAndDetail>
													<TransactionTextStrong>
														{each.recipient}
													</TransactionTextStrong>
												</NumberAndDetail>
											</Recipient>
											<TransactionType>
												<TransactionText>{each.serviceName}</TransactionText>
											</TransactionType>
											<Amount>
												<TransactionText>{each.txAmount}</TransactionText>
											</Amount>
										</EachTransaction>
									);
								})}
								<View>
									<ViewAll to={TRANSACTIONS}>View All</ViewAll>
								</View>
							</TransactionBody>
						</Transaction>
					</>
				)}
			</>

			<TransactionButtonContainer>
				<LinkButton name='Bulk Recharge' to={BULKRECHARGE} />
				<LinkButton name='Single Recharge' to={SINGLERECHARGE} />
			</TransactionButtonContainer>
		</Container>
	);
};

export default Transactions;
