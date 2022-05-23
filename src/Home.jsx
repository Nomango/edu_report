import React, { useEffect, useRef, useState } from 'react'

import Map from './Components/Map';
// import Flipbook from './Components/Flipbook';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Mousewheel, Pagination, EffectCoverflow } from "swiper";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import './assets/css/plugin.css'
import './assets/css/main.css'
import './assets/css/responsive.css'
import './assets/css/anim.css'
import './assets/css/swiper.css'

import { InitAll, StartAll, CreateAnimGrid, RevealLoad } from './assets/js/main.js'
import $ from "jquery";

import { Link } from 'react-router-dom';
import { GetAllSchools } from './Schools';
import Background from './Components/Background';
import useStateRef from 'react-usestateref';

function Home() {
  // $(CreateAnimGrid);
  let books = GetAllSchools();
  // let flipbook = <Flipbook books={books} />
  const [mainSwiper, setMainSwiper, mainSwiperRef] = useStateRef(null);
  const background = useRef(null);
  useEffect(() => {
    console.log('ready');
    setTimeout(() => {
      InitAll();
      // $('.logo-load').fadeOut();
      // $('.cover-guide').fadeIn();
    }, 500);
  })
  const PlayVideo = () => {
    background.current.play();
  }
  const Enter = () => {
    $('.start-video').fadeOut();
    $('.cover-guide').hide();
    $('.bg-cover .ball').hide();
    $('.arrow-intro').fadeIn();
    StartAll();
    mainSwiperRef.current.enable();
  }
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
          <div className="scr socials">
            <div className="list-social">
              <ul>
                <li className="hover-target"><a href="#">CN.</a></li>
              </ul>
            </div>
          </div>
          <div className="scr copyright-top">
            <p>广西新工科教育研究中心 &copy;2022</p>
          </div>
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
      <Swiper
        enabled={false}
        direction={"vertical"}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Controller, Mousewheel, Pagination]}
        onSwiper={(swiper) => { console.log(swiper); setMainSwiper(swiper); }}
        // controller={{ control: mainSwiper }}
        onSlideChange={(swiper) => {
          // console.log(swiper)
          if (swiper.activeIndex == 0) {
            TweenMax.to('.scr', 1, {
              autoAlpha: 1,
              y: '00',
            })
          } else {
            TweenMax.to('.scr', .5, {
              autoAlpha: 0,
              y: '100',
            })
          }
        }}
        className={'main-swiper'}
      >
        <SwiperSlide>
          {/* <!-- Cover --> */}
          <div className="main-head">
            {/* <div id="headmove">
              <div data-depth="0.2">
                <div className="bg-right"></div>
              </div>
            </div> */}
            <div className="juuuuuuuuuuuuuuuuuuuuuuuuuuu">
              <div className="heading-text-front">
                <h1>广西新工科教育成果展</h1>
                {/* <h3>广西新工科教育研究中心</h3> */}
                <h3>2022年</h3>
              </div>
              {/* <div className="heading-text-back">
                <h1>广西新工科教育成果展</h1>
                <h3>暨新工科建设推进研讨会</h3>
                <h3>2022</h3>
              </div> */}
            </div>
          </div>
          {/* <div className="scrolls"><img draggable="false" src="assets/img/sroll.svg" alt="scroll" /></div> */}
        </SwiperSlide>
        <SwiperSlide>
          <section className="map">
            <div className="container">
              <div className="col-md-12">
                <div className="main-title text-center">
                  <h2>广西新工科<span>概况</span></h2>
                </div>
              </div>
              <div className="row centered">
                <div className="col-md-12">
                  <Map province={'guangxi'} />
                </div>
                <div className="col-md-12">
                  <a className="hover-target" onClick={() => mainSwiperRef.current.slideTo(2)}>广西新工科概况</a>
                  <br />
                  <a className="hover-target" onClick={() => mainSwiperRef.current.slideTo(3)}>广西工科高校案例展</a>
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="brief">
            <div className="container">
              <div className="row centered">
                <div className="col-lg-4">
                  <Map province={'guangxi'} />
                  {/* <div className="img-about luxy-el" data-horizontal="1" data-speed-x="1"><img className="img-fluid" src="assets/img/about.jpg" alt="" /></div> */}
                </div>
                <div className="col-lg-8">
                  <div className="abt-text">
                    <p>以本科院校为例，<br />2021年，广西有普通本科高校35所，其中普通高校32所，独立学院3所<br />公办本科院校24所，民办本科院校11所<br />其中，南宁、桂林院校相对较多</p>
                    <a className="hover-target load-spiral" href="#">查看更多详情</a></div>
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          {/* <section className="folio-content"> */}
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="main-title text-center">
                  <h2>案例展</h2>
                </div>
              </div>
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
            </div>
          </div>
          {/* </section> */}
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
      <div className="cursor1" id="cursor1"></div>
      <div className="cursor" id="cursor"></div>
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
