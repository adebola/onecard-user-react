import React from "react";

const TableContext = React.createContext();

const TableProvider = ({ children }) => {
  const [data, setData] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(0);
  const [pages, setPages] = React.useState(0);
  const [entries, setEntries] = React.useState(0);

  return (
    <TableContext.Provider
      value={{
        data,
        setData,
        pageSize,
        setPageSize,
        pages,
        setPages,
        entries,
        setEntries,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
export { TableContext, TableProvider };
