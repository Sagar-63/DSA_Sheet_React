import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {localDbExistsPromise, storeDataToDBPromise} from './db-queries.js';

async function check(){
  const result = await localDbExistsPromise();
  console.log(result.length);
  if(result.length === 0){
    console.log('Inside');
    await storeDataToDBPromise();
  }
  console.log('Outside');
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <BrowserRouter>  
    <App/>
  </BrowserRouter>
);
}
check();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
