import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import data from "../../MOCK_DATA.json";
import Pagination from "../Pagination";

const MyTable = () => {
  const [tableData, setTableData] = useState(data);
  const [click, setClick] = useState(0);

  useEffect(() => {
    if (click === 2) {
      setTableData(data);
      setClick(0);
    }
    return;
  }, [click]);

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });

      setTableData(sorted);
    }
  };

  const columns = [
    { label: "First Name", accessor: "first_name", sortable: true },
    { label: "Last Name", accessor: "last_name", sortable: true },
    { label: "Email", accessor: "email", sortable: true },
    { label: "Gender", accessor: "gender", sortable: true },
    { label: "Date", accessor: "date", sortable: true },
  ];

  return (
    <>
      <table>
        <TableHead
          click={click}
          setClick={setClick}
          columns={columns}
          handleSorting={handleSorting}
        />
        <TableBody columns={columns} data={tableData} />
      </table>
      <Pagination />
    </>
  );
};

export default MyTable;
