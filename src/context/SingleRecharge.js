import { createContext, useState } from "react";

export const SingleContext = createContext();

const SingleContextProvider = ({ children }) => {
  const rechargeId = 3;
  const [rechargeData, setRechargeData] = useState([]);
  const [singleData, setSingleData] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dataText, setDataText] = useState("");
  const [serviceProviderError, setServiceProviderError] = useState("");
  const [serviceProviderType, setServiceProviderType] = useState(0);
  const [serviceName, setServiceName] = useState("");
  const [message, setMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [cableId, setCableId] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [name, setName] = useState("");
  const [boldText, setBoldText] = useState("");
  const [autoRecharge, setAutoRecharge] = useState([]);

  return (
    <SingleContext.Provider
      value={{
        rechargeData,
        setRechargeData,
        singleData,
        setSingleData,
        phoneNumber,
        setPhoneNumber,
        serviceProviderError,
        setServiceProviderError,
        serviceProviderType,
        setServiceProviderType,
        dataText,
        setDataText,
        rechargeId,
        serviceName,
        setServiceName,
        message,
        setMessage,
        errorMessage,
        setErrorMessage,
        responseMessage,
        setResponseMessage,
        cableId,
        setCableId,
        name,
        setName,
        startDate,
        setStartDate,
        setAutoRecharge,
        setBoldText,
        endDate,
        setEndDate,
        boldText,
        autoRecharge,
      }}
    >
      {children}
    </SingleContext.Provider>
  );
};

export default SingleContextProvider;
