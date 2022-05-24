import React from 'react'
import { render } from 'react-dom'
import { KeepAlive, Provider } from 'react-keep-alive';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import { Detail, BriefDetail, SchoolDetail } from './Detail'
import Home from './Home';

render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <Provider> */}
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route index element={<KeepAlive name='home'><Home /></KeepAlive>} /> */}
        <Route index element={<Home />} />
        <Route path="detail" element={<Detail />}>
          <Route path=":schoolName" element={<SchoolDetail />} />
          <Route path="brief" element={<BriefDetail />} />
        </Route>
      </Route>
    </Routes>
    {/* </Provider> */}
  </BrowserRouter>
  // </React.StrictMode>
  ,
  document.getElementById('root')
)
