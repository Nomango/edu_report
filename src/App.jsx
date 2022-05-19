import React from 'react'
import './assets/css/plugin.css'
import './assets/css/main.css'
import './assets/css/responsive.css'

import Map from './Components/Map';
import Flipbook from './Components/Flipbook';

function App() {
  let books = getAllBooks();
  let flipbook = <Flipbook books={books} />
  return (
    <div className="App">
      {/* <!-- Start Preload --> */}
      <div className="preloader"></div>
      <div className="block-1"></div>
      <div className="block-2"></div>
      <div className="logo-load"><img src="assets/img/logo.svg" alt="" /></div>
      <div className="logo-load spinning"></div>
      <div className="over-all"></div>
      {/* <!-- End Preload --> */}
      {/* <!-- Start Header --> */}
      <header>
        <nav>
          {/* <!-- Logo --> */}
          <div className="logo hover-target magnetic"><a className="load-spiral" href="/index.html"><img src="assets/img/logo.svg" alt="logo" /></a></div>
          {/* <!-- Menu bar --> */}
          <div className="toggle-btn magnetic hover-target">
            <div className="burger-menu"><span className="one"></span><span className="two"></span><span className="tre"></span></div>
          </div>
          {/* <!-- Social --> */}
          <div className="scr socials">
            <div className="list-social">
              <ul>
                <li className="hover-target"><a href="#">CN.</a></li>
              </ul>
            </div>
          </div>
          {/* <!-- Copyright --> */}
          <div className="scr copyright-top">
            <p>主办方 &copy;2019</p>
          </div>
          <div className="bg-nav"></div>
          {/* <!-- menu --> */}
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
                        <h3>主办方信息</h3>
                        <h4>2022/05/27 暨新工科建设推进研讨会</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* <!-- End Header --> */}
      {/* <!-- Start Content --> */}
      <div id="spiral">
        <div className="scrolls"><img draggable="false" src="assets/img/sroll.svg" alt="scroll" /></div>
        {/* <!-- Cover --> */}
        <div className="main-head">
          <div id="headmove">
            <div data-depth="0.2">
              <div className="bg-right"></div>
            </div>
          </div>
          <div className="heading-text">
            <div className="heading-text-front">
              <h1>广西新工科教育论坛</h1>
              <h3>暨新工科建设推进研讨会</h3>
              <h3>2022</h3>
            </div>
            <div className="heading-text-back">
              <h1>广西新工科教育论坛</h1>
              <h3>暨新工科建设推进研讨会</h3>
              <h3>2022</h3>
            </div>
          </div>
        </div>
        {/* <!-- Brief --> */}
        <section className="brief">
          <div className="container">
            <div className="row centered">
              <div className="col-lg-7">
                <Map province={'guangxi'} />
                {/* <div className="img-about luxy-el" data-horizontal="1" data-speed-x="1"><img className="img-fluid" src="assets/img/about.jpg" alt="" /></div> */}
              </div>
              <div className="col-lg-5">
                <div className="abt-text">
                  <p>以本科院校为例，<br />2021年，广西有普通本科高校35所，其中普通高校32所，独立学院3所<br />公办本科院校24所，民办本科院校11所<br />其中，南宁、桂林院校相对较多</p>
                  <a className="hover-target load-spiral" href="#">查看更多详情</a></div>
              </div>
            </div>
          </div>
        </section>
        <section className="folio-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="main-title text-center">
                  <h2>院校发展<span>详情</span></h2>
                </div>
              </div>
              {
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
              }
            </div>
          </div>
        </section>
        <section className="folio-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <a name="about" className="next-project centered text-center">
                  <div className="col-md-12">
                    <p>About</p>
                    <h3>Sponsor</h3>
                  </div>
                </a></div>
            </div>
          </div>
        </section>
        {/* <!-- Footer --> */}
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4 text-center text-md-left mt-30">
                <div className="mail hover-target"><a href="#">主办方信息</a></div>
              </div>
              <div className="col-md-4 text-center mt-30">
                <div className="logo-foot"><img src="assets/img/logo.svg" alt="" /></div>
              </div>
              <div className="col-md-4 text-center text-md-right mt-30">
                <div className="sosmed">
                  <ul>
                    <li className="hover-target"><a href="#">WeChat.</a></li>
                    <li className="hover-target"><a href="#">Weibo.</a></li>
                    <li className="hover-target"><a href="#">Website.</a></li>
                  </ul>
                </div>
                <div className="copyright">
                  <p>主办方 &copy;2022. All Rights Reserved</p>
                  {/* <p>Made with ♥ By <a href="http://www.bootstrapmb.com/">bootstrapmb</a>.</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Flip book -->*/}
        {flipbook}
      </div>
      {/* <!-- End Content -->*/}
      {/* <!-- Cursor --> */}
      <div className="cursor1" id="cursor1"></div>
      <div className="cursor" id="cursor"></div>
    </div>
  )
}

export default App

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

function getAllBooks() {
  return [
    {
      name: "桂林电子科技大学",
      base_url: "/assets/img/book/桂电",
      img_suffix: ".jpg",
      cover: "/assets/img/book/桂电/1.jpg",
      pages: 9,
    },
    {
      name: "广西大学",
      base_url: "/assets/img/book/桂电",
      img_suffix: ".jpg",
      cover: "/assets/img/book/桂电/1.jpg",
      pages: 2,
    },
    {
      name: "广西科技大学",
      base_url: "/assets/img/book/桂电",
      img_suffix: ".jpg",
      cover: "/assets/img/book/桂电/1.jpg",
      pages: 4,
    },
    {
      name: "桂林理工大学",
      base_url: "/assets/img/book/桂电",
      img_suffix: ".jpg",
      cover: "/assets/img/book/桂电/1.jpg",
      pages: 5,
    },
    {
      name: "广西民族师范学院",
      base_url: "/assets/img/book/桂电",
      img_suffix: ".jpg",
      cover: "/assets/img/book/桂电/1.jpg",
      pages: 6,
    },
  ]
}
