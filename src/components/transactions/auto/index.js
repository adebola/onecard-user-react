import React from "react";
import { getAutoRechargePlans } from "../../../helper/requests";
import NoMoreSearch from "../nomore";
import SharedContainer from "../shared";
import Pagination from "./pagination";
import SearchByDate from "./searchby.date";
import Table from "./table";
import DownloadWithDateRange from "../download/download.excel";

const AutoTransaction = () => {
  const [transactions, setTransactions] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(20);
  const [entries, setEntries] = React.useState(0);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [pages, setPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const _getAutoRequest = async () => {
      const { data } = await getAutoRechargePlans();
      setLoading(false);
      setTransactions(data.list);
      setPageSize(data.pageSize);
      setPages(data.pages);
      setEntries(data.totalSize);
    };
    _getAutoRequest();
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
      <Table transactions={transactions} />
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
      <DownloadWithDateRange value="auto" />
    </div>
  );
};

export default AutoTransaction;
