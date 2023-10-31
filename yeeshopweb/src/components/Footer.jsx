import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
import {
  YEE_CAP_3_FOOTER_CONTACT,
  YEE_CAP_4_FOOTER_INFO,
  YEE_CAP_5_FOOTER_ACCOUNT,
  YEE_CAP_6_FOOTER_BRAND,
  YEE_CAP_7_FOOTER_ADDRESS,
  YEE_CAP_9_FOOTER_EMAIL,
  YEE_CAP_10_FOOTER_WORKING
} from "../constants/YeeCapConstants";
const Footer = () => {
  return (
    <>
      <footer className="py-2 info-footer bg-white">
        <div className="container-xxl">
          <div className="row">
            <div className="col-md-4 col-sm-4">
              <h5 className="mod-title mb-2">{YEE_CAP_3_FOOTER_CONTACT}</h5>
              <div>
                <address className="text-dark fs-6">
                  
                </address>
                <a
                  href="tel:+91 8264954234"
                  className="mt-3 d-block mb-1 text-dark"
                >
                  {YEE_CAP_7_FOOTER_ADDRESS}
                </a>

                <a
                  href="mailto:xiaoyi@bypass.hax"
                  className="mt-2 d-block mb-0 text-dark"
                >
                  {YEE_CAP_9_FOOTER_EMAIL}
                </a>
                <a href="#!" className="mt-2 d-block mb-1 text-dark">{YEE_CAP_10_FOOTER_WORKING}</a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-dark" href="/#">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a className="text-dark" href="/#">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-dark" href="/#">
                    <BsGithub className="fs-4" />
                  </a>
                  <a className="text-dark" href="/#">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm col-md">
              <h5 className="mod-title mb-2">{YEE_CAP_4_FOOTER_INFO} </h5>
              <div className="footer-link d-flex flex-column">
                <Link to="/privacy-policy" className="footer-href mb-1">
                  Chính Sách
                </Link>
                <Link to="/refund-policy" className="footer-href mb-1">
                  Chính Sách Đổi Trả
                </Link>
                <Link to="/shipping-policy" className="footer-href mb-1">
                  Chính Sách Vận Chuyện
                </Link>
                <Link to="/term-conditions" className="footer-href mb-1">
                  Điều Khoản và Điều Lệ
                </Link>
              </div>
            </div>
            <div className="col-sm col-md">
              <h5 className="mod-title mb-2">{YEE_CAP_5_FOOTER_ACCOUNT}</h5>
              <div className="footer-link d-flex flex-column">
                <Link className="footer-href mb-1">Faq</Link>
                <Link className="footer-href mb-1">Liên Hệ</Link>
                <Link className="footer-href mb-1">Về Chúng Tôi</Link>
              </div>
            </div>
            <div className="col-sm col-md">
              <h5 className="mod-title mb-2">{YEE_CAP_6_FOOTER_BRAND}</h5>
              <div className="footer-link d-flex flex-column">
                <Link className="footer-href mb-1">Adidas</Link>
                <Link className="footer-href mb-1">Dior</Link>
                <Link className="footer-href mb-1">Gucci</Link>
                <Link className="footer-href mb-1">Helmet</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Made by XiaoYi
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
