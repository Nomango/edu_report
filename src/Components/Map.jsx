import { useState } from 'react';

import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix
import {
  BarChart,
  MapChart,
} from 'echarts/charts';
// import components, all suffixed with Component
import {
  GridComponent,
  GeoComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  SVGRenderer,
  CanvasRenderer,
} from 'echarts/renderers';

import GuangXiJSON from '../assets/json/guangxi.json'
import React from 'react';
// const Map = require('china-echarts-map')

// Register the required components
echarts.use(
  [GeoComponent, TooltipComponent, SVGRenderer, MapChart]
);

echarts.registerMap('guangxi', GuangXiJSON)

function Map(props) {
  // const code = Map.getCodeByName('广西')
  // const province = Map.getProvince(code)
  // const areaJSON = Map.getAreaJSON({type: 'province', map: province.map})
  let province = props.province;
  let opts = {
    tooltip: {
      show: true
    },
    geo: {
      map: province,
      roam: false,
      label: {
        // normal: {
        //   show: false,
        //   fontSize: "10",
        //   color: "rgba(0,0,0,0.7)"
        // }
        normal: {
          show: true,
          textStyle: {
            color: "#fff8"
          }
        },
        emphasis: {
          show: true,
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
    },
    // series: [
    //   {
    //     name: 'schools',
    //     type: "scatter",
    //     map: province,
    //     roam: false,
    //     showLegendSymbol: false, // 存在legend时显示
    //     geoIndex: 0,
    //     label: {
    //       normal: {
    //         show: true,
    //         textStyle: {
    //           color: "#fff8"
    //         }
    //       },
    //       emphasis: {
    //         show: true,
    //         textStyle: {
    //           color: "#fff"
    //         }
    //       }
    //     },
    //     itemStyle: {
    //       normal: {
    //         areaColor: "#0d0059",
    //         borderColor: "#389dff",
    //         borderWidth: 0.5
    //       },
    //       emphasis: {
    //         areaColor: "#17008d",
    //         shadowOffsetX: 0,
    //         shadowOffsetY: 0,
    //         shadowBlur: 5,
    //         borderWidth: 0,
    //         shadowColor: "rgba(0, 0, 0, 0.5)"
    //       }
    //     }
    //   }
    // ]
  };
  let map = React.createRef();
  const [zoomIn, setZoomIn] = useState(false);
  return (
    <ReactEChartsCore
      ref={map}
      option={opts}
      opts={{
        renderer: 'svg',
        // width: 300,
        // height: 300,
      }}
      echarts={echarts}
      style={{
        height: '30rem',
        width: '100%',
        margin: 'auto',
        // position: 'relative',
        // display: 'fixed',
        // top: '50%',
        // left: '50%',
        // transform: 'transform(-50%, -50%)',
        zIndex: 50
      }}
      onEvents={{
        click: (params) => {
          // console.log(params);
          console.log(params.name)
          // console.log(map.current);
          // const echartInstance = map.current.getEchartsInstance();
          // if (!zoomIn) {
          //   console.log('zoom in');
          //   map.current.resize({
          //     width: 600,
          //     height: 600,
          //     animation: {
          //       duration: 2,
          //     }
          //   })
          // } else {
          //   console.log('zoom out');
          //   map.current.resize({
          //     width: 300,
          //     height: 300,
          //     animation: {
          //       duration: 2,
          //     }
          //   })
          // }
          // // console.log(echartInstance);
          // setZoomIn(!zoomIn);
        }
      }}
    />
  )
}

export default Map
