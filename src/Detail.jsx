import { useParams, BrowserRouter, Routes, Route, Outlet, useNavigate, useSearchParams, useOutletContext } from "react-router-dom";
import { GetSchool, AsyncGetSchoolData } from "./Schools";
import React, { useEffect, useRef, useState } from 'react'

import './assets/css/detail.less'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { BaseTable, features, useTablePipeline } from "ali-react-table";
import useStateRef from "react-usestateref";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

function Detail() {
  const { setLoading, setShowBall, setShowMuted } = useOutletContext();

  useEffect(() => {
    setShowBall(false);
    setLoading(false);
  });

  const bindHandleScroll = () => {
    if (window.scrollY > 100) {
      setShowMuted(false);
    } else {
      setShowMuted(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', bindHandleScroll)
    return () => {
      window.removeEventListener('scroll', bindHandleScroll)
      setShowMuted(true);
    }
  }, []);

  const imageViewer = useRef(null);
  const [imageViewerSrc, setImageViewerSrc] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);

  useEffect(() => {
    const images = document.getElementById('main-container').getElementsByTagName('img');

    let deconstructions = [];
    Array.prototype.forEach.call(images, (image) => {
      // console.log(image);
      const l = (e) => {
        setImageViewerSrc(image.src);
        setShowImageViewer(true);
        imageViewer.current.resetTransform();
        imageViewer.current.centerView();
      };
      image.addEventListener('click', l);
      deconstructions.push(() => image.removeEventListener('click', l));
    })
    return () => {
      deconstructions.forEach((f) => {
        f();
      });
    }
  });

  return (
    <div id="detail">
      <div className='detail-title'>
        <h3 className='font-hei'>广西新工科教育成果展</h3>
        {/* <p>Guangxi New Engineering Education</p> */}
        <div className="spliter"></div>
      </div>
      <Outlet />
      <div
        className={["image-viewer-bg", showImageViewer ? null : 'hidden'].join(' ')}
        style={{ transition: 'opacity .8s' }}
        onClick={() => {
          setShowImageViewer(false);
        }}
      >
        <TransformWrapper onInit={(ref) => { imageViewer.current = ref }}>
          <TransformComponent>
            <img src={imageViewerSrc} alt="image-viewer" />
          </TransformComponent>
        </TransformWrapper>
      </div>
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

  const [data, setData, dataRef] = useStateRef({ tables: [], articles: [] });
  const [tableData, setTableData] = useState({ data: [], columns: [] });

  const tableIndex = useRef(0);
  const switchTable = (i) => {
    setTableData({ data: dataRef.current.tables[i].data, columns: dataRef.current.tables[i].columns });
    tableIndex.current = i;
  }

  let pipeline = useTablePipeline()
    .input({ dataSource: tableData.data, columns: tableData.columns })
    .use(features.autoRowSpan());

  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    AsyncGetSchoolData(school.name, (data) => {
      setData(data);
      switchTable(0);
    });
    return () => { mounted.current = false; };
  }, []);
  return (
    <div className="detail-container">
      <img className="school-icon" src={`https://gxnee.oss-cn-guangzhou.aliyuncs.com/assets/img/icons/with_text_white/${school.icon}`} alt={school.name} />
      <div className="top-bar">
        <a className="goback flex-full" onClick={() => navigate('/?slide=4')}>
          <FontAwesomeIcon icon={faAnglesLeft}></FontAwesomeIcon>
          &nbsp;向上返回
        </a>
        <div className={["top-bar-tab", tabIndex == 0 ? 'active' : null].join(' ')} onClick={() => setTabIndex(0)}>工科概况</div>
        {
          data.articles.map((article, i) => {
            return (
              <div className={["top-bar-tab", tabIndex == i + 1 ? 'active' : null].join(' ')} onClick={() => setTabIndex(i + 1)} key={`key-tab-${i}`}>{article.title}</div>
            )
          })
        }
      </div>
      <div id="main-container" className="tabs">
        <div className={["tab", tabIndex == 0 ? 'active' : null].join(' ')}>
          <div className="detail-brief-container">
            <div className="detail-brief-items">
              {
                data.tables.map((table, i) => {
                  return (
                    <div className={["detail-brief-item", tableIndex.current == i ? 'active' : null].join(' ')}
                      onClick={() => switchTable(i)}
                      key={`button-${i}`}
                    >
                      <div className="detail-brief-item-num">{table.num}</div>
                      <p>{table.name}</p>
                    </div>
                  )
                })
              }
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
        {
          data.articles.map((article, i) => {
            return (
              <div className={["tab", tabIndex == i + 1 ? 'active' : null].join(' ')} key={`key-tab-panel-${i}`}>
                <div className="case-container" dangerouslySetInnerHTML={{ __html: article.content }}>
                </div>
              </div>
            )
          })
        }
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

  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    let p = searchParams.get('p');
    if (p) {
      ScrollToAnchor(p);
    }
    return () => { mounted.current = false; };
  }, []);
  return (
    <div className="brief-container">
      <a className="goback" onClick={() => navigate('/?slide=3')}>
        <FontAwesomeIcon icon={faAnglesLeft}></FontAwesomeIcon>
        &nbsp;向上返回
      </a>
      <div id="main-container" className="brief-main">
        <div id="section1" className="brief-title">广西高校工科专业设置</div>
        <p>《普通高等学校本科专业目录（2021年）》在工科下设有31个专业大类，260种专业。至2022年，广西本科院校开设的工科专业已涵盖除核工程类之外的30个专业大类，共有112种专业，布点494个，专业覆盖面达43.08%。与2013年相比，新增了40种专业、276个布点。</p>
        <img src="https://gxnee.oss-cn-guangzhou.aliyuncs.com/assets/img/brief/1.png" alt="1" />
        <p className="img-alt">2013年以来广西工学专业种数与覆盖情况进展</p>

        <div id="section2" className="brief-title">广西工科专业大类布点</div>
        <p>近五年广西本科院校工科专业大类有所增加，从传统的工科门类逐渐转向了电子、生物等与新兴产业相关的专业。开办了与广西产业发展紧密相关的学科门类，填补了空白二级学科门类，如开设海洋工程类专业2个。全区布点最多的专业大类是计算机类专业（121个），其次是电子信息类（75个），再次是机械类（68个）。</p>
        <img src="https://gxnee.oss-cn-guangzhou.aliyuncs.com/assets/img/brief/2.png" alt="2" />
        <p className="img-alt">广西工学各专业大类开设专业数量</p>

        <div id="section3" className="brief-title">工科分学校布点及规模</div>
        <p>在广西35所本科院校中，有34所高校设置了工科专业，共设置工科专业112种，布点494个。工科专业设置最多的高校是桂林电子科技大学（58个），依次为广西大学（40个）、桂林理工大学（38个）、广西科技大学（34）、北部湾大学（29）。截至2021年底广西本科院校工科专业在校生共计15.6万余人。工科在校生最多的高校是桂林电子科技大学，其次是广西科技大学、桂林理工大学、广西大学、桂林航天工业学院、北部湾大学。</p>
        <img src="https://gxnee.oss-cn-guangzhou.aliyuncs.com/assets/img/brief/3.png" alt="3" />
        <p className="img-alt">广西本科高校工科专业分学校布点及在校生人数</p>

        <div id="section4" className="brief-title">广西工科优势特色专业</div>
        <p>在广西494个工科专业布点中，有18个入选教育部卓越工程师教育培养计划2.0专业；24个专业通过了工程教育专业认证（或住建部评估）；50个专业获批为国家级一流专业建设点；66个专业获批为区级一流专业建设点。</p>
        <img src="https://gxnee.oss-cn-guangzhou.aliyuncs.com/assets/img/brief/4.png" alt="4" />
        <p className="img-alt">广西工科类优势特色专业</p>
      </div>
    </div>
  )
}

export { Detail, SchoolDetail, BriefDetail };
