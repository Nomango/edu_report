import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import { Detail, BriefDetail, SchoolDetail } from './Detail'
import Home from './Home';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="detail" element={<Detail />}>
          <Route path=":schoolName" element={<SchoolDetail />} />
          <Route path="brief" element={<BriefDetail />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
)
