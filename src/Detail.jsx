import { useParams, BrowserRouter, Routes, Route, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { GetSchool, AsyncGetSchoolData } from "./Schools";
import React, { useEffect, useRef, useState } from 'react'

import './assets/css/detail.less'
import { InitAll } from "./assets/js/main";

import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { BaseTable, features, useTablePipeline } from "ali-react-table";

function Detail() {
  useEffect(() => {
    console.log('ready');
    $('.bg-cover .ball').hide();
    setTimeout(() => { InitAll(); }, 500);
  });

  const bindHandleScroll = () => {
    if (window.scrollY > 100) {
      $('.sound-logo').fadeOut();
    } else {
      $('.sound-logo').fadeIn();
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', bindHandleScroll)
    return () => {
      window.removeEventListener('scroll', bindHandleScroll)
      $('.sound-logo').fadeIn();
    }
  }, []);

  return (
    <div id="detail">
      <div className='detail-title'>
        <h3 className='font-hei'>广西新工科教育成果展</h3>
        {/* <p>Guangxi New Engineering Education</p> */}
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
  const [tabIndex, setTabIndex] = useState(0);

  const [data, setData] = useState({ data: [], columns: [], article: '' });
  let pipeline = useTablePipeline()
    .input({ dataSource: data.data, columns: data.columns })
    .use(features.autoRowSpan());

  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    AsyncGetSchoolData(school.name, (data) => setData(data));
    return () => { mounted.current = false; };
  }, [])
  return (
    <div className="detail-container">
      <img className="school-icon" src={`/assets/img/icons/with_text/${school.icon}`} alt={school.name} />
      <div className="top-bar">
        <a className="goback flex-full" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faAnglesLeft}></FontAwesomeIcon>
          &nbsp;向上返回
        </a>
        <div className={["top-bar-tab", tabIndex == 0 ? 'active' : null].join(' ')} onClick={() => setTabIndex(0)}>概况</div>
        <div className={["top-bar-tab", tabIndex == 1 ? 'active' : null].join(' ')} onClick={() => setTabIndex(1)}>案例1</div>
      </div>
      <div className="tabs">
        <div className={["tab", tabIndex == 0 ? 'active' : null].join(' ')}>
          <div className="detail-brief-container">
            <div className="detail-brief-items">
              <div className="detail-brief-item">
                <div className="detail-brief-item-num">51</div>
                <p>工科专业</p>
              </div>
              <div className="detail-brief-item">
                <div className="detail-brief-item-num">12</div>
                <p>工科大类</p>
              </div>
              <div className="detail-brief-item">
                <div className="detail-brief-item-num">20</div>
                <p>优势专业</p>
              </div>
              <div className="detail-brief-item">
                <div className="detail-brief-item-num">15513</div>
                <p>工科在校生</p>
              </div>
            </div>
            <BaseTable
              style={{
                width: '100%',
                overflow: 'auto',
                '--font-size': '1.6rem',
              }}
              {...pipeline.getProps()}
            />
          </div>
        </div>
        <div className={["tab", tabIndex == 1 ? 'active' : null].join(' ')}>
          <div className="case-container" dangerouslySetInnerHTML={{ __html: data.article }}>
          </div>
        </div>
      </div>
    </div>
  )
}

function ScrollToAnchor(name) {
  if (name) {
    let elem = document.getElementById(name);
    if (elem) {
      console.log('scroll to', name);
      setTimeout(() => {
        elem.scrollIntoView();
      }, 500);
    }
  }
}

function BriefDetail() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let p = searchParams.get('p');
  if (p) {
    useEffect(() => {
      ScrollToAnchor(p);
    })
  }
  return (
    <div className="brief-container">
      <a className="goback" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faAnglesLeft}></FontAwesomeIcon>
        &nbsp;向上返回
      </a>
      <div className="brief-main">
        <div id="section1" className="brief-title">广西高校工科专业设置</div>
        <p>《普通高等学校本科专业目录（2021年）》在工科下设有31个专业大类，260种专业。至2022年，广西本科院校开设的工科专业已涵盖除核工程类之外的30个专业大类，共有112种专业，布点494个，专业覆盖面达43.08%。与2013年相比，新增了40种专业、276个布点。</p>
        <img src="/assets/img/brief/1.png" alt="1" />
        <div id="section2" className="brief-title">广西工科专业大类布点</div>
        <p>近五年广西本科院校工科专业大类有所增加，从传统的工科门类逐渐转向了电子、生物等与新兴产业相关的专业。开办了与广西产业发展紧密相关的学科门类，填补了空白二级学科门类，如开设海洋工程类专业2个。全区布点最多的专业大类是计算机类专业（121个），其次是电子信息类（75个），再次是机械类（68个）。</p>
        <img src="/assets/img/brief/2.png" alt="2" />
        <div id="section3" className="brief-title">工科分学校布点及规模</div>
        <p>在广西35所本科院校中，有34所高校设置了工科专业，共设置工科专业112种，布点494个。工科专业设置最多的高校是桂林电子科技大学（58个），依次为广西大学（40个）、桂林理工大学（38个）、广西科技大学（34）、北部湾大学（29）。截至2021年底广西本科院校工科专业在校生共计15.6万余人。工科在校生最多的高校是桂林电子科技大学，其次是广西科技大学、桂林理工大学、广西大学、桂林航天工业学院、北部湾大学。</p>
        <img src="/assets/img/brief/3.png" alt="3" />
        <div id="section4" className="brief-title">广西工科优势特色专业</div>
        <p>在广西494个工科专业布点中，有18个入选教育部卓越工程师教育培养计划2.0专业；24个专业通过了工程教育专业认证（或住建部评估）；50个专业获批为国家级一流专业建设点；66个专业获批为区级一流专业建设点。</p>
        <img src="/assets/img/brief/4.png" alt="4" />
      </div>
    </div>
  )
}

export { Detail, SchoolDetail, BriefDetail };
