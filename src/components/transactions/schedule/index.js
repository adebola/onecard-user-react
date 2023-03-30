import React from "react";
import { getAllScheduledRequest } from "../../../helper/requests";
import SearchByDate from "./searchby.date";
import DownloadWithDateRange from "../download/download.excel";
import NoMoreSearch from "../nomore";
import SharedContainer from "../shared";
import DetailsTable from "./details.table";
import Pagination from "./pagination";
import Table from "./table";

const ScheduleTransaction = () => {
  const [transactions, setTransactions] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(20);
  const [entries, setEntries] = React.useState(0);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [pages, setPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [detailedTransactions, setDetailedTransactions] = React.useState([]);
  const [detailedPages, setDetailedPages] = React.useState(0);
  const [detailedPageSize, setDetailedPageSize] = React.useState(20);
  const [detailedEntries, setDetailedEntries] = React.useState(0);
  const [bulkId, setBulkId] = React.useState("");
  const [searchPagination, setSearchPagination] = React.useState(false);

  React.useEffect(() => {
    const _getScheduleRequest = async () => {
      const { data } = await getAllScheduledRequest();
      setLoading(false);
      setTransactions(data.list);
      setPageSize(data.pageSize);
      setPages(data.pages);
      setEntries(data.totalSize);
    };
    _getScheduleRequest();
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
      <SearchByDate
        setTransactions={setTransactions}
        setPages={setPages}
        setPageSize={setPageSize}
        setEntries={setEntries}
        setIsEmpty={setIsEmpty}
      />
      {isEmpty && <NoMoreSearch />}
      <Table
        transactions={transactions}
        setDetailedTransactions={setDetailedTransactions}
        setDetailedPages={setDetailedPages}
        setDetailedPageSize={setDetailedPageSize}
        setDetailedEntries={setDetailedEntries}
        setBulkId={setBulkId}
      />
      <Pagination
        data={transactions}
        pageSize={pageSize}
        pages={pages}
        entries={entries}
        setTransactions={setTransactions}
        setPages={setPages}
        setPageSize={setPageSize}
        setEntries={setEntries}
        setIsEmpty={setIsEmpty}
      />
      <DownloadWithDateRange value="scheduled" />
      {detailedTransactions.length > 0 && (
        <DetailsTable
          detailedTransactions={detailedTransactions}
          setDetailsTransactions={setDetailedTransactions}
          detailedPages={detailedPages}
          detailedPageSize={detailedPageSize}
          detailedEntries={detailedEntries}
          bulkId={bulkId}
          setDetailedEntries={setDetailedEntries}
          setDetailedPages={setDetailedPages}
          setDetailedPageSize={setDetailedPageSize}
          searchPagination={searchPagination}
          setSearchPagination={setSearchPagination}
        />
      )}
    </div>
  );
};

export default ScheduleTransaction;
