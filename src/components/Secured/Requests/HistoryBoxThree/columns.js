import { BiCheck } from "react-icons/bi";
import { RiCloseFill } from "react-icons/ri";
// import { dateFormat } from "../../../../utils/format.created.date";
import { formatBalance } from "../../../../utils/formatBalance";

export const header = [
  { id: 1, name: "id" },
  { id: 2, name: "Payment" },
  { id: 3, name: "Scheduled date" },
];

export const columnTwo = [
  { Header: "Recipient", accessor: "recipient" },
  { Header: "Product", accessor: "serviceCode" },
  {
    Header: "Cost",
    accessor: "serviceCost",
    Cell: ({ value }) => formatBalance(value),
  },
  {
    Header: "Status",
    accessor: "failed",
    Cell: ({ value }) => {
      if (!value) {
        return <BiCheck color="green" size={22} />;
      } else {
        return <RiCloseFill color="red" size={22} />;
      }
    },
  },
];
