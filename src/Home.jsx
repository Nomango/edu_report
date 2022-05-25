import React, { useEffect, useRef, useState } from 'react'

import Map from './Components/Map';
// import Flipbook from './Components/Flipbook';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Mousewheel, Pagination, EffectCoverflow, Grid } from "swiper";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import "swiper/css/grid";

import './assets/css/main.less'
import './assets/css/swiper.less'

import $ from "jquery";

import { Link, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { GetAllSchools } from './Schools';
import Background from './Components/Background';
import useStateRef from 'react-usestateref';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Fade, Grow } from '@material-ui/core';

function useInput(defValue, onValueChange) {
  const [value, setValue, valueRef] = useStateRef(defValue);
  const onChange = (e) => {
    setValue(e.target.value);
    if (onValueChange) {
      onValueChange(e.target.value);
    }
  }
  return {
    value,
    onChange,
  }
}

function Home() {
  const { PlaySound, PauseSound, loading, setLoading } = useOutletContext();

  const [mainSwiper, setMainSwiper, mainSwiperRef] = useStateRef(null);
  const background = useRef(null);

  const [showArrowDown, setShowArrowDown] = useState(true);
  const [showNote, setShowNote] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const slide = searchParams.get('slide');

  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    console.log('ready');
    if (slide) {
      setLoading(false);
      Enter();
      mainSwiperRef.current.slideTo(slide - 1);
      if (slide == 4) {
        setShowArrowDown(false);
      }
    } else {
      // 等待10秒后必须进入页面
      setTimeout(() => {
        setLoading(false);
      }, 10000);
    }
    return () => { mounted.current = false; };
  }, []);

  const muted = useSelector((state) => state.mute.value);
  const [entered, setEntered, enteredRef] = useStateRef(false);

  const Enter = () => {
    if (enteredRef.current) {
      return;
    }
    setEntered(true);
    $('.start-video').fadeOut();
    $('.cover-guide').hide();
    $('.bg-cover .ball').hide();
    $('.arrow-intro').fadeIn();
    $('.main-swiper').fadeIn();
    $('.section-title').fadeIn();
    // StartAll();
    mainSwiperRef.current.enable();
    setTimeout(() => {
      PlaySound();
    }, 5000);
  }

  const PlayVideo = () => {
    $('.start-video').show();
    PauseSound();
    background.current.play();
    // 开始播放8秒后必须进入主页
    setTimeout(() => {
      if (!enteredRef.current) {
        Enter();
        background.current.stop(); // 如果8秒后还没放完，直接停止
      }
    }, 8000);
  }

  const allSchools = GetAllSchools();
  const [schools, setSchools] = useState(allSchools);
  var searchInputProps = useInput('', (schoolName) => {
    if (!schoolName) {
      setSchools(allSchools);
      return;
    }
    setSchools(allSchools.filter(s => s.name.includes(schoolName)));
  });

  return (
    <div id='home'>
      <div className='cover-guide'>
        <Grow in={!loading} style={{ transitionDuration: '1s' }} {...(!loading ? { timeout: 2000 } : {})}>
          <div className='cover-title'>
            <h1 className='font-hei'>广西新工科教育</h1>
            {/* <p>Guangxi New Engineering Education</p> */}
            <h1 className='font-hei spacing'>成果展</h1>
            {/* <p>Achievements Exhibition</p> */}
          </div>
        </Grow>
        <Grow in={!loading} style={{ transitionDuration: '1s' }} {...(!loading ? { timeout: 3000 } : {})}>
          <div className='cover-enter-wrapper'>
            <div className='cover-enter' onClick={PlayVideo}>
              <h3 className='font-hei'>进入观展</h3>
              {/* <p>ENTER</p> */}
            </div>
          </div>
        </Grow>
        <div className='cover-footer'>
          <p>广西新工科教育研究中心</p>
          <p>2022年5月</p>
        </div>
      </div>
      <Background
        ref={background}
        onReady={() => setLoading(false)}
        onFinished={Enter}
        muted={muted}
      />
      <div className='arrow-intro' style={{ opacity: showArrowDown ? 1 : 0 }}>
        <div className='arrow-1'></div>
        <div className='arrow-2'></div>
      </div>
      <div className='section-title'>
        <h2 className='font-hei'>广西新工科教育成果展</h2>
        {/* <p>Guangxi New Engineering Education</p> */}
      </div>
      <Swiper
        enabled={false}
        direction={"vertical"}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        style={{
          display: 'none',
        }}
        modules={[Controller, Mousewheel, Pagination]}
        onSwiper={(swiper) => { console.log(swiper); setMainSwiper(swiper); }}
        // controller={{ control: mainSwiper }}
        onSlideChange={(swiper) => {
          setSearchParams({ 'slide': swiper.activeIndex + 1 });
          if (swiper.activeIndex != swiper.slides.length - 1) {
            setShowArrowDown(true);
          } else {
            setShowArrowDown(false);
          }
        }}
        className={'main-swiper'}
      >
        <SwiperSlide>
          <section className='preface'>
            <div className='section-content'>
              <div className="border-corner border-corner-lt"></div>
              <div className="border-corner border-corner-rt"></div>
              <div className="border-corner border-corner-lb"></div>
              <div className="border-corner border-corner-rb"></div>
              <div className='section-content-title font-kai font-bold'>序言</div>
              <p>为主动应对新一轮科技革命与产业变革，支撑服务国家战略和广西经济发展，广西本科院校积极推进新工科教育研究与实践，建设高水平新工科人才培养体系，培养创新型、复合型和应用型新工科人才。</p>
              <p>新工科教育成果展将从广西工科教育建设进展概况和广西本科院校新工科典型案例两个角度展示广西新工科教育取得的成就，以加强高校之间的交流，共促发展。</p>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="map">
            <div className='section-content'>
              <Map province={'guangxi'} />
              <div className='nav-buttons'>
                <a className="nav-button" onClick={() => mainSwiperRef.current.slideTo(2)}>广西新工科概况</a>
                <br />
                <a className="nav-button" onClick={() => mainSwiperRef.current.slideTo(3)}>广西高校新工科案例</a>
              </div>
            </div>
            <div className='map-note text-center' onClick={() => setShowNote(!showNote)}>
              *数据来源&nbsp;<FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
              <p style={{ opacity: showNote ? 1 : 0 }}>主要是工科专业数据，来源于2021年教育部本科教学状态数据库</p>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="brief with-cities">
            <div className='cities'><img src="https://gxnee.oss-cn-guangzhou.aliyuncs.com/assets/img/cities.png" alt="cities" /></div>
            <div className='section-content'>
              <div className='brief-buttons'>
                <Link className='button-group' to={`/detail/brief?p=section1`}>
                  <span className='button-left'>广西高校工科专业设置</span>
                  {/* <span className='button-right'>点击进入</span> */}
                </Link>
                <Link className='button-group' to={`/detail/brief?p=section2`}>
                  <span className='button-left'>广西工科专业大类布点</span>
                  {/* <span className='button-right'>点击进入</span> */}
                </Link>
                <Link className='button-group' to={`/detail/brief?p=section3`}>
                  <span className='button-left'>工科分学校布点及规模</span>
                  {/* <span className='button-right'>点击进入</span> */}
                </Link>
                <Link className='button-group' to={`/detail/brief?p=section4`}>
                  <span className='button-left'>广西工科优势特色专业</span>
                  {/* <span className='button-right'>点击进入</span> */}
                </Link>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="cases with-cities">
            <div className='cities'><img src="https://gxnee.oss-cn-guangzhou.aliyuncs.com/assets/img/cities.png" alt="cities" /></div>
            <div className='section-content'>
              <div className='search-input'>
                <FontAwesomeIcon className='icon' icon={faSearch} />
                <input {...searchInputProps} placeholder='查询院校' />
              </div>
              <Swiper
                grid={{
                  rows: 4
                }}
                slidesPerView={4}
                grabCursor={true}
                mousewheel={true}
                nested={true}
                // pagination={{
                //   clickable: true,
                // }}
                modules={[Grid, Mousewheel]}
                className={'inner-swiper'}
              >
                {
                  schools.map((school, i) => {
                    return (
                      <SwiperSlide key={`school-${i}`}>
                        <Link to={`/detail/${school.name}`}>
                          <img src={`https://gxnee.oss-cn-guangzhou.aliyuncs.com/assets/img/icons/img_only/${school.icon}`} alt={school.name} />
                        </Link>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
              <div className='inner-swiper-note'>
                <img src="https://gxnee.oss-cn-guangzhou.aliyuncs.com/assets/img/hand.gif" alt="hand" />
                <span>向左滑动查看更多</span>
              </div>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </div >
  )
}

export default Home
