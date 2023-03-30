import React from "react";
import Pagination from "./pagination";
import Table from "./table";

const History = ({ value, header }) => {
  return (
    <div>
      <Table header={header} value={value} />
      <Pagination value={value} />
    </div>
  );
};

export default History;
