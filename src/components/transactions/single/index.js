import React from "react";
import { getAllSingleRequest } from "../../../helper/requests";
import SharedContainer from "../shared/index";
import Table from "./table";
import Pagination from "./pagination";
import NoMoreSearch from "../nomore";
import SearchSingle from "./search.single";
import useDebounce from "../../../hooks/useDebounce";
import Loader from "../modal";
import DownloadWithDateRange from "../download/download.excel";

const SingleTransaction = () => {
  const [searchBy, setSearchBy] = React.useState("Recipient");
  const [transactions, setTransactions] = React.useState([]);
  const [singleTransaction, setSingleTransaction] = React.useState({});
  const [pageSize, setPageSize] = React.useState(20);
  const [entries, setEntries] = React.useState(0);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [pages, setPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [recipientQuery, setRecipientQuery] = React.useState("");
  const [productQuery, setProductQuery] = React.useState("");
  const [failed, setFailed] = React.useState(null);
  const [emptyQuery, setEmptyQuery] = React.useState(false);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [searchPagination, setSearchPagination] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);

  const debounceRecipientQuery = useDebounce(recipientQuery);
  const debounceProductQuery = useDebounce(productQuery);

  //get all single transactions on load
  React.useEffect(() => {
    const _getSingleRequest = async () => {
      const { data } = await getAllSingleRequest();
      setLoading(false);
      setTransactions(data.list);
      setPageSize(data.pageSize);
      setPages(data.pages);
      setEntries(data.totalSize);
    };
    _getSingleRequest();
  }, []);

  if (loading) {
    return (
      <div>
        <SharedContainer />
      </div>
    );
  }
  return (
    <div>
      <SearchSingle
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        setSearchPagination={setSearchPagination}
        searchPagination={searchPagination}
        setTransactions={setTransactions}
        setPages={setPages}
        setEntries={setEntries}
        setIsEmpty={setIsEmpty}
        productQuery={productQuery}
        recipientQuery={recipientQuery}
        failed={failed}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setFailed={setFailed}
        setProductQuery={setProductQuery}
        setRecipientQuery={setRecipientQuery}
        debounceRecipientQuery={debounceRecipientQuery}
        debounceProductQuery={debounceProductQuery}
        setEmptyQuery={setEmptyQuery}
        setClicked={setClicked}
      />
      {isEmpty && <NoMoreSearch />}
      <Table
        transactions={transactions}
        setSingleTransaction={setSingleTransaction}
      />
      <Pagination
        data={transactions}
        pageSize={pageSize}
        pages={pages}
        setIsEmpty={setIsEmpty}
        entries={entries}
        setTransactions={setTransactions}
        setPages={setPages}
        setPageSize={setPageSize}
        setEntries={setEntries}
        searchPagination={searchPagination}
        setSearchPagination={setSearchPagination}
        recipientQuery={recipientQuery}
        productQuery={productQuery}
        failed={failed}
        emptyQuery={emptyQuery}
        startDate={startDate}
        endDate={endDate}
        clicked={clicked}
        setClicked={setClicked}
      />

      {Object.keys(singleTransaction).length > 0 ? (
        <Loader
          singleTransaction={singleTransaction}
          setSingleTransaction={setSingleTransaction}
        />
      ) : null}

      {transactions.length > 0 && <DownloadWithDateRange value="single" />}
    </div>
  );
};

export default SingleTransaction;
