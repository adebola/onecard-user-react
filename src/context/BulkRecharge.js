import { createContext, useState } from "react";

export const BulkRechargeContext = createContext();

const BulkRechargeContextProvider = ({ children }) => {
  const [bulkRecharges, setBulkRecharges] = useState([]);
  const [bulkData, setBulkData] = useState({});
  return (
    <BulkRechargeContext.Provider
      value={{ bulkRecharges, setBulkRecharges, bulkData, setBulkData }}
    >
      {children}
    </BulkRechargeContext.Provider>
  );
};

export default BulkRechargeContextProvider;
