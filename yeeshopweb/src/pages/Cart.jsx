import React,{ useEffect, useState} from "react";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate, useLocation} from "react-router-dom";
import Container from "../components/Container";
import {deleteCartApi, getCartApi, updateCartApi, validateBeforeSwitchToPayApi} from "../api/CartApi";
import { showToastMessage, YeeToastMsg, yeeToastDismiss } from "../components/YeeToastMsg";
import {YEE_MSG_TYPE, CART_MSG } from "../constants/YeeConst";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus,faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import {removeAllComma, addAllComma,removeComma,addComma} from "../utils/YeeCommonUtils";
const Cart = () => {

  const navigate = useNavigate();

  const [cartForm,setCartForm] = useState(null);

  const [cartItem,setCartItem] = useState({});

  const [params,setParam] = useState({});
  const [payCartItems, setPayCartItems] = useState([]);

  const validateBeforeSwitchToPay = async (data) => {

      await validateBeforeSwitchToPayApi(data).then(
        res => {
          if (res.data.isError) {
            yeeToastDismiss();
            window.location ="/cart";
            showToastMessage(res.data.messages[0].messageTitle, res.data.messages[0].messageType,false);
            //getCart();
          } else {

              navigate("/checkout/:id", {state : data});

              const dataJson = JSON.stringify(data);
              localStorage.setItem("cartItems",dataJson);
          }
        }
      ).catch(
        err=>{
          showToastMessage("err",1,false);
          const redirect = () => {
            window.location.href="/login";
          }
          setTimeout(redirect(),5000);
        }
      );
  }
  const handlePayOnClick = (e) => {

    
      validateBeforeSwitchToPay({cartItems : payCartItems});
  }
  const addAllToChkOut = (e) => {

      const chkArr = document.querySelectorAll("tbody > tr:not(.row-disable) [id^='chkItem']");

      if (e.target.checked) {

        for (const checkbox of chkArr) {

          if (!checkbox.checked) {

            checkbox.click();
          }
          
        }
      } else {

        for (const checkbox of chkArr) {

          if(checkbox.checked) {

            checkbox.click();
          }
          
        }
      }
  }

  const addItemToCheckOut = (e,item) => {
    
    if (!(item.productQty === 0 || item.productQty < item.orderQty)) {

      if (e.target.checked) {

          removeAllComma();

          const tempPriceTotal = Number(removeComma(cartForm.tempPriceTotal)) + Number(removeComma(item.tempPrice));
          cartForm.tempPriceTotal = addComma(tempPriceTotal);

          if(Array.isArray(payCartItems)) {
            const filteredArray = payCartItems.filter(elem => elem.cartId === item.cartId);
            if (filteredArray.length === 0) {

              payCartItems.push(item);
            }
          }
          setPayCartItems(() => (payCartItems));
          addAllComma();
      } else {

        removeAllComma();
        
        const filteredArray = payCartItems.filter(elem => elem.cartId !== item.cartId);
        if (filteredArray.length <= 0) {
          cartForm.tempPriceTotal = 0;
        } else {
          const tempPriceTotal = Number(removeComma(cartForm.tempPriceTotal)) - Number(removeComma(item.tempPrice));
          cartForm.tempPriceTotal = addComma(tempPriceTotal);
        }
        while(payCartItems.length > 0) {
          payCartItems.pop();
        }
        filteredArray.map(elem => payCartItems.push(elem));

        setPayCartItems(() => payCartItems);
        addAllComma();
        document.getElementById("chkAll").checked = false;
      }
      setCartForm((prev) => ({...prev}));
    }
    
  }
  const handleChangeQty = (e,type,item) => {

    if ( 1 === type) {
      
      const qty= Number (item.orderQty) + 1;

      params.qty = qty;
      params.cartId= item.cartId;
      setParam(prev => ({...prev}));
      updateQuantityCartItem(item,params);

    } else if (0 === type) {

      if (Number(item.orderQty) > 1) {
        
        const qty = item.orderQty > item.productQty ? item.productQty : Number(item.orderQty) - 1;

        params.qty = qty;
        params.cartId= item.cartId;
        setParam(prev => ({...prev}));
        updateQuantityCartItem(item,params);
      }
    }
  }
  const updateQuantityCartItem = async (item,params) => {
    await updateCartApi(params).then(
      res => {

        console.log(res.data);
        if (!res.data.isError) {

          getCart();
        }
        yeeToastDismiss();
        showToastMessage(res.data.messages[0].messageTitle, res.data.messages[0].messageType,false);
        //setTimeout(showToastMessage(res.data.messages[0].messageTitle, res.data.messages[0].messageType,false),5000);
      }
      
    ).catch();

    
  }
  const deleteCartItem = async (data) => {

    await deleteCartApi(data).then(
      res=>{
        console.log(res.data)
        yeeToastDismiss();
        showToastMessage(res.data.messages[0].messageTitle, res.data.messages[0].messageType,true);
        getCart();
      }
    ).catch()
  }
  const getCart = async () => {

    await getCartApi().then(
      res => {
        console.log(res.data);
        if (localStorage.getItem("accessToken") !== null) {

          setCartForm(()=> (res.data));
          document.getElementById("cartCnt").innerText= res.data.cartCnt;
        } else {
          document.getElementById("cartCnt").innerText= 0;
        }
        
        
      }
    ).catch(
      err => {
        
        // navigate("/login",  {state: {

        //     message: CART_MSG.REQUIRE_LOGIN,
        //     type:YEE_MSG_TYPE.MSG_ERROR,
        //     inModal: false,
        // }})
        window.location.href="/login";
        showToastMessage(CART_MSG.REQUIRE_LOGIN, YEE_MSG_TYPE.MSG_ERROR,false);
      }
    );
  }

  useEffect(()=> {

    getCart();
  },[]);
  return (
    <>
      <Meta title={"Giỏ Hàng"} />
      <BreadCrumb title="Giỏ Hàng" />
      <Container class1="cart-wrapper home-wrapper-2 pb-2">
        <div className="row yee-br-none">
          <div id="content" className="col-sm-12">
          <h6 className="title text-uppercase">Giỏ Hàng Của Bạn</h6>
            <div className="table-responsive form-group">
              { cartForm !== null && 
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <td className="text-center"><input type="checkbox" name="chkAll" onClick={(e) => addAllToChkOut(e)} id="chkAll"/></td>
                      <td className="text-center">Hình Ảnh</td>
                      <td className="text-left">Tên Sản Phẩm</td>
                      <td className="text-left">SKU</td>
                      <td className="text-left">Màu sắc</td>
                      <td className="text-left">Số Lượng</td>
                      <td className="text-right">Đơn Giá</td>
                      <td className="text-right">Giảm Giá</td>
                      <td className="text-right">Giá Mới</td>			
                      <td className="text-right">Tạm Tính</td>
                      <td className="text-right">Xoá</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartForm !== null && cartForm.cartItems.map((item,key) => (
                        <tr key={key} className={`${item.productQty === 0 || item.productQty < item.orderQty || !item.isAvailable ? "row-disable" : ""}`}>
                          <td className="text-center align-middle ">
                              <input type="checkbox" className="yee-wd-40px yee-ht-40px" onClick={(e) => addItemToCheckOut(e,item)} name="chkItem" id={`chkItem_${key}`}/>
                          </td>
                          <td className="text-center"><Link href="#!"><img width="70px" src={item.image} alt={item.productNm} title={item.productNm} className="img-thumbnail" /></Link></td>
                          <td className="text-left align-middle">
                            <Link to={`/product/${item.sku}`}
                            state={{SKU: item.sku}}>{item.productNm}</Link>
                            <p className="text-12">Tồn kho: {item.productQty}</p>
                            {item.productQty === 0 && <small className="color-primary">{CART_MSG.QTY_0}</small>}
                            {!item.isAvailable && <small className="color-primary">Sản phẩm hiện không khả dụng</small>}
                            {item.productQty !== 0 && item.productQty < item.orderQty && <small className="color-primary">{CART_MSG.QTY_GRT_ODR} <br/>{CART_MSG.INVENTORY} {item.productQty}</small>}
                          </td>
                          <td className="text-right align-middle">{item.sku}</td>
                          <td className="text-left align-middle">{item.productColor}</td>
                          <td className={`text-left align-middle ${item.productQty < item.orderQty ? "td-not-disable" : ""}`} width="200px">

                            <div className="d-flex align-items-center">
                              <FontAwesomeIcon icon={faCircleMinus} onClick={(e) => handleChangeQty(e,0,item)} className={`yee-pointer color-777777 fa-lg ${item.productQty <= 1 && item.orderQty <= 1? 'disable' :''}`}/>
                              <input
                                type="number"
                                name=""
                                value={item.orderQty}
                                className="form-control mx-2 text-center yee-wd-48px"
                                id="productQty"
                                readOnly="readonly"
                                disabled
                              />
                              <FontAwesomeIcon icon={faCirclePlus} onClick={(e) => handleChangeQty(e,1,item)} className={`yee-pointer color-primary fa-lg ${item.productQty <= item.orderQty ? 'disable' :''}`}/>
                            </div>
                          </td>
                          <td className="text-right align-middle">{item.unitPrice}</td>
                          <td className="text-right align-middle">{item.discount !== "" && item.discount !== "0" ? (item.discount+"%") : ""} </td>
                          <td className="text-right align-middle yee-text-fw-bold">{item.newPrice}</td>
                          <td className="text-right align-middle yee-text-fw-bold yeeComma">{item.tempPrice}</td>
                          <td className="text-right align-middle td-not-disable">
                            <button 
                                data-bs-toggle="modal"       
                                data-bs-target="#staticBackdropDelete"
                                type="button" 
                                onClick={() => setCartItem(item)} 
                                title="Remove"
                                className="btn btn-danger btn-cart-item-remove" >
                                  <i className="fa fa-times-circle"></i>
                              </button>
                            </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              }
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
              {cartForm !== null &&

                <div className="d-flex flex-column align-items-end">
                  <h5>Tạm Tính: <span className="color-primary yeeComma">{cartForm.tempPriceTotal}</span></h5>
                  <p>Phí Vận Chuyển Sẽ Được Tính Ở Trang Thanh Toán</p>
                  <button data-bs-toggle="modal" data-bs-target="#modalCheckout" className={`button ${payCartItems.length > 0 ? "" : "disable"}`}>
                    Thanh Toán
                  </button>
                </div>
              }
              
            </div>
          </div>
        </div>
      </Container>
      <div
          className="modal fade"
          id="staticBackdropDelete"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content">
                  <div className="modal-header pd-0 border-0">
                      <h5 className="modal-title color-primary">Xoá sản phẩm khỏi giỏ hàng</h5>
                  </div>
                  <div className="modal-body py-0">
                      { Object.keys(cartItem).length !== 0  &&
                      <div className="d-flex align-items-center">
                          <div className="flex-grow-1 w-50 ">
                              <img src={cartItem.image} className="img-fluid" alt="product imgae" />
                          </div>
                          <div className="d-flex flex-column flex-grow-1 w-50 mar-50">
                              <h6 className="mb-3">{cartItem.productNm}</h6>
                              <p className="mb-1">SKU: <span className="yee-text-fw-bold">{cartItem.sku}</span></p>
                              <p className="mb-1">Màu: <span className="yee-text-fw-bold">{cartItem.productColor}</span></p>
                              <p className="mb-1">Số lượng: <span className="yee-text-fw-bold">{cartItem.orderQty}</span></p>
                              
                          </div>
                      </div>
                      }
                  </div>
                  <div className="modal-footer border-0 justify-content-center gap-30 py-2">
                      <button 
                          type="button"
                          className="button"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          data-bs-backdrop="false">
                          Huỷ
                      </button>
                      
                      <button 
                          type="button"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          data-bs-backdrop="false" 
                          onClick={() => deleteCartItem(cartItem)} 
                          className="button">
                        Xác Nhận
                      </button>
                      
                  </div>
              </div>
          </div>
      </div>
      <div
          className="modal fade"
          id="modalCheckout"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content">
                  <div className="modal-header pd-0 border-0">
                      <h5 className="modal-title color-primary">Thanh toán sản phẩm</h5>
                  </div>
                  <div className="modal-body py-0">
                      <span className="">Bạn có muốn chuyển hướng tới trang thanh toán?</span>
                  </div>
                  <div className="modal-footer border-0 justify-content-center gap-30 py-2">
                      <button 
                          type="button"
                          className="button"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          data-bs-backdrop="false">
                          Huỷ
                      </button>
                      
                      <button 
                          type="button"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          data-bs-backdrop="false" 
                          onClick={(e) => handlePayOnClick(e)} 
                          className="button">
                        Xác Nhận
                      </button>
                      
                  </div>
              </div>
          </div>
      </div>
      <YeeToastMsg/>
    </>
  );
};

export default Cart;
