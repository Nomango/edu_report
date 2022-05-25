
function GetAllSchools() {
  return [
    {
      name: "桂林电子科技大学",
      icon: "1桂林电子科技大学.png",
    },
    {
      name: "广西大学",
      icon: "2广西大学.png",
    },
    {
      name: "桂林理工大学",
      icon: "3桂林理工大学.png",
    },
    {
      name: "广西科技大学",
      icon: "4广西科技大学.png",
    },
    {
      name: "北部湾大学",
      icon: "5北部湾大学.png",
    },
    {
      name: "桂林航天工业学院",
      icon: "6桂林航天工业学院.png",
    },
    {
      name: "柳州工学院",
      icon: "7柳州工学院.png",
    },
    {
      name: "梧州学院",
      icon: "8梧州学院.png",
    },
    {
      name: "广西民族大学",
      icon: "9广西民族大学.png",
    },
    {
      name: "贺州学院",
      icon: "10贺州学院.png",
    },
    {
      name: "南宁学院",
      icon: "11南宁学院.png",
    },
    {
      name: "玉林师范学院",
      icon: "12玉林师范学院.png",
    },
    {
      name: "桂林信息科技学院",
      icon: "13桂林信息科技学院.png",
    },
    {
      name: "百色学院",
      icon: "14百色学院.png",
    },
    {
      name: "广西师范大学",
      icon: "15广西师范大学.png",
    },
    {
      name: "河池学院",
      icon: "16河池学院.png",
    },
    {
      name: "南宁师范大学",
      icon: "17南宁师范大学.png",
    },
    {
      name: "南宁理工学院",
      icon: "18南宁理工学院.png",
    },
    {
      name: "广西科技师范学院",
      icon: "19广西科技师范学院.png",
    },
    {
      name: "广西民族师范大学相思湖学院",
      icon: "20广西民族大学相思湖学院.png",
    },
    {
      name: "广西民族师范学院",
      icon: "21广西民族师范学院.png",
    },
    {
      name: "桂林学院",
      icon: "22桂林学院.png",
    },
    {
      name: "广西警察学院",
      icon: "23广西警察学院.png",
    },
    {
      name: "广西财经学院",
      icon: "24广西财经学院.png",
    },
    {
      name: "桂林旅游学院",
      icon: "25桂林旅游学院.png",
    },
    {
      name: "广西外国语学院",
      icon: "26广西外国语学院.png",
    },
    {
      name: "广西职业师范学院",
      icon: "27广西职业师范学院.png",
    },
    {
      name: "北海艺术设计学院",
      icon: "28北海艺术设计学院.png",
    },
    {
      name: "广西医科大学",
      icon: "29广西医科大学.png",
    },
    {
      name: "广西艺术学院",
      icon: "30广西艺术学院.png",
    },
    {
      name: "广西中医药大学",
      icon: "31广西中医药大学.png",
    },
    {
      name: "南宁师范大学师园学院",
      icon: "32南宁师范大学师园学院.png",
    },
    {
      name: "广西中医药大学赛恩斯新医药学院",
      icon: "33广西中医药大学赛恩斯新医药学院.png",
    },
    {
      name: "桂林医学院",
      icon: "34桂林医学院.png",
    },
  ]
}

function GetSchool(schoolName) {
  let schools = GetAllSchools();
  for (const school of schools.values()) {
    if (school.name == schoolName) {
      return school
    }
  }
  return null
}

