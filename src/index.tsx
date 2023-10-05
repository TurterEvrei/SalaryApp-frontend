import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from "./store/store";
import {BrowserRouter} from "react-router-dom";
import './customStyles.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./theme/theme";
// import './styles.css';

interface State {
    store: Store,
}

const store = new Store();

export const Context = createContext<State>({
    store,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Context.Provider value={{
        store
    }}>
        {/*<React.StrictMode>*/}
        {/*    <BrowserRouter>*/}
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
            {/*</BrowserRouter>*/}
        {/*</React.StrictMode>*/}
    </Context.Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
