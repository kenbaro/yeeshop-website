import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import menu from "../images/menu.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faPhone ,faMicrophone,faMicrophoneSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { YeeUI } from "../constants/YeeCapConstants";
import { YEE_PATH, YEE_TOKEN } from "../constants/YeeConst";
import { getHeaderApi } from "../api/CommonApi";
import {useLocation} from 'react-router-dom';
import { autoCompleteSearchAPI, searchProductAPI } from "../api/ProductApi";
import { showToastMessage } from "./YeeToastMsg";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const Header = () => {

  const [headerForm,setHeaderForm] = useState({})
  const [keyWord,setKeyWord] = useState("");

  const [showMicro, setShowMicro] = useState({
    showMic: true,
    showMicSlash: false,
  })
  const navigate = useNavigate();

  const { transcript,resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening({continuous: true, language :"vi-VN"});

  if (!browserSupportsSpeechRecognition) {
      showToastMessage("Không thể kết nối tới hệ thống micro của bạn !", 1, false);
  }

  // function for Log out.
  const logOutFunc = (e) => {

    
    localStorage.removeItem(YEE_TOKEN.ACCESS_TOKEN);
    // direct to Login Page
    headerForm.fullNm = "";
    setHeaderForm(prev => ({...prev}));
    navigate("/login");
  }

  const [autoCompleteDto, setAutoCompleteDto] = useState(null);

  const getHeader = async () => {

    await getHeaderApi().then(
      res => {
        console.log(res.data);
        setHeaderForm(res.data);
      }
    ).catch(

    )
  }
  const searchProduct = async (e) => {

    //const keyWord = e.target.value();

    //navigate("/product?keywords="+keyWord);
    window.location.href = "/product?keywords="+keyWord;
  }

  
  const onClickSuggestCate = async (e,item) => {

      const kw = item.cateNm;
      setKeyWord(() => kw);
      setAutoCompleteDto(() => null);
      navigate(`/product?cateId=`+item.cateId);

  }

  const onClickSuggestProduct = async (e,item) => {

    const kw = item.productNm;
    setKeyWord(() => kw);
    setAutoCompleteDto(() => null);
    navigate(`product/${item.sku}`);

}
  const autoCompleteSearch = async (e) => {

    const kw = e.target.value;
    if (kw === "") {
      setKeyWord(() => kw);
      setAutoCompleteDto(() => null);
    } else {
      setKeyWord(() => kw);
      await autoCompleteSearchAPI(keyWord).then(
        res => {
          setAutoCompleteDto(() => res.data);
          console.log(autoCompleteDto)
        }
      ).catch(
        err=>{
          showToastMessage("không hợp lệ",1,false)
        }
      )
    }

  }
   
  const searchStartSpeech = (e) => {

    showMicro.showMic = false;
    showMicro.showMicSlash = true;

    setShowMicro((prev) => ({...prev}));
    resetTranscript();
    startListening();
  }

  const searchStopSpeech = (e) => {

    const kw = transcript;
    setKeyWord(() => kw);

    showMicro.showMic = true;
    showMicro.showMicSlash = false;

    setShowMicro((prev) => ({...prev}));

    SpeechRecognition.stopListening();
    window.location.href = "/product?keywords="+kw;
  }
  useEffect(() => {
     
    getHeader();
  },[headerForm.fullNm]);
  return (
    <>
      <header className="w-100">
        <div className="bg-red-700">
          <div className="d-flex align-items-center justify-content-center">
            {headerForm.headerBanner &&
              <a href={headerForm.headerBanner.bannerLink}>
                  <img width="100%" alt={headerForm.headerBanner.bannerNm} src={headerForm.headerBanner.bannerImg}/>
              </a>
            }
          </div>
        </div>
      </header>
      <header className="header-upper">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-md-2 col-sm-2">
              <h2 className="text-center">
                <Link to="/" className="text-white logo-txt">{headerForm.mainTitle}</Link>
              </h2>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2 yee-ht-36px text-14"
                  placeholder="Tìm kiếm..."
                  aria-label="Tìm kiếm..."
                  aria-describedby="basic-addon2"
                  onChange={(e) => autoCompleteSearch(e)}
                  value={keyWord}
                />
                <span className="input-group-text bg-white p-3 yee-ht-36px" onClick={(e) => searchProduct(e)} id="basic-addon2">
                  <BsSearch className="fs-8"/>
                </span>
                { showMicro.showMic && 
                  <span className="input-group-text bg-white p-3 yee-ht-36px" onClick={(e) => searchStartSpeech(e)} id="basic-addon2">
                    <FontAwesomeIcon icon={faMicrophone} />
                  </span>
                }
                
                { showMicro.showMicSlash && 
                  <span className="input-group-text bg-white p-3 yee-ht-36px" onClick={(e) => searchStopSpeech(e)} id="basic-addon2">
                    <FontAwesomeIcon icon={faMicrophoneSlash} />
                  </span>
                }
                
                {autoCompleteDto !== null &&
                    <div id="suggestBox" className={`${(autoCompleteDto.cateSuggests !== null ) || (autoCompleteDto.productSuggests !== null) ? "" : "d-none"}`}>
                      <div className="row mb-2">
                        {/* <div className="col-6 mt-2 yee-suggest-border-right">
                            <div className="suggest-cate-title"><span className="text-14 yee-text-fw-bold ps-4">Có phải bạn muốn tìm</span></div>

                            {autoCompleteDto !== null && autoCompleteDto.cateSuggests !== null && 
                              autoCompleteDto.cateSuggests.map((item,index) => (

                                <div key={index} className="suggest-cate-body yee-pointer"><span onClick={(e) => onClickSuggestCate(e,item)} className="text-12 ps-4">{item.cateNm}</span></div>
                             ))}
                        </div> */}
                        <div className="col mt-2">
                          <div className="suggest-cate-title"><span className="text-12 yee-text-fw-bold ps-2">Sản phẩm gợi ý</span></div>

                          {autoCompleteDto !== null && autoCompleteDto.productSuggests !== null && 
                              autoCompleteDto.productSuggests.map((item,index) => (
                                <div key={index} className="d-flex yee-suggest-border-bottom pb-1 ps-2" onClick={(e) => onClickSuggestProduct(e,item)}>
                                    <img src={item.productImage} className="yee-pointer" width={60} height={60} alt="product" />
                                    <div className="pt-2">
                                      <div className="suggest-cate-body yee-pointer"><span className="text-12">{item.productNm}</span></div>
                                      <div className="suggest-cate-body yee-pointer"><span className="text-12 color-primary yee-text-fw-bold">{item.productPrice}</span></div>
                                    </div>
                                    
                                </div>
                             ))}
                        </div>
                      </div>
                  </div>
                }
              </div>
              
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="header-upper-links d-flex align-items-center justify-content-center">
                <div className="col-9 align-items-center justify-content-between px-2 d-flex">
                  <Link
                      to="tel:+84 812200898"
                      className="d-flex align-items-center col-4 justify-content-flex-start gap-10 text-white"
                    >
                      <div className="col-1">
                        <FontAwesomeIcon icon={ faPhone } size="lg"/>
                      </div>
                      <div className="col-11">
                        <div className="d-flex flex-column justify-content-center line-break-auto">
                          <span className="badge text-white font-weight-bold text-12 text-start">Đặt Hàng:</span>
                          <span className="badge text-white font-weight-bold text-12 text-start">{headerForm.shopTel}</span>
                        </div>
                      </div>
                  </Link>
                  <Link to="/tracking-order" className="d-flex align-items-center col-4 justify-content-start gap-10 text-white">
                      <div className="col-1 align-items-center">
                        <FontAwesomeIcon icon={ faTruckFast } size="lg"/>
                      </div>
                      <div className="col-11">
                        <div className="d-flex flex-column justify-content-center">
                          <span className="badge text-white font-weight-bold text-12 line-break-auto text-start">Tra cứu</span>
                          <span className="badge text-white font-weight-bold text-12 text-start">đơn hàng</span>
                        </div>
                      </div>
                  </Link>
                  <Link to="/cart" className="d-flex align-items-center col-4 justify-content-start gap-10 text-white">
                      <FontAwesomeIcon icon={ faCartShopping } size="lg"/>
                      <div className="d-flex flex-column gap-10 pt-1">
                        <span id="cartCnt" className="badge bg-white text-dark rounded-circle text-12 font-weight-bold">{headerForm.cartCnt}</span>
                        <span className="mb-0 text-12">&nbsp;</span>
                      </div>
                  </Link>
                  
                </div>
                <div className="col-3 login-link align-items-center justify-content-end">
                  <div className="col-2">
                    <FontAwesomeIcon icon={ faUser } size="lg" className="color-white"/>
                  </div>
                  <div className="col-10">
                    <div className="d-flex flex-column justify-content-center">
                      { headerForm.fullNm !== "" && 
                        <div className="dropdown"> 
                          <div className="dropdown">
                            <button type="button" className="btn btn-secondary dropdown-toggle bg-transparent border-0 text-capitalize shadow-none" data-bs-toggle="dropdown" aria-expanded="false">
                            {headerForm.fullNm}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li><Link className="dropdown-item" to="/user-info">Thông tin cá nhân</Link></li>
                              <li><Link className="dropdown-item" to="/change-password">Đổi mật khẩu</Link></li>
                              <li><button className="dropdown-item" onClick={(e) => logOutFunc(e)} type="button">{YeeUI.YEE_CAP_LOGIN.SIGN_OUT}</button></li>
                            </ul>
                          </div>
                        </div>
                      }
                      { headerForm.fullNm === "" && 
                        <div className=""> 
                          <Link to="/login" className="d-flex align-items-center text-white link">
                            <p className="mb-0 text-14 text-center">
                            {YeeUI.YEE_CAP_LOGIN.LOGIN_TITLE }
                            </p>
                          </Link>
                          <Link to="/signup" className="d-flex align-items-center text-white link">
                            <p className="mb-0 text-14 text-center">
                            {YeeUI.YEE_CAP_LOGIN.LOGIN_SIGNUP}
                            </p>
                          </Link> 
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="yee-wd-184px">
                  
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink className="padding-menu" to="/">Trang Chủ</NavLink>
                    <NavLink className="padding-menu" to="/product">Sản Phẩm</NavLink>
                    {/* <NavLink className="padding-menu" to="/blogs">Blogs</NavLink> */}
                    <NavLink className="padding-menu" to="/contact">Liên Hệ</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
