import React from "react";
import { TableContext } from "../../context/TableContext";
import { CirclesWithBar } from "react-loader-spinner";
import TableContainer from "./table.container";
import styled from "styled-components";
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Table = ({ header, value }) => {
  const { data } = React.useContext(TableContext);

  return (
    <div>
      {data.length > 0 ? (
        <TableContainer header={header} value={value} />
      ) : (
        <Flex>
          <CirclesWithBar
            height="20"
            width="20"
            color="#EB6A2B"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="circles-with-bar-loading"
          />
        </Flex>
      )}
    </div>
  );
};

export default Table;