function GetCitySchoolData() {
  return [
    { name: "桂林电子科技大学", majorNum: 58, studentNum: 18602, city: "桂林市", },
    { name: "广西大学", majorNum: 40, studentNum: 10216, city: "南宁市", },
    { name: "桂林理工大学", majorNum: 38, studentNum: 12588, city: "桂林市", },
    { name: "广西科技大学", majorNum: 34, studentNum: 13674, city: "柳州市", },
    { name: "北部湾大学", majorNum: 29, studentNum: 9407, city: "钦州市", },
    { name: "桂林航天工业学院", majorNum: 22, studentNum: 9575, city: "桂林市", },
    { name: "柳州工学院", majorNum: 22, studentNum: 8545, city: "柳州市", },
    { name: "梧州学院", majorNum: 20, studentNum: 6249, city: "梧州市", },
    { name: "广西民族大学", majorNum: 19, studentNum: 3463, city: "南宁市", },
    { name: "贺州学院", majorNum: 18, studentNum: 5216, city: "贺州市", },
    { name: "南宁学院", majorNum: 18, studentNum: 8382, city: "南宁市", },
    { name: "玉林师范学院", majorNum: 17, studentNum: 3806, city: "玉林市", },
    { name: "桂林信息科技学院", majorNum: 16, studentNum: 7764, city: "桂林市", },
    { name: "百色学院", majorNum: 14, studentNum: 3701, city: "百色市", },
    { name: "广西师范大学", majorNum: 14, studentNum: 3406, city: "桂林市", },
    { name: "河池学院", majorNum: 14, studentNum: 3489, city: "河池市", },
    { name: "南宁师范大学", majorNum: 14, studentNum: 2998, city: "南宁市", },
    { name: "南宁理工学院", majorNum: 13, studentNum: 5196, city: "南宁市", },
    { name: "广西科技师范学院", majorNum: 11, studentNum: 4813, city: "来宾市", },
    { name: "广西民族大学相思湖学院", majorNum: 10, studentNum: 2263, city: "南宁市", },
    { name: "广西民族师范学院", majorNum: 8, studentNum: 3523, city: "崇左市", },
    { name: "桂林学院", majorNum: 8, studentNum: 739, city: "桂林市", },
    { name: "广西警察学院", majorNum: 6, studentNum: 2089, city: "南宁市", },
    { name: "广西财经学院", majorNum: 5, studentNum: 974, city: "南宁市", },
    { name: "桂林旅游学院", majorNum: 5, studentNum: 1240, city: "桂林市", },
    { name: "广西外国语学院", majorNum: 4, studentNum: 1026, city: "南宁市", },
    { name: "广西职业师范学院", majorNum: 4, studentNum: 1020, city: "南宁市", },
    { name: "北海艺术设计学院", majorNum: 3, studentNum: 443, city: "北海市", },
    { name: "广西医科大学", majorNum: 2, studentNum: 561, city: "南宁市", },
    { name: "广西艺术学院", majorNum: 2, studentNum: 278, city: "南宁市", },
    { name: "广西中医药大学", majorNum: 2, studentNum: 297, city: "南宁市", },
    { name: "南宁师范大学师园学院", majorNum: 2, studentNum: 445, city: "南宁市", },
    { name: "广西中医药大学赛恩斯新医药学院", majorNum: 1, studentNum: 122, city: "南宁市", },
    { name: "桂林医学院", majorNum: 1, studentNum: 154, city: "桂林市", },
  ]
}

function GetCityData(city) {
  let data = {
    name: city,
    majorNum: 0,
    studentNum: 0,
    schools: [],
  }
  GetCitySchoolData().map(d => {
    if (d.city == city) {
      data.majorNum += d.majorNum;
      data.studentNum += d.studentNum;
      data.schools.push(d.name);
    }
  })
  return data;
}

import JSON5 from 'json5'

function AsyncGetSchoolData(name, callback) {
  fetch(`https://gxnee.oss-cn-guangzhou.aliyuncs.com/assets/data/${name}.json5`)
    .then(resp => resp.text())
    .then(text => {
      let json = JSON5.parse(text);
      console.log(json);
      return json;
    })
    .then(json => {
      callback(json);
    })
    .catch(e => {
      console.log(e);
    });
}

export { GetAllSchools, GetSchool, AsyncGetSchoolData, GetCityData }
