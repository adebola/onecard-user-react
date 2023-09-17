import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalProvider";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const MyTable = ({ columns, data }) => {
  const [click, setClick] = useState(0);
  const { setTransactions } = useContext(GlobalContext);

  useEffect(() => {
    if (click === 2) {
      setTransactions(data);
      setClick(0);
    }
    return;
  }, [click, data, setTransactions]);

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...data].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });

      setTransactions(sorted);
    }
  };

  return (
    <>
      <table>
        <TableHead
          click={click}
          setClick={setClick}
          columns={columns}
          handleSorting={handleSorting}
        />
        <TableBody columns={columns} data={data} />
      </table>
    </>
  );
};

export default MyTable;
