import "react-datepicker/dist/react-datepicker.css";

import App from "./App";
import AuthProvider from "./context/AuthProvider";
import BulkRechargeContextProvider from "./context/BulkRecharge";
import GlobalProvider from "./context/GlobalProvider";
import ModalContextProvider from "./context/ModalProvider";
import { BrowserRouter as Router } from "react-router-dom";
import SingleContextProvider from "./context/SingleRecharge";
import { SingleMessageProvider } from "./context/SingleRechargeContext";
import { TableProvider } from "./context/TableContext";
import UserServices from "./services/UserServices";
import { createGlobalStyle } from "styled-components";
import { render } from "react-dom";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
	font-family: 'Roboto', san-serif;
}

html {
  scroll-behavior: smooth;
}

table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td,
table th {
  border: 1px solid #ddd;
  font-size: 13px;
  padding: 8px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
  cursor: pointer;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  font-size: 13px;
  color: black;
  background: white;
}



body {
	--white: #fff;
	--text-color: #124a80;
	--btn-color: #eb6a2b;
	--light-background: #FDF0E9;

}

.react-datepicker__input-container input{
	width: 100%;
	margin-top: 5px;
	padding: 0.6rem;
	color: var(--text-color);
}

.css-b62m3t-container{
	margin-top:10px;
}


.flex-1 {
  flex: 1;
}

.flex{
  display: flex;
}

.ai-center {
  align-items: center;
}

@media screen and (max-width: 767px){
	input, select, textarea{
		font-size:16px;
	}
}

`;

const app = () =>
  render(
    <>
      <Router>
        <BulkRechargeContextProvider>
          <TableProvider>
            <AuthProvider>
              <ModalContextProvider>
                <SingleContextProvider>
                  <GlobalProvider>
                    <SingleMessageProvider>
                      <GlobalStyle />
                      <App />
                    </SingleMessageProvider>
                  </GlobalProvider>
                </SingleContextProvider>
              </ModalContextProvider>
            </AuthProvider>
          </TableProvider>
        </BulkRechargeContextProvider>
      </Router>
    </>,
    document.getElementById("root")
  );
UserServices.initKC(app);
