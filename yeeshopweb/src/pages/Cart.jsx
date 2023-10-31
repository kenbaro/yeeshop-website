import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const Cart = () => {
  return (
    <>
      <Meta title={"Giỏ Hàng"} />
      <BreadCrumb title="Giỏ Hàng" />
      <Container class1="cart-wrapper home-wrapper-2 pb-2">
        <div className="row yee-br-none">
          <div id="content" className="col-sm-12">
          <h6 className="title text-uppercase">Giỏ Hàng Của Bạn</h6>
            <div className="table-responsive form-group">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <td className="text-center">Hình Ảnh</td>
                    <td className="text-left">Tên Sản Phẩm</td>
                    <td className="text-left">SKU</td>
                    <td className="text-left">Số Lượng</td>
                    <td className="text-right">Đơn Giá</td>
                    <td className="text-right">Giảm Giá</td>					
                    <td className="text-right">Tạm Tính</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center"><a href="#!"><img width="70px" src="https://cf.shopee.vn/file/sg-11134201-23020-gxvwlfnusinv6d" alt="Aspire UltraDead" title="Aspire UltraDead" className="img-thumbnail" /></a></td>
                    <td className="text-left"><a href="#!" >Xiao Yi Product</a><br />
                     </td>
                    <td className="text-left" >Pt 001</td>
                    <td className="text-left" width="200px"><div className="input-group btn-block quantity">
                        <input id="qty-update" type="number" name="quantity" min={1} max={10} className="form-control"/>
                        <span className="input-group-btn">
                        <button type="submit" style={{lineHeight:'1.3'}} data-toggle="tooltip" title="Update" className="btn btn-primary btn-update-cart-item"><i className="fa fa-clone"></i></button>
                        <button type="submit" style={{lineHeight:'1.3'}} data-toggle="tooltip" title="Remove" className="btn btn-danger btn-cart-item-remove" ><i className="fa fa-times-circle"></i></button>
                        </span></div></td>
                    <td className="text-right" >200.000 đ</td>
                    <td className="text-right" >50%</td>
                    <td className="text-right" >99.000 đ</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div> 
          <div className="col-12 py-2 my-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <div className="d-flex flex-column align-items-end">
                <h5>&nbsp;</h5>
                <p>&nbsp;</p>
                <Link to="/product" className="button">
                  Tiếp Tục Shopping
                </Link>
              </div>
              <div className="d-flex flex-column align-items-end">
                <h5>Tạm Tính: <span style={{color:'#bf4800'}}>10000</span> VNĐ</h5>
                <p>Phí Vận Chuyển Sẽ Được Tính Ở Trang Thanh Toán</p>
                <Link to="/checkout" className="button">
                  Thanh Toán
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
