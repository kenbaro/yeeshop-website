import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import Meta from "../components/Meta";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getHomeApi } from "../api/HomeApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const catesObj = [
  {
    cateId: "cate01",
    cateIcon:
      "https://cdn-v2.didongviet.vn/files/page/2022/5/29/0/icon0008.png",
    cateNm: "Điện thoại",
    hasSubCate: "1",
  },
  {
    cateId: "cate02",
    cateIcon:
      "https://cdn-v2.didongviet.vn/files/page/2023/5/2/0/1685677499753_apple_iphone_cion.png",
    cateNm: "Apple (AAR)",
    hasSubCate: "1",
  },
  {
    cateId: "cate03",
    cateIcon:
      "https://cdn-v2.didongviet.vn/files/page/2022/5/29/0/icon0013.png",
    cateNm: "Laptop / Tablet",
    hasSubCate: "1",
  },
  {
    cateId: "cate04",
    cateIcon:
      "https://cdn-v2.didongviet.vn/files/page/2022/5/29/0/icon0012.png",
    cateNm: "Máy cũ giá rẻ",
    hasSubCate: "1",
  },
  {
    cateId: "cate05",
    cateIcon:
      "https://cdn-v2.didongviet.vn/files/page/2023/5/2/0/1685677499753_apple_iphone_cion.png",
    cateNm: "Phụ kiện",
    hasSubCate: "1",
  },
  {
    cateId: "cate06",
    cateIcon:
      "https://cdn-v2.didongviet.vn/files/page/2022/5/29/0/icon0011.png",
    cateNm: "Thiết bị đeo tay",
    hasSubCate: "1",
  },
  {
    cateId: "cate07",
    cateIcon:
      "https://cdn-v2.didongviet.vn/files/page/2023/0/12/0/1673491387797_icon_park_solid_headphone_sound.png",
    cateNm: "Âm Thanh",
    hasSubCate: "1",
  },
  {
    cateId: "cate08",
    cateIcon:
      "https://cdn-v2.didongviet.vn/files/page/2022/5/29/0/icon0016.png",
    cateNm: "Khuyến Mãi",
    hasSubCate: "1",
  },
];

