import { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  //balance amount
  const [balance, setBalance] = useState(0);

  //allTransactions
  const [transactions, setTransactions] = useState([]);

  //date
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState();
  //data-type
  const [dataType, setDataType] = useState("");

  //beneficiaries
  const [bene, setBene] = useState([]);
  //singlebene
  const [singleBene, setSingleBene] = useState({});

  //single-phoneNumber
  const [singlePhoneNumber, setSinglePhoneNumber] = useState("");

  //single-accountNumber
  const [accountNumber, setAccountNumber] = useState("");

  //single-amount
  const [singleAmount, setSingleAmount] = useState("");

  //bulk-single amount
  const [bulkSingleAmount, setBulkSingleAmount] = useState("");

  //single-dataplans
  const [selectedSingleDataPlans, setSelectedSingleDataPlans] = useState({});

  //bulk-phoneNumber
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bulkPhoneNumber, setBulkPhoneNumber] = useState("");

  //listofbulkNo
  const [listOfBulk, setListOfBulk] = useState([]);

  //serviceName
  const [serviceName, setServiceName] = useState("");

  //selectedDataPlans
  const [selectedDataPlans, setSelectedDataPlans] = useState({});

  //chooseBene
  const [beneModal, setBeneModal] = useState(false);

  //airtimeId
  const [airtimeId, setAirtimeId] = useState(0);

  //paymentType
  const [paymentMode, setPaymentMode] = useState("wallet");

  //response message
  const [responseMessage, setResponseMessage] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        balance,
        setBalance,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        transactions,
        setTransactions,
        dataType,
        setDataType,
        bene,
        setBene,
        singleBene,
        setSingleBene,
        phoneNumber,
        setPhoneNumber,
        listOfBulk,
        setListOfBulk,
        serviceName,
        setServiceName,
        selectedDataPlans,
        setSelectedDataPlans,
        beneModal,
        setBeneModal,
        airtimeId,
        setAirtimeId,
        paymentMode,
        setPaymentMode,
        singleAmount,
        setSingleAmount,
        singlePhoneNumber,
        setSinglePhoneNumber,
        selectedSingleDataPlans,
        setSelectedSingleDataPlans,
        responseMessage,
        setResponseMessage,
        accountNumber,
        setAccountNumber,
        bulkSingleAmount,
        setBulkSingleAmount,
        bulkPhoneNumber,
        setBulkPhoneNumber,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
