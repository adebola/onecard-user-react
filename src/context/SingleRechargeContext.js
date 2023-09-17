import { createContext, useState } from "react";

export const SingleRechargeContext = createContext();

export const SingleMessageProvider = ({ children }) => {
  const [selectedId, setSelectedId] = useState(0);
  const [tabDetails, setTabDetails] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isSelect, setIsSelect] = useState(false);
  const [success, setSuccess] = useState(false);
  const [details, setDetails] = useState({
    productId: "",
    recipient: "",
    serviceCode: "",
    serviceCost: "",
    accountNumber: "",
    accountType: "",
    paymentMode: "wallet",
    telephone: "",
  });
  const [clicked, setClicked] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataPlans, setDataPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [cardDetails, setCardDetails] = useState({});

  return (
    <SingleRechargeContext.Provider
      value={{
        details,
        setDetails,
        activeId,
        setActiveId,
        clicked,
        setClicked,
        errors,
        setErrors,
        selectedId,
        setSelectedId,
        isSelect,
        setIsSelect,
        tabDetails,
        setTabDetails,
        loading,
        setLoading,
        success,
        setSuccess,
        dataPlans,
        setDataPlans,
        showModal,
        setShowModal,
        response,
        setResponse,
        errorMessage,
        setErrorMessage,
        cardDetails,
        setCardDetails,
      }}
    >
      {children}
    </SingleRechargeContext.Provider>
  );
};
