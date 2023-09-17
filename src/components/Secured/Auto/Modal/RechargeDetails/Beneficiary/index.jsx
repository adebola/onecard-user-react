import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../../../../context/GlobalProvider";
import { getBeneficiary } from "../../../../../../helper/requests";

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

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 568px) {
    gap: 10px;
  }
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

  @media (max-width: 568px) {
    width: 40px;
    height: 40px;
  }
`;

const Outer = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  gap: 20px;
  align-items: center;
  @media (max-width: 568px) {
    gap: 10px;
  }
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
  }, [setBene]);

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
        <button
          disabled={bene.length <= 5}
          type="button"
          onClick={handleModalClick}
        >
          Choose Beneficiary
        </button>
      </Item>
      <ChooseBeneficiary>
        <GridContainer>
          {bene.slice(0, 5).map((each) => {
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
