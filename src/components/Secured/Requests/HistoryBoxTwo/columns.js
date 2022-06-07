import { BiCheck } from "react-icons/bi";
import { RiCloseFill } from "react-icons/ri";

import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border: 1px solid #dc3444;
  color: #dc3444;
`;

export const header = [
  { id: 1, name: "id" },
  { id: 2, name: "Payment" },
  { id: 3, name: "Total Cost" },
  { id: 4, name: "Date" },
];

export const columnTwo = [
  { Header: "Recipient", accessor: "recipient" },
  { Header: "Product", accessor: "serviceCode" },
  {
    Header: "Cost",
    accessor: "serviceCost",
  },
  {
    Header: "Status",
    accessor: "failed",
    Cell: ({ value }) => {
      if (value) {
        return <BiCheck color="green" size={22} />;
      } else {
        return (
          <Button onClick={() => console.log("retry")}>
            <RiCloseFill color="red" size={19} />
            <p>RETRY</p>
          </Button>
        );
      }
    },
  },
];
