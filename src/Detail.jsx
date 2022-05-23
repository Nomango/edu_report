import { useParams, BrowserRouter, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { GetSchool } from "./Schools";
import React, { useEffect } from 'react'

// tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './assets/css/detail.less'
import { InitAll } from "./assets/js/main";

import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

function Detail() {
    useEffect(() => {
        console.log('ready');
        $('.bg-cover .ball').hide();
        setTimeout(() => { InitAll(); }, 500);
    });
    return (
        <div id="detail">
            <div className='detail-title'>
                <h3 className='font-hei'>广西新工科教育成果展</h3>
                <p>Guangxi New Engineering Education</p>
                <div className="spliter"></div>
            </div>
            <Outlet />
        </div>
    )
}

function SchoolDetail() {
    const params = useParams();
    let school = GetSchool(params.schoolName);
    if (school == null) {
        return (
            <>学校不存在</>
        )
    }
    const navigate = useNavigate();
    return (
        <div className="detail-container">
            <img className="school-icon" src={`/assets/img/icons/with_text/${school.icon}`} alt={school.name} />
            <a className="goback" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faAnglesLeft}></FontAwesomeIcon>
                &nbsp;向上返回
            </a>
            <Tabs
                className={'detail-tabs'}
                selectedTabClassName={'selected-tab'}
                selectedTabPanelClassName={'selected-tab-panel'}
            >
                <TabList>
                    <Tab>概况</Tab>
                    <Tab>案例1</Tab>
                    {/* <Tab>案例2</Tab> */}
                </TabList>
                <TabPanel>
                    <div className="brief-container">
                        <div className="brief-items">
                            <div className="brief-item">
                                <div className="brief-item-num">51</div>
                                <p>工科专业</p>
                            </div>
                            <div className="brief-item">
                                <div className="brief-item-num">12</div>
                                <p>工科大类</p>
                            </div>
                            <div className="brief-item">
                                <div className="brief-item-num">20</div>
                                <p>优势专业</p>
                            </div>
                            <div className="brief-item">
                                <div className="brief-item-num">15513</div>
                                <p>工科在校生</p>
                            </div>
                        </div>
                        <div className="brief-fuller"></div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="case-container">
                        <img src='/assets/img/book/桂电/1.jpg'></img>
                        <img src='/assets/img/book/桂电/2.jpg'></img>
                        <img src='/assets/img/book/桂电/3.jpg'></img>
                        <img src='/assets/img/book/桂电/4.jpg'></img>
                        <img src='/assets/img/book/桂电/5.jpg'></img>
                        <img src='/assets/img/book/桂电/6.jpg'></img>
                        <img src='/assets/img/book/桂电/7.jpg'></img>
                        <img src='/assets/img/book/桂电/8.jpg'></img>
                        <img src='/assets/img/book/桂电/9.jpg'></img>
                    </div>
                </TabPanel>
                {/* <TabPanel>
                    <h2>案例2</h2>
                </TabPanel> */}
            </Tabs>
        </div>
    )
}

function BriefDetail() {
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

export { Detail, SchoolDetail, BriefDetail };
