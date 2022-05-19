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
  CanvasRenderer,
} from 'echarts/renderers';

import GuangXiJSON from '../assets/json/guangxi.json'
// const Map = require('china-echarts-map')

// Register the required components
echarts.use(
  [TitleComponent, GeoComponent, DatasetComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer, MapChart]
);

echarts.registerMap('guangxi', GuangXiJSON)

function Map(props) {
  // const code = Map.getCodeByName('广西')
  // const province = Map.getProvince(code)
  // const areaJSON = Map.getAreaJSON({type: 'province', map: province.map})
  let province = props.province;
  let opts = {
    tooltip: {
      show: false
    },
    geo: {
      map: province,
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
        map: province,
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
  return (
    <ReactEChartsCore option={opts} echarts={echarts} />
  )
}

export default Map
