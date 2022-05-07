import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../../context/GlobalProvider";
import { getBeneficiary } from "../../../../helper/requests";
import SingleBeneficiary from "./SingleBene";

import NoContainer from "../../../NoContainer";
import { ModalContext } from "../../../../context/ModalProvider";

const ListInner = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 90px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  outline: none;
  margin: 5px 0;
  padding: 0.6rem;
  border: 1.2px solid var(--text-color);
  border-radius: 10px;
  color: var(--text-color);
  &::placeholder {
    color: var(--text-color);
  }

  &:focus {
    border: 1.5px solid var(--text-color);
  }
`;

const Search = styled.div``;

const ListOfBene = ({ setReload }) => {
  const { bene, setBene } = useContext(GlobalContext);
  const [text, setText] = useState(false);
  const { setErrorModal, setErrorMessage } = useContext(ModalContext);

  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const response = await getBeneficiary();
        if (response.data.length === 0) {
          setText(true);
        } else {
          setBene(response.data);
        }
      } catch (error) {
        setErrorMessage(error.response.data.message);
        setErrorModal(true);
      }
    };
    awaitResponse();
  }, [setBene, setErrorMessage, setErrorModal]);

  return (
    <>
      <ListInner>
        {text && bene.length === 0 && (
          <NoContainer>No beneficiaries, try adding one !</NoContainer>
        )}
        {bene.length > 0 && (
          <>
            <Search>
              <SearchInput type="text" placeholder="Search beneficiaries" />
            </Search>

            {bene.map((each) => {
              return (
                <SingleBeneficiary
                  setReload={setReload}
                  key={each.id}
                  each={each}
                />
              );
            })}
          </>
        )}
      </ListInner>
    </>
  );
};

export default ListOfBene;
