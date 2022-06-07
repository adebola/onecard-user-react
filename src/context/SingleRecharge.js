import { createContext, useState } from "react";

export const SingleContext = createContext();

const SingleContextProvider = ({ children }) => {
  const [rechargeId, setRechargeId] = useState(1);
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
        setRechargeId,
        serviceName,
        setServiceName,
        message,
        setMessage,
        errorMessage,
        setErrorMessage,
        responseMessage,
        setResponseMessage,
      }}
    >
      {children}
    </SingleContext.Provider>
  );
};

export default SingleContextProvider;
