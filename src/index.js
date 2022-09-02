import React from "react";
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

import App from "./components/App"

const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})


const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)




