import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const Wishlist = () => {
  return (
    <>
      <Meta title={"Sản Phẩm Đã Thích"} />
      <BreadCrumb title="Sản Phẩm Đã Thích" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-sm col-md-3">
            <div className="wishlist-card position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image">
                <img
                  src="	https://cdn-v2.didongviet.vn/files/products/2023/8/13/1/1694544996241_thumb_iphone_15_pro_didongviet.png"
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                Áo thun Outeriity SIG 2-WHITE- phông unisex from rộng Limita (V205)
                </h5>
                <h6 className="price">200.000 đ</h6>
              </div>
            </div>
          </div>
          <div className="col-sm col-md-3">
            <div className="wishlist-card position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image">
                <img
                  src="https://cdn-v2.didongviet.vn/files/products/2023/8/13/1/1694544996241_thumb_iphone_15_pro_didongviet.png"
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                Áo thun Outeriity SIG 2-WHITE- phông unisex from rộng Limita (V205)
                </h5>
                <h6 className="price">200.000 đ</h6>
              </div>
            </div>
          </div>
          <div className="col-sm col-md-3">
            <div className="wishlist-card position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image">
                <img
                  src="https://cdn-v2.didongviet.vn/files/products/2023/8/13/1/1694544996241_thumb_iphone_15_pro_didongviet.png"
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                Áo thun Outeriity SIG 2-WHITE- phông unisex from rộng Limita (V205)
                </h5>
                <h6 className="price">200.000 đ</h6>
              </div>
            </div>
          </div>
          <div className="col-sm col-md-3">
            <div className="wishlist-card position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image">
                <img
                  src="https://cdn-v2.didongviet.vn/files/products/2023/8/13/1/1694544996241_thumb_iphone_15_pro_didongviet.png"
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                Áo thun Outeriity SIG 2-WHITE- phông unisex from rộng Limita (V205)
                </h5>
                <h6 className="price">200.000 đ</h6>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
