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
import { ToastContainer } from "react-toastify";
import YeeLoader from "../components/YeeLoader";

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

const Home = () => {

  const [grid, setGrid] = useState(5);
  const [loading,setLoading] = useState(false);
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

  const getHome = async () => {
    setLoading(true);
    await getHomeApi().then(
      res => {

        const data = res.data;
        console.log(res.data);
        setHomeForm(data)
      }
    ).catch(
      err => {
        console.log("err:  " + err);
      }
    ).finally(() => setLoading(false))

  };
  useEffect(() => {
             
    getHome();
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
      <Container class1="home-wrapper-2 py-2 mt-4 yee-bg-transparent">
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
      {homeForm.homeComponentDtos && homeForm.homeComponentDtos.map((homeComponentDto,index1) => null !== homeComponentDto.products && [] !== homeComponentDto.products && index1 < 2 && (
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
      {homeForm.homeComponentDtos && homeForm.homeComponentDtos.map((homeComponentDto,index1) => null !== homeComponentDto.products && [] !== homeComponentDto.products && index1 >= 2 && (
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

      {/* <Container class1="blog-wrapper home-wrapper-2">
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
      </Container> */}
      <ToastContainer
         position="top-right"
         autoClose={2500}
         hideProgressBar={false}
         newestOnTop={true}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         theme="light"
       />
       <YeeLoader loading={loading}/>
    </>
  );
};

export default Home;
