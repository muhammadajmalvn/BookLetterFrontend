import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './Redux/store';
import { Provider } from 'react-redux';
import App from './App';


import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


const element = document.getElementById("root")
const root = ReactDOM.createRoot(element)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
