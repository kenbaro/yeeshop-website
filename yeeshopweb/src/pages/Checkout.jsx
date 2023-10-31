import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
const Checkout = () => {
  return (
    <>
      <Meta title={"Thanh Toán"}></Meta>
      <BreadCrumb title="Thanh Toán"></BreadCrumb>
      <Container class1="checkout-wrapper mb-2 home-wrapper-2">
        <div className="row yee-br-none">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Trang Thanh Toán</h3>
              <h4 className="title total">Thông tin liên hệ</h4>
              <p className="user-details total">
                Thái Duy Bảo (xiaoyi38@gmail.com - 0812200898)
              </p>
              <h4 className="mb-3">Thông tin nhận hàng</h4>
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Họ Đệm"
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Tên"
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Địa Chỉ: 01,Võ Văn Ngân, Tp.Hồ Chí Minh"
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Tỉnh/Thành phố
                    </option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Quận/Huyện
                    </option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Phường/Xã
                    </option>
                  </select>
                </div>
                <div className="w-100">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Đơn vị vận chuyển
                    </option>
                  </select>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Về Giỏ Hàng
                    </Link>
                    <Link to="/cart" className="button">
                      Đặt Hàng
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              <div className="d-flex gap-10 mb-2 align-align-items-center">
                <div className="w-100 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-10px", right: "2px" }}
                      className="badge bg-secondary text-white w-25 rounded-circle p-2 position-absolute"
                    >
                      1
                    </span>
                    <img
                      className="img-fluid"
                      src="https://cf.shopee.vn/file/sg-11134201-23020-gxvwlfnusinv6d"
                      alt="product"
                    />
                  </div>
                  <div>
                    <p className="title">
                      Áo thun Outeriity SIG 2-WHITE- phông unisex from rộng
                      Limita (V205)
                    </p>
                    <div className="d-flex justify-content-between">
                      <div className="w-75">
                        <h5 className="total-price">Đơn Giá</h5>
                        <h5 className="total-price">Tạm Tính</h5>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">99.000 đ</h5>
                        <h5 className="total">99.000 đ</h5>
                      </div>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Tạm Tính</p>
                <p className="total-price">99.000 đ</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Vận Chuyển</p>
                <p className="mb-0 total-price">11.000 đ</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Tổng Thanh Toán</h4>
              <h5 className="total-price text-danger">110.000 đ</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
