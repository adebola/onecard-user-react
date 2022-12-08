import React from "react";
import { getWalletFunding } from "../../../helper/requests";
import NoMoreSearch from "../nomore";
import SharedContainer from "../shared";
import Pagination from "./pagination";
import Table from "./table";

const WalletTransaction = () => {
  const [transactions, setTransactions] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(20);
  const [entries, setEntries] = React.useState(0);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [pages, setPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const _getWalletRequest = async () => {
      const { data } = await getWalletFunding();
      setLoading(false);
      if (data.list.length === 0) {
        setIsEmpty(true);
      } else {
        setTransactions(data.list);
        setPageSize(data.pageSize);
        setPages(data.pages);
        setEntries(data.totalSize);
      }
    };
    _getWalletRequest();
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
      {isEmpty && <NoMoreSearch />}
      <Table transactions={transactions} pages={pages} entries={entries} />
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
      />
    </div>
  );
};

export default WalletTransaction;
