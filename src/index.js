import { render } from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import { createGlobalStyle } from "styled-components";
import GlobalProvider from "./context/GlobalProvider";
import ModalContextProvider from "./context/ModalProvider";
import UserServices from "./services/UserServices";
import "react-datepicker/dist/react-datepicker.css";

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

body {
	--white: #fff;
	--text-color: #124a80;
	--btn-color: #eb6a2b;
	--light-background: #FDF0E9;

}

.react-datepicker__input-container input{
	width: 100%;
	margin-top: 10px;
	padding: 0.6rem;
	color: var(--text-color);
}

.css-b62m3t-container{
	margin-top:10px;
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
        <AuthProvider>
          <ModalContextProvider>
            <GlobalProvider>
              <GlobalStyle />
              <App />
            </GlobalProvider>
          </ModalContextProvider>
        </AuthProvider>
      </Router>
    </>,
    document.getElementById("root")
  );
UserServices.initKC(app);
