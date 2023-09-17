import { useEffect, useState } from "react";
import styled from "styled-components";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";

const Thead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TableHead = ({ columns, handleSorting, setClick, click }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    if (click === 2) {
      setOrder("asc");
      setSortField("");
    }
  }, [click]);

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
    if (accessor === sortField) {
      setClick(click + 1);
    } else {
      setClick(0);
    }
  };
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          return (
            <th
              onClick={sortable ? () => handleSortingChange(accessor) : null}
              key={accessor}
            >
              <Thead>
                {sortable &&
                  sortField &&
                  sortField === accessor &&
                  order === "asc" && <HiSortAscending color="black" />}
                {sortable &&
                  sortField &&
                  sortField === accessor &&
                  order === "desc" && <HiSortDescending color="black" />}
                {label}
              </Thead>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
