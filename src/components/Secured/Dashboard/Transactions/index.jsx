import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../context/GlobalProvider";
import MyStyledButton from "../../../MyStyledButton";
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
} from "./styles";

import {
  SINGLERECHARGE,
  BULKRECHARGE,
  TRANSACTIONS,
} from "../../../../constant";
import { getTransaction } from "../../../../helper/requests";
import NoContainer from "../../../NoContainer";

const Transactions = () => {
  const { transactions, setTransactions } = useContext(GlobalContext);

  const [text, setText] = useState(false);
  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const res = await getTransaction();
        if (res.data.list.length === 0) {
          setText(true);
        } else {
          setTransactions(res.data.list);
        }
      } catch (error) {
        console.error(error);
      }
    };
    awaitResponse();
  }, [setTransactions]);
  return (
    <Container>
      <>
        {text && transactions.length === 0 && (
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
        <MyStyledButton name="Bulk Recharge" to={BULKRECHARGE} />
        <MyStyledButton name="Single Recharge" to={SINGLERECHARGE} />
      </TransactionButtonContainer>
    </Container>
  );
};

export default Transactions;
