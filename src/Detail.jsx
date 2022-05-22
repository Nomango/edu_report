import { useParams, BrowserRouter, Routes, Route } from "react-router-dom";
import { GetSchool } from "./Schools";
import React from 'react'

import './assets/css/detail.css'

function Detail() {
    const params = useParams();
    let school = GetSchool(params.schoolName);
    if (school == null) {
        return (
            <>学校不存在</>
        )
    }
    return (
        <div className="detail-container">
            <h2>{school.name}</h2>
            {school.content}
        </div>
    )
}

export default Detail;

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <Routes>
//             <Route path="/" element={<Detail />} />
//                 <Route path="/:schoolName" element={<Detail />} />
//             </Routes>
//         </BrowserRouter>
//     </React.StrictMode>
// )
