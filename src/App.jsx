import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix
import {
  // LineChart,
  BarChart,
  // PieChart,
  // ScatterChart,
  // RadarChart,
  MapChart,
  // TreeChart,
  // TreemapChart,
  // GraphChart,
  // GaugeChart,
  // FunnelChart,
  // ParallelChart,
  // SankeyChart,
  // BoxplotChart,
  // CandlestickChart,
  // EffectScatterChart,
  // LinesChart,
  // HeatmapChart,
  // PictorialBarChart,
  // ThemeRiverChart,
  // SunburstChart,
  // CustomChart,
} from 'echarts/charts';
// import components, all suffixed with Component
import {
  // GridSimpleComponent,
  GridComponent,
  // PolarComponent,
  // RadarComponent,
  GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  // ToolboxComponent,
  TooltipComponent,
  // AxisPointerComponent,
  // BrushComponent,
  TitleComponent,
  // TimelineComponent,
  // MarkPointComponent,
  // MarkLineComponent,
  // MarkAreaComponent,
  // LegendComponent,
  // LegendScrollComponent,
  // LegendPlainComponent,
  // DataZoomComponent,
  // DataZoomInsideComponent,
  // DataZoomSliderComponent,
  // VisualMapComponent,
  // VisualMapContinuousComponent,
  // VisualMapPiecewiseComponent,
  // AriaComponent,
  // TransformComponent,
  DatasetComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
  // SVGRenderer,
} from 'echarts/renderers';

import GuangXiJSON from './assets/json/guangxi.json'
// const Map = require('china-echarts-map')

// Register the required components
echarts.use(
  [TitleComponent, GeoComponent, DatasetComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer, MapChart]
);

