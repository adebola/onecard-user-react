import { useContext } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { SingleContext } from "../../../../../../context/SingleRecharge";
import { getDataPlans } from "../../../../../../helper/requests";

const Container = styled.div`
  display: grid;
  gap: 9px;
  grid-template-columns: repeat(6, 1fr);

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
  ${({ filter }) => {
    return filter && "filter: brightness(0) invert(1)";
  }};
`;

const ServiceProvider = ({ data, setSelectedDataPlan }) => {
  //singleContext
  const {
    dataText,
    setRechargeData,
    serviceProviderType,
    setServiceProviderType,
    setServiceProviderError,
    serviceProviderError,
    setServiceName,
  } = useContext(SingleContext);

  //handleServiceProvider Click
  const handleClick = (each) => {
    if (serviceProviderError) setServiceProviderError("");
    setServiceProviderType(each.id);
    setRechargeData([]);
    if (dataText === "Data") {
      setSelectedDataPlan(null);
      setServiceName(each.data);
      getAllDataPlans(each.data);
    } else {
      //TODO
      setServiceName(each.airtime);
      // return;
    }
  };

  const getAllDataPlans = async (data) => {
    const response = await getDataPlans(data);

    //populate the data plan
    setRechargeData(
      response.data.map((each) => {
        return {
          id: each.product_id,
          value: `${each.allowance === null ? "" : each.allowance} ${
            each.validity
          } ${each.price}`,
          label: `${each.allowance === null ? "" : each.allowance} ${
            each.validity
          } ${each.price}`,
        };
      })
    );
  };

  return (
    <Container>
      {data.map((each) => {
        return (
          <Item
            onClick={() => handleClick(each)}
            className={each.id === serviceProviderType && "active"}
            key={each.id}
          >
            <Image src={each.img} className={"big"} />
          </Item>
        );
      })}
    </Container>
  );
};

export default ServiceProvider;