const specialProducts = [
  {
    spId: "sp01",
    spImg:
      "https://cdn-v2.didongviet.vn/files/page/2023/7/15/0/1692080008025_frame_44.png",
    spNm: "Samsung Galaxy Z Flip5",
  },
  {
    spId: "sp02",
    spImg:
      "https://cdn-v2.didongviet.vn/files/page/2023/7/15/0/1692080017284_frame_48.png",
    spNm: "iPhone 14 Pro Max",
  },
  {
    spId: "sp03",
    spImg:
      "https://cdn-v2.didongviet.vn/files/page/2023/7/15/0/1692080026359_frame_45.png",
    spNm: "Samsung Galaxy Z Fold5",
  },
  {
    spId: "sp04",
    spImg:
      "https://cdn-v2.didongviet.vn/files/page/2023/7/15/0/1692080217166_frame_32.png",
    spNm: "Macbook Air M1",
  },
  {
    spId: "sp05",
    spImg:
      "https://cdn-v2.didongviet.vn/files/page/2023/7/31/0/1693464688879_mophie.png",
    spNm: "Củ Sạc Mophie 30W",
  },
  {
    spId: "sp06",
    spImg:
      "https://cdn-v2.didongviet.vn/files/page/2023/7/15/0/1692080117034_frame_30.png",
    spNm: "OPPO Reno10",
  },
  {
    spId: "sp07",
    spImg:
      "https://cdn-v2.didongviet.vn/files/page/2023/7/15/0/1692080182719_frame_25.png",
    spNm: "iPad Gen 9 2021",
  },
  {
    spId: "sp08",
    spImg:
      "https://cdn-v2.didongviet.vn/files/page/2023/7/31/0/1693464532753_honorr_x6a.png",
    spNm: "HONOR X6a",
  },
  {
    spId: "sp09",
    spImg:
      "https://cdn-v2.didongviet.vn/files/page/2023/7/15/0/1692080035324_frame_43.png",
    spNm: "iPhone 13",
  },
  {
    spId: "sp10",
    spImg:
      "https://cdn-v2.didongviet.vn/files/page/2023/7/15/0/1692080107411_frame_41.png",
    spNm: "iPhone 12 ProMax",
  },
  {
    spId: "sp11",
    spImg:
      "https://cdn-v2.didongviet.vn/files/page/2023/7/15/0/1692080206349_frame_46.png",
    spNm: "Samsung Galaxy S21 FE",
  },
  {
    spId: "sp12",
    spImg:
      "https://cdn-v2.didongviet.vn/files/page/2023/7/15/0/1692080098197_frame_24.png",
    spNm: "Xiaomi Redmi Note 12",
  },
];
const Home = () => {

  const [grid, setGrid] = useState(5);
  const [homeForm,setHomeForm] = useState({});
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
  };

  const settingMiddleSliders = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    swipe: true,
    variableWidth: false,
  };

  const settingLongSliders = {
    dots: false,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    swipe: true,
    variableWidth: false,
  };

  const getDemo = async () => {

    await getHomeApi().then(
      res => {

        const data = res.data;
        setHomeForm(data)
      }
    ).catch(
      err => {
        console.log("err:  " + err);
      }
    )

  };
  useEffect(() => {
             
    getDemo();
  }, []);

  return (
    <>
      <Meta title={"Trang Chủ"} />
      <Container class1="home-wrapper-1 pt-3">
        <div className="row">
          <div className="col-sm col-md-2 pb-2 px-1">
            <div className="left-menu yee-ht-100">
              <ul className="list-group">
                {catesObj.map((cate, index) => (
                  <li key={index} className="list-item">
                    <a className="yee-wd-100 d-flex" href="#!">
                      <div className="d-flex align-items-center yee-wd-90">
                        <div className="d-flex align-items-center justify-content-start">
                          <img width={25} height={25} src={cate.cateIcon} alt={cate.cateNm}/>
                          <div className="list-item-title mx-2">
                            <p className="my-auto text-14">{cate.cateNm}</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center yee-wd-10">
                          {cate.hasSubCate === "1" &&  <FontAwesomeIcon icon={faAngleRight} className="color-777777"/>}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-sm col-md-8">
            <Slider {...settingMiddleSliders}>
              { homeForm.largeBanners && homeForm.largeBanners.map((image, index) => (
                <div key={index} className="position-relative">
                  <a href={image.bannerLink}>
                    <img
                      src={image.bannerImg}
                      className="img-fluid rounded-3 w-100"
                      alt={image.bannerNm}
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
          <div className="col-sm col-md-2 px-1">
            <div className="yee-ht-95">
              {homeForm.smallRightBanners && homeForm.smallRightBanners.map((image, index) => (
                <div key={index} className="position-relative mb-2 mr-2">
                   <a href={image.bnLink}>
                    <img
                      src={image.bannerImg}
                      className="img-fluid rounded-3"
                      alt={image.bannerNm}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 pt-5 pb-2">
        <div className="row">
          {specialProducts.map((image, index) => (
            <div key={index} className="col-sm col-md">
              <div className="d-flex justify-content-between flex-wrap align-items-center my-3">
                <div key={index} className="d-flex flex-column pt-1">
                  <img
                    className="yee-wd-75 yee-ht-75 mx-auto"
                    src={image.spImg}
                    alt={image.spNm}
                  />
                  <span className="text-12 yee-text-align-center yee-text-fw-bold">
                    {image.spNm}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Container class1="home-wrapper-2 pb-2 yee-bg-transparent">
        <div className="row">
          <div className="col-sm col-md p-0 yee-br-4px">
            <Slider {...settingLongSliders}>
              {homeForm.longBanners && homeForm.longBanners.map((image, index) => (
                <div key={index} className="position-relative d-flex align-items-center">
                  <a href={image.bannerLink}>
                    <img
                      src={image.bannerImg}
                      className="img-fluid rounded-3 w-100"
                      alt={image.bannerNm}
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Container>
      {homeForm.homeComponentDtos && homeForm.homeComponentDtos.map((homeComponentDto,index1) => null !== homeComponentDto.products && index1 < 2 && (

        <Container key = {index1} class1="featured-wrapper pb-2 home-wrapper-2">
          <div className="row pt-3">
            <div className="col-4">
              <div className="section-heading text-24">
                {homeComponentDto.componentTitle}
              </div>
            </div>
            <div className="col-8">
              <div className="d-flex justify-content-end">
                {homeComponentDto.homeProductSeries && homeComponentDto.homeProductSeries.toReversed().map((homeProductSerie, index2) => index2 < 4 && (
                    <Link key={index2} to="#!" className="button">
                      {homeProductSerie.productSerieNm}
                    </Link>
                  ))}
                <Link to="#!" className="button">
                  Xem tất cả
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <ProductCard grid={grid} products={homeComponentDto.products ? homeComponentDto.products : []}/>
          </div>
        </Container>
      ))}
      <Container class1="home-wrapper-2 pb-2 yee-bg-transparent">
        <div className="row">
          <div className="col-sm col-md p-0 yee-br-4px">
            <Slider {...settings}>
              {homeForm.halfLongBanners && homeForm.halfLongBanners.map((image, index) => (
                <div key={index} className="position-relative d-flex align-items-center yee-mr-16">
                  <a href={image.bannerLink}>
                    <img
                      src={image.bannerImg}
                      className="img-fluid rounded-3"
                      alt={image.bannerNm}
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Container>
      {homeForm.homeComponentDtos && homeForm.homeComponentDtos.map((homeComponentDto,index1) => null !== homeComponentDto.products && [] !== homeComponentDto.products && index1 > 2 && (
        <Container key = {index1} class1="featured-wrapper pb-2 home-wrapper-2">
          <div className="row pt-3">
            <div className="col-4">
              <div className="section-heading text-24">
                {homeComponentDto.componentTitle}
              </div>
            </div>
            <div className="col-8">
              <div className="d-flex justify-content-end">
                {homeComponentDto.homeProductSeries && homeComponentDto.homeProductSeries.toReversed().map((homeProductSerie, index2) => index2 < 4 && (
                    <Link key={index2} to="#!" className="button">
                      {homeProductSerie.productSerieNm}
                    </Link>
                  ))}
                <Link to="#!" className="button">
                  Xem tất cả
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <ProductCard grid={grid} products={homeComponentDto.products ? homeComponentDto.products : []}/>
          </div>
        </Container>
      ))}
      <Container class1="marque-wrapper home-wrapper-2 pb-2">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                {homeForm.brands && homeForm.brands.map((brand,index) => (
                  <div key={index} className="mx-4 w-100">
                    <img className="w-100 h-100"
                      src={brand.imgLink}
                      alt={brand.brandNm}
                      title={brand.brandNm}
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="blog-wrapper home-wrapper-2">
        <div className="row pt-3">
          <div className="col-6">
            <div className="section-heading text-24">Blogs Mới Nhất</div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-end">
              <Link to="/blogs" className="button">
                Xem Tất Cả
              </Link>
            </div>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-sm col-md">
            <BlogCard />
          </div>
          <div className="col-sm col-md">
            <BlogCard />
          </div>
          <div className="col-sm col-md">
            <BlogCard />
          </div>
          <div className="col-sm col-md">
            <BlogCard />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
