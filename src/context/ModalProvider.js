import { createContext, useState } from 'react';

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
	const [name, setName] = useState('');
	const [sendToBeneModal, setSendToBeneModal] = useState(false);
	const [responseModal, setResponseModal] = useState(false);

	const [responseDetail, setResponseDetail] = useState({});

	const [rechargeType, setRechargeType] = useState(1);

	return (
		<ModalContext.Provider
			value={{
				sendToBeneModal,
				setSendToBeneModal,
				name,
				setName,
				responseModal,
				setResponseModal,
				responseDetail,
				setResponseDetail,
				rechargeType,
				setRechargeType,
			}}>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalContextProvider;