function App() {
  // const code = Map.getCodeByName('广西')
  // const province = Map.getProvince(code)
  // const areaJSON = Map.getAreaJSON({type: 'province', map: province.map})
  // echarts.registerMap(province.map, areaJSON)
  echarts.registerMap('guangxi', GuangXiJSON)
  return (
    <div className="App">
      {/* <!-- Start Preload --> */}
      <div className="preloader"></div>
      <div className="block-1"></div>
      <div className="block-2"></div>
      <div className="logo-load"><img src="assets/img/logo.svg" alt="" /></div>
      <div className="logo-load spinning"></div>
      <div className="over-all"></div>
      {/* <!-- End Preload --><!-- Start Header --> */}
      <header>
        <nav>
          {/* <!-- Logo --> */}
          <div className="logo hover-target"><a className="load-spiral" href="index.html"><img src="assets/img/logo.svg" alt="logo" /></a></div>
          {/* <!-- Menu bar --> */}
          <div className="toggle-btn magnetic hover-target">
            <div className="burger-menu"><span className="one"></span><span className="two"></span><span className="tre"></span></div>
          </div>
          {/* <!-- Social --> */}
          <div className="scr socials">
            <div className="list-social">
              <ul>
                <li className="hover-target"><a href="#">Db.</a></li>
                <li className="hover-target"><a href="#">Tw.</a></li>
                <li className="hover-target"><a href="#">Ig.</a></li>
                <li className="hover-target"><a href="#">Bg.</a></li>
              </ul>
            </div>
          </div>
          {/* <!-- Copyright --> */}
          <div className="scr copyright-top">
            <p>Sambat &copy;2019</p>
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
                            <a className="menu-link hover-target load-spiral" href="index.html">Home</a></li>
                          <li>
                            <p>02</p>
                            <a className="menu-link hover-target load-spiral" href="work.html">Work</a></li>
                          <li>
                            <p>03</p>
                            <a className="menu-link hover-target load-spiral" href="about.html">About</a></li>
                          <li>
                            <p>04</p>
                            <a className="menu-link hover-target load-spiral" href="blog.html">Blog</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-4 offset-md-2 centered text-right">
                      <div className="address-menu">
                        <h3>SAMBAT DESIGN STUDIO</h3>
                        <h4>Flower 03/11 Street Klaten,Central Java,Indonesia</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* <!-- End Header --><!-- Start Content --> */}
      <div id="spiral">
        {/* <!-- Header --> */}
        <div className="scrolls"><img draggable="false" src="assets/img/sroll.svg" alt="scroll" /></div>
        <div className="main-head">
          <div id="headmove">
            <div data-depth="0.2">
              <div className="bg-right"></div>
            </div>
          </div>
          <div className="heading-text">
            <div className="heading-text-front">
              <h1>广东新工科教育论坛</h1>
              <h3>暨新工科建设推进研讨会</h3>
              <h3>2022</h3>
            </div>
            <div className="heading-text-back">
              <h1>广东新工科教育论坛</h1>
              <h3>暨新工科建设推进研讨会</h3>
              <h3>2022</h3>
            </div>
          </div>
        </div>
        {/* <!-- About --> */}
        <section className="about">
          <div className="container">
            <div className="row centered">
              <ReactEChartsCore option={mapOptions()} style={{width: '300px', height: '300px'}} echarts={echarts} />
              {/* <div className="col-lg-7">
                <div className="img-about luxy-el" data-horizontal="1" data-speed-x="1"><img className="img-fluid" src="assets/img/about.jpg" alt="" /></div>
              </div>
              <div className="col-lg-5">
                <div className="abt-text">
                  <p>We create digital experiences,social media content,interactive concept,commercials,and branding assets for direct client or together with Agencies. With a wide set of skills and an extended network of specialists we function as a scalable and fully operative team.</p>
                  <a className="hover-target load-spiral" href="about.html">Explore more</a></div>
              </div> */}
            </div>
          </div>
        </section>
        {/* <!-- Portfolio --> */}
        <section className="folio-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="main-title text-center">
                  <h2>Projects from the <span>Studio</span></h2>
                </div>
              </div>
              <div className="col-md-6">
                <div className="folio-item">
                  <div className="img-folio cursorExplore"><a className="load-spiral" href="work-detail-2.html"><img className="img-fluid" src="assets/img/port/2.jpg" draggable="false" alt="" /></a></div>
                  <div className="text-folio text-center">
                    <h2 className="text-1">OLDMAN</h2>
                    <h2 className="text-2">OLDMAN</h2>
                  </div>
                </div>
                <div className="folio-item">
                  <div className="img-folio cursorExplore"><a className="load-spiral" href="work-detail.html"><img className="img-fluid" src="assets/img/port/1.jpg" draggable="false" alt="" /></a></div>
                  <div className="text-folio text-center">
                    <h2 className="text-1">SMITHY</h2>
                    <h2 className="text-2">SMITHY</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="folio-item">
                  <div className="img-folio cursorExplore"><a className="load-spiral" href="work-detail.html"><img className="img-fluid" src="assets/img/port/3.jpg" draggable="false" alt="" /></a></div>
                  <div className="text-folio text-center">
                    <h2 className="text-1">DETECTIVE</h2>
                    <h2 className="text-2">DETECTIVE</h2>
                  </div>
                </div>
                <div className="folio-item">
                  <div className="img-folio cursorExplore"><a className="load-spiral" href="work-detail-2.html"><img className="img-fluid" src="assets/img/port/4.jpg" draggable="false" alt="" /></a></div>
                  <div className="text-folio text-center">
                    <h2 className="text-1">SHANGHAI</h2>
                    <h2 className="text-2">SHANGHAI</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12"><a href="work.html" className="next-project centered text-center load-spiral">
                <div className="col-md-12">
                  <p>View</p>
                  <h3>ALL PROJECTS</h3>
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
                <div className="mail hover-target"><a href="#">hello@spiral.design</a></div>
              </div>
              <div className="col-md-4 text-center mt-30">
                <div className="logo-foot"><img src="assets/img/logo.svg" alt="" /></div>
              </div>
              <div className="col-md-4 text-center text-md-right mt-30">
                <div className="sosmed">
                  <ul>
                    <li className="hover-target"><a href="#">Dribbble.</a></li>
                    <li className="hover-target"><a href="#">Twitter.</a></li>
                    <li className="hover-target"><a href="#">Instagram.</a></li>
                    <li className="hover-target"><a href="#">Behance.</a></li>
                  </ul>
                </div>
                <div className="copyright">
                  <p>Sambat &copy;2019. All Rights Reserved</p>
                  <p>Made with ♥ By <a href="http://www.bootstrapmb.com/">bootstrapmb</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Content --><!-- Toggle menu --> */}
      <div className="menus"><a className="hover-target" href="index.html">Home</a><a className="hover-target" href="index-2.html">Home Slider</a><a className="hover-target" href="index-3.html">Home Image</a><a className="hover-target" href="work.html">Work</a><a className="hover-target" href="about.html">About</a><a className="hover-target" href="work-detail.html">Work Detail</a><a className="hover-target" href="work-detail-2.html">Work Detail 2</a><a className="hover-target" href="blog.html">Blog</a><a className="hover-target" href="blog-detail.html">Blog Detail</a><a className="hover-target" href="error.html">Error 404 Page</a></div>
      <div className="menu__toggler hover-target magnetic"><span></span></div>
      {/* <!-- Cursor --> */}
      <div className="cursor1" id="cursor1"></div>
      <div className="cursor" id="cursor"></div>
    </div>
  )
}

export default App

function mapOptions() {
  return {
    tooltip: {
      show: false
    },
    geo: {
      map: 'guangxi',
      roam: false,
      // zoom: 1.23,
      label: {
        normal: {
          show: false,
          fontSize: "10",
          color: "rgba(0,0,0,0.7)"
        }
      },
      itemStyle: {
        normal: {
          areaColor: "#0d0059",
          borderColor: "#389dff",
          borderWidth: 1, //设置外层边框
          shadowBlur: 5,
          shadowOffsetY: 8,
          shadowOffsetX: 0,
          shadowColor: "#01012a"
        },
        emphasis: {
          areaColor: "#184cff",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 5,
          borderWidth: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    },
    series: [
      {
        type: "map",
        map: 'guangxi',
        roam: false,
        showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false,
            textStyle: {
              color: "#fff"
            }
          }
        },
        itemStyle: {
          normal: {
            areaColor: "#0d0059",
            borderColor: "#389dff",
            borderWidth: 0.5
          },
          emphasis: {
            areaColor: "#17008d",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 5,
            borderWidth: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
}
