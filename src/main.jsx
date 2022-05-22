import React from 'react'
import {render} from 'react-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import Detail from './Detail'
import Home from './Home';

render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="detail">
          <Route path=":schoolName" element={<Detail />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
, document.getElementById('root'));
