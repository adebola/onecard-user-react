import { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [sendToBeneModal, setSendToBeneModal] = useState(false);
  const [responseModal, setResponseModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordModal, setPasswordModal] = useState(false);
  const [responseDetail, setResponseDetail] = useState({});
  const [rechargeType, setRechargeType] = useState(1);
  const [cableMessage, setCableMessage] = useState("");
  const [amountError, setAmountError] = useState("");

  const [questionModal, setQuestionModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [reload, setReload] = useState(false);

  const [rechargeName, setRechargeName] = useState("");
  const [weeklyAutoRecharge, setWeeklyAutoRecharge] = useState([]);
  const [monthlyAutoRecharge, setMonthlyAutoRecharge] = useState([]);
  const [error, setError] = useState(false);
  const [beneId, setBeneId] = useState(0);

  const [nameError, setNameError] = useState("");

  return (
    <ModalContext.Provider
      value={{
        sendToBeneModal,
        setSendToBeneModal,
        name,
        setName,
        rechargeName,
        setRechargeName,
        responseModal,
        setResponseModal,
        responseDetail,
        setResponseDetail,
        rechargeType,
        setRechargeType,
        errorModal,
        setErrorModal,
        errorMessage,
        setErrorMessage,
        amountError,
        setAmountError,
        cableMessage,
        setCableMessage,
        passwordModal,
        setPasswordModal,
        questionModal,
        setQuestionModal,
        userId,
        setUserId,
        organizationId,
        setOrganizationId,
        reload,
        setReload,
        monthlyAutoRecharge,
        setMonthlyAutoRecharge,
        weeklyAutoRecharge,
        setWeeklyAutoRecharge,
        setError,
        error,
        beneId,
        setBeneId,
        nameError,
        setNameError,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
