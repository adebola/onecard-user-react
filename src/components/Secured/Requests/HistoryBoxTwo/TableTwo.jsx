import React, { useState } from "react";

import { tableHeaderTwo } from "./columns";
// import { FaSortDown, FaSortUp } from "react-icons/fa";
import styled from "styled-components";
import ExcelDownload from "../ExcelDownload";
import Pagination from "./PaginationTableTwo";
import { BiCheck } from "react-icons/bi";
import { RiCloseFill } from "react-icons/ri";
import { getBulkDetail, retryRequest } from "../../../../helper/requests";

import { AiOutlineClose } from "react-icons/ai";
import CancelButton from "../../../Button/normal";
import SearchBy from "../../../SearchBy";
import Search from "../../../Search";
import { useEffect } from "react";

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

const Container = styled.div`
  margin-top: 55px;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Message = styled.div`
  background: var(--text-color);
  color: var(--white);
  width: 420px;
  height: 400px;
  margin: auto;
  border-radius: 4px;
  padding: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WhiteInner = styled.div`
  background: var(--white);
  width: 320px;
  height: 320px;
  margin: auto;
  padding: 1rem;
  border-radius: 4px;
`;

const LightText = styled.p`
  font-size: 9px;
  font-style: normal;
  font-weight: 400;
  line-height: 11px;
  letter-spacing: 0em;
  text-align: center;
  color: var(--text-color);
  margin-bottom: 60px;
`;

const StrongText = styled.p`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: #dc3545;
  margin-bottom: 10px;
`;

const IconBox = styled.div`
  height: 90px;
  width: 90px;
  padding: 1rem;
  border-radius: 50%;
  border: 5px solid #dc3545;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-bottom: 20px;
`;

const EmptyText = styled.p`
  color: var(--text-color);
  font-size: 14px;
  margin: 20px 0;
`;

const TableTwo = ({
  data,
  id,
  type,
  pages,
  setDataTwo,
  active,
  setActive,
  entries,
  pageSize,
  setEntriesTableTwo,
  setPageSizeTableTwo,
  setPagesTableTwo,
}) => {
  const [clicked, setClicked] = useState(false);
  const [msg, setMsg] = useState("");
  const [text, setText] = useState("recipient");
  const [query, setQuery] = useState("");
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const response = await getBulkDetail(id);
        setDataTwo(response.data.list);
        setEntriesTableTwo(response.data.totalSize);
        setPagesTableTwo(response.data.pages);
        setPageSizeTableTwo(response.data.pageSize);
      } catch (error) {
        const message = error.response.data.message;
        console.log(message);
      }
    };
    !query && setEmpty(false) && awaitResponse();
  }, [
    id,
    query,
    setDataTwo,
    setEntriesTableTwo,
    setPageSizeTableTwo,
    setPagesTableTwo,
  ]);

  const handleRetryRequest = async () => {
    // console.log(clicked, id);
    setClicked(true);
    try {
      const response = await retryRequest(id);
      // console.log(response);
      if (response.status === 200) {
        setClicked(false);
        setDataTwo([]);
      } else {
        setMsg(response.data.message);
      }
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
    }
  };

  const renderModal = () => {
    return (
      <Background>
        {msg && (
          <Message>
            <WhiteInner>
              <IconBox>
                <AiOutlineClose color="#DC3545" size={30} />{" "}
              </IconBox>
              <StrongText>{msg}</StrongText>
              <LightText>Please try again</LightText>{" "}
              <CancelButton onClick={() => setClicked(false)} name="Close" />
            </WhiteInner>
          </Message>
        )}
      </Background>
    );
  };

  console.log(empty);

  return (
    <Container>
      <SearchBy
        setEmpty={setEmpty}
        setEntriesTableTwo={setEntriesTableTwo}
        setPageSizeTableTwo={setPageSizeTableTwo}
        setPagesTableTwo={setPagesTableTwo}
        setDataTwo={setDataTwo}
        text={text}
        setQuery={setQuery}
        setText={setText}
      >
        <Search
          setEmpty={setEmpty}
          setDataTwo={setDataTwo}
          query={query}
          setQuery={setQuery}
          text={text}
          setEntriesTableTwo={setEntriesTableTwo}
          setPageSizeTableTwo={setPageSizeTableTwo}
          setPagesTableTwo={setPagesTableTwo}
        />
      </SearchBy>
      {empty ? (
        <EmptyText>No results found, try another search</EmptyText>
      ) : (
        <>
          <div>
            <div>
              <table>
                <thead>
                  <tr>
                    {tableHeaderTwo.map((each) => (
                      <th>{each.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((each) => {
                    return (
                      <tr>
                        <td>{each.recipient}</td>
                        <td>{each.serviceCode}</td>
                        <td>{each.serviceCost.toFixed(2)}</td>
                        <td>
                          {each.failed ? (
                            <Button onClick={handleRetryRequest}>
                              <RiCloseFill color="red" size={19} />
                              <p>RETRY</p>
                            </Button>
                          ) : (
                            <BiCheck color="green" size={22} />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <Pagination
                active={active}
                setActive={setActive}
                entries={entries}
                pageSize={pageSize}
                data={data}
                pages={pages}
                id={id}
                type={type}
                setEntriesTableTwo={setEntriesTableTwo}
                setPageSizeTableTwo={setPageSizeTableTwo}
                setPagesTableTwo={setPagesTableTwo}
                setDataTwo={setDataTwo}
              />
            </div>
          </div>
          <ExcelDownload id={id} type={type} />
        </>
      )}
      {clicked && renderModal()}
    </Container>
  );
};

export default TableTwo;
