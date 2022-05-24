import React from 'react'
import { render } from 'react-dom'
// import { KeepAlive, Provider } from 'react-keep-alive';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import { Detail, BriefDetail, SchoolDetail } from './Detail'
import Home from './Home';

// redux
import store from './assets/js/store'
import { Provider } from 'react-redux'

render(
  // <React.StrictMode>
  <Provider store={store}>
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
  </Provider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
)
