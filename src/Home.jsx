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

// import './assets/css/plugin.css'
// import './assets/css/main.css'
import './assets/css/main.less'
// import './assets/css/responsive.css'
import './assets/css/anim.css'
import './assets/css/swiper.less'

import { InitAll, StartAll } from './assets/js/main.js'
import $ from "jquery";

import { Link } from 'react-router-dom';
import { GetAllSchools } from './Schools';
import Background from './Components/Background';
import useStateRef from 'react-usestateref';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
  // $(CreateAnimGrid);
  // let flipbook = <Flipbook books={books} />
  const [mainSwiper, setMainSwiper, mainSwiperRef] = useStateRef(null);
  const background = useRef(null);
  useEffect(() => {
    console.log('ready');
    setTimeout(() => { InitAll(); }, 500);
  })
  const PlayVideo = () => {
    background.current.play();
  }
  const Enter = () => {
    $('.start-video').fadeOut();
    $('.cover-guide').hide();
    $('.bg-cover .ball').hide();
    $('.arrow-intro').fadeIn();
    $('.main-swiper').fadeIn();
    $('.section-title').fadeIn();
    StartAll();
    mainSwiperRef.current.enable();
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
      <div className='bg-cover'>
        <img className='bg' src='/assets/img/cover.png'></img>
        <img className='ball' src='/assets/img/ball.png'></img>
      </div>
      <div className='cover-guide'>
        <div className='cover-title'>
          <h1 className='font-hei'>广西新工科教育</h1>
          <p>Guangxi New Engineering Education</p>
          <h1 className='font-hei spacing'>成果展</h1>
          <p>Achievements Exhibition</p>
        </div>
        <div className='cover-enter' onClick={PlayVideo}>
          <h3 className='font-hei'>进入观展</h3>
          <p>ENTER</p>
        </div>
        <div className='cover-footer'>
          <p>广西新工科教育研究中心</p>
          <p>2022年5月</p>
        </div>
      </div>
      <Background
        ref={background}
        onReady={Enter}
      />
      {/* <div className="anim-container"></div> */}
      <header>
        <nav>
          {/* <div className="logo hover-target magnetic"><a className="load-spiral" href="/index.html"><img src="assets/img/logo.svg" alt="logo" /></a></div> */}
          <div className="toggle-btn magnetic hover-target">
            <div className="burger-menu"><span className="one"></span><span className="two"></span><span className="tre"></span></div>
          </div>
          {/* <div className="scr socials">
            <div className="list-social">
              <ul>
                <li className="hover-target"><a href="#">CN.</a></li>
              </ul>
            </div>
          </div>
          <div className="scr copyright-top">
            <p>广西新工科教育研究中心 &copy;2022</p>
          </div> */}
          <div className="bg-nav"></div>
          <div className="manu-container">
            <div className="menu">
              <div className="data">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="links text-center text-lg-left">
                        <ul>
                          <li>
                            <p>01</p>
                            <a className="menu-link hover-target" href="#">Home</a></li>
                          <li>
                            <p>02</p>
                            <a className="menu-link hover-target" href="#brief">Brief</a></li>
                          <li>
                            <p>03</p>
                            <a className="menu-link hover-target" href="about.html">Work</a></li>
                          <li>
                            <p>04</p>
                            <a className="menu-link hover-target" href="#about">About</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-4 offset-md-2 centered text-right">
                      <div className="address-menu">
                        <h3>广西新工科教育研究中心</h3>
                        <h4>2022年 广西新工科教育成果展</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className='arrow-intro'>
        <div className='arrow-1'></div>
        <div className='arrow-2'></div>
      </div>
      <div className='section-title'>
        <h2 className='font-hei'>广西新工科教育成果展</h2>
        <p>Guangxi New Engineering Education</p>
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
          if (swiper.activeIndex != swiper.slides.length - 1) {
            TweenMax.to('.arrow-intro', 1, {
              autoAlpha: 1,
              // y: '00',
            })
          } else {
            TweenMax.to('.arrow-intro', .5, {
              autoAlpha: 0,
              // y: '100',
            })
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
              <div className='section-content-title font-kai font-bold'>【 序言 】</div>
              <p>为主动应对新一轮科技革命与产业变革，支撑服务国家战略和广西经济发展，广西本科院校积极推进新工科教育研究与实践，建设高水平新工科人才培养体系，培养创新型、复合型和应用型新工科人才。新工科教育成果展将从广西工科教育建设进展概况和广西本科院校新工科典型案例两个角度展示广西新工科教育取得的成就，以加强高校之间的交流，共促发展。</p>
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
                <a className="nav-button" onClick={() => mainSwiperRef.current.slideTo(3)}>广西工科高校案例展</a>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="breif with-cities">
            <div className='cities'><img src="/assets/img/cities.png" alt="cities" /></div>
            <div className='section-content'>
              <div className='breif-buttons'>
                <Link className='button-group' to={`/breif/TODO`}>
                  <span className='button-left'>广西高校工科专业设置</span>
                  <span className='button-right'>点击进入</span>
                </Link>
                <Link className='button-group' to={`/breif/TODO`}>
                  <span className='button-left'>广西工科专业大类布点</span>
                  <span className='button-right'>点击进入</span>
                </Link>
                <Link className='button-group' to={`/breif/TODO`}>
                  <span className='button-left'>工科学校分布点及规模</span>
                  <span className='button-right'>点击进入</span>
                </Link>
                <Link className='button-group' to={`/breif/TODO`}>
                  <span className='button-left'>广西工科优势特色专业</span>
                  <span className='button-right'>点击进入</span>
                </Link>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="cases with-cities">
            <div className='cities'><img src="/assets/img/cities.png" alt="cities" /></div>
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
                pagination={{
                  clickable: true,
                }}
                modules={[Grid, Mousewheel, Pagination]}
                className={'inner-swiper'}
              >
                {
                  schools.map((school, i) => {
                    return (
                      <SwiperSlide key={`school-${i}`}>
                        <img src={`/assets/img/icons/img_only/${school.icon}`} alt={school.name} />
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </div>
          </section>
          {/* <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                }}
                mousewheel={true}
                nested={true}
                loop={true}
                modules={[EffectCoverflow, Mousewheel]}
                className={'inner-swiper'}
              >
                {
                  books.map((book, i) => {
                    return (
                      <SwiperSlide>
                        <BookCover book={book} key={`book-${i}`} />
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper> */}
          {/* {
                  books.map((book, i) => {
                    if (i % 2 == 1)
                      return
                    if (i == books.length - 1) {
                      return (
                        <div className="col-md-6">
                          <Book book={book} key={`book-${i}`} />
                        </div>
                      )
                    }
                    return (
                      <div className="col-md-6">
                        <Book book={book} key={`book-${i}`} />
                        <Book book={books[i + 1]} key={`book-${i + 1}`} />
                      </div>
                    )
                  })
                } */}
        </SwiperSlide>
        {/* <SwiperSlide>
          <section className="folio-content">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <a name="about" className="next-project centered text-center">
                    <div className="col-md-12">
                      <p>About</p>
                      <h3>Sponsor</h3>
                    </div>
                  </a>
                </div>
              </div>
              <div className="footer">
                <div className="row">
                  <div className="col-md-12 text-center text-md-left mt-30">
                    <div className="mail hover-target text-center"><a href="#">主办方信息</a></div>
                  </div>
                </div>
                <div className="logo-foot"><img src="assets/img/logo.svg" alt="" /></div>
                <div className="row">
                  <div className="col-md-12 text-center mt-30">
                    <div className="sosmed">
                      <ul>
                        <li className="hover-target"><a href="#">WeChat.</a></li>
                        <li className="hover-target"><a href="#">Weibo.</a></li>
                        <li className="hover-target"><a href="#">Website.</a></li>
                      </ul>
                    </div>
                    <div className="copyright">
                      <p>主办方 &copy;2022. All Rights Reserved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="footer">
            <div className="container">
              <div className="row">
              </div>
            </div>
          </div>
        </SwiperSlide> */}
      </Swiper>
      {/* <!-- Flip book -->*/}
      {/* {flipbook} */}
      {/* <!-- End Content -->*/}
      {/* <!-- Cursor --> */}
      {/* <div className="cursor1" id="cursor1"></div> */}
      {/* <div className="cursor" id="cursor"></div> */}
    </div>
  )
}

export default Home

function Book(props) {
  let book = props.book;
  return (
    <div className="folio-item">
      <div className="img-folio cursorExplore">
        <a role="button" onClick={() => book.open()}>
          <img className="img-fluid" src={book.cover} draggable="false" alt={book.name} />
        </a>
      </div>
      <div className="text-folio text-center">
        <h2 className="text-1">{book.name}</h2>
        <h2 className="text-2">{book.name}</h2>
      </div>
    </div>
  )
}

function BookCover(props) {
  let book = props.book;
  return (
    <Link to={`/detail/${book.name}`}>
      <img className="cover-img" src={book.cover} draggable="false" alt={book.name} />
      <p className="cover-text">{book.name}</p>
    </Link>
    //   <a href={`/detail.html?name=${book.name}`} target={'_blank'}>
    //   <img className="cover-img" src={book.cover} draggable="false" alt={book.name} />
    //   <p className="cover-text">{book.name}</p>
    // </a>
  )
}
