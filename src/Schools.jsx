
function GetAllSchools() {
  return [
    {
      name: "桂林电子科技大学",
      base_url: "/assets/img/book/桂电",
      img_suffix: ".jpg",
      cover: "/assets/img/book/桂电/1.jpg",
      pages: 9,
      content: <>
        <img src='/assets/img/book/桂电/1.jpg'></img>
        <img src='/assets/img/book/桂电/2.jpg'></img>
        <img src='/assets/img/book/桂电/3.jpg'></img>
        <img src='/assets/img/book/桂电/4.jpg'></img>
        <img src='/assets/img/book/桂电/5.jpg'></img>
        <img src='/assets/img/book/桂电/6.jpg'></img>
        <img src='/assets/img/book/桂电/7.jpg'></img>
        <img src='/assets/img/book/桂电/8.jpg'></img>
        <img src='/assets/img/book/桂电/9.jpg'></img>
      </>
    },
    {
      name: "广西大学",
      base_url: "/assets/img/book/桂电",
      img_suffix: ".jpg",
      cover: "/assets/img/book/桂电/1.jpg",
      pages: 2,
      content: <>
        <img src='/assets/img/book/桂电/1.jpg'></img>
        <img src='/assets/img/book/桂电/2.jpg'></img>
      </>
    },
    {
      name: "广西科技大学",
      base_url: "/assets/img/book/桂电",
      img_suffix: ".jpg",
      cover: "/assets/img/book/桂电/1.jpg",
      pages: 4,
      content: <>
        <img src='/assets/img/book/桂电/1.jpg'></img>
        <img src='/assets/img/book/桂电/2.jpg'></img>
      </>
    },
    {
      name: "桂林理工大学",
      base_url: "/assets/img/book/桂电",
      img_suffix: ".jpg",
      cover: "/assets/img/book/桂电/1.jpg",
      pages: 5,
      content: <>
        <img src='/assets/img/book/桂电/1.jpg'></img>
        <img src='/assets/img/book/桂电/2.jpg'></img>
      </>
    },
    {
      name: "广西民族师范学院",
      base_url: "/assets/img/book/桂电",
      img_suffix: ".jpg",
      cover: "/assets/img/book/桂电/1.jpg",
      pages: 6,
      content: <>
        <img src='/assets/img/book/桂电/1.jpg'></img>
        <img src='/assets/img/book/桂电/2.jpg'></img>
      </>
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

export { GetAllSchools, GetSchool }
