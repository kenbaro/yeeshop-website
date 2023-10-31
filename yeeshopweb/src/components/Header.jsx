import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import menu from "../images/menu.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { YeeUI } from "../constants/YeeCapConstants";
import { YEE_PATH, YEE_TOKEN } from "../constants/YeeConst";
import { getHeaderApi } from "../api/CommonApi";
import {useLocation} from 'react-router-dom';
const Header = () => {

  const [headerForm,setHeaderForm] = useState({})

  const [userNm,setUserNm] = useState("");

  const navigate = useNavigate();

  // function for Log out.
  const logOutFunc = (e) => {

    localStorage.removeItem(YEE_TOKEN.ACCESS_TOKEN);
    // direct to Login Page
    setUserNm("");
  }

  const getHeader = async () => {

    await getHeaderApi().then(
      res => {

        setHeaderForm(res.data);
        setUserNm(headerForm.fullNm);
      }
    ).catch(

    )
  }

  useEffect(() => {
     
    getHeader();
  },[userNm]);
  return (
    <>
      <header className="w-100">
        <div className="bg-red-700">
          <div className="d-flex align-items-center justify-content-center">
            {headerForm.headerBanner &&
              <a href={headerForm.headerBanner.bannerLink}>
                  <img alt={headerForm.headerBanner.bannerNm} src={headerForm.headerBanner.bannerImg}/>
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
                  className="form-control py-2 yee-ht-36px"
                  placeholder="Tìm kiếm..."
                  aria-label="Tìm kiếm..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3 yee-ht-36px" id="basic-addon2">
                  <BsSearch className="fs-8" />
                </span>
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
                  <Link to="#!" className="d-flex align-items-center col-4 justify-content-start gap-10 text-white">
                      <div className="col-1 align-items-center">
                        <FontAwesomeIcon icon={ faNewspaper } size="lg"/>
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
                        <span className="badge bg-white text-dark rounded-circle text-12 font-weight-bold">0</span>
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
                      { userNm !== "" && 
                        <div className=""> 
                          <Link to="#!" className="d-flex align-items-center text-white link">
                            <p className="mb-0 text-14 text-center">
                              {userNm}
                            </p>
                          </Link>

                          <Link to={YEE_PATH.LOGIN_PATH} onClick={(e) => logOutFunc(e)} className="d-flex align-items-center text-white link">
                            <p className="mb-0 text-14 text-center">
                            {YeeUI.YEE_CAP_LOGIN.SIGN_OUT}
                            </p>
                          </Link>
                        </div>
                      }
                      { userNm === "" && 
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
                <div className="">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="d-inline-block yee-dr-down-txt">
                        Danh Mục
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Vnhax
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Xiao Yi Bypass
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Cerberus Bypass
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Snake Bypass
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Vnmod Bypass
                        </Link>
                      </li>
                      
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink className="padding-menu" to="/">Trang Chủ</NavLink>
                    <NavLink className="padding-menu" to="/product">Sản Phẩm</NavLink>
                    <NavLink className="padding-menu" to="/blogs">Blogs</NavLink>
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
