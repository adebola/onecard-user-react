import { dateFormat } from "../../../../utils/format.created.date";

export const columns = [
  { Header: "id", accessor: "id" },
  { Header: "Name", accessor: "title" },
  {
    Header: "Start Date",
    accessor: "startDate",
    // Cell: ({ value }) => getFormattedDate(value),
    Cell: ({ value }) => {
      return dateFormat(value);
    },
  },
  {
    Header: "End Date",
    accessor: "endDate",
    // Cell: ({ value }) => getFormattedDate(value),
    Cell: ({ value }) => {
      return dateFormat(value);
    },
  },
];

export const columnsTwo = [
  { Header: "id", accessor: "id" },
  { Header: "Name", accessor: "title" },
  { Header: "DaysOfWeek", accessor: "daysOfWeek" },
  { Header: "DaysOfMonth", accessor: "daysOfMonth" },
  { Header: "Start Date", accessor: "startDate" },
  { Header: "End Date", accessor: "endDate" },
];
