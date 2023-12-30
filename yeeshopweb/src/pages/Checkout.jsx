import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { getCheckOutApi, createVNPayPayment, handleVnPayCallback } from "../api/CartApi";
import { useEffect } from "react";
import { showToastMessage, YeeToastMsg } from "../components/YeeToastMsg";
import { CART_MSG, YEE_MSG_TYPE } from "../constants/YeeConst";
import { YeeCap,YeeUI } from "../constants/YeeCapConstants";
import * as Yup from "yup";
import { useFormik } from "formik";
const Checkout = (props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const reqParams = new URLSearchParams(location.search);
  const onChangeFullNm = (e,formik) => {

    formik.values.fullName = e.target.value;
    formik.handleChange(e);
    checkoutForm.fullNm=formik.values.fullName;
    setCheckoutForm(prev => ({...prev}));
    console.log(checkoutForm);
  }

  const onChangeEmail = (e,formik) => {

    formik.values.email = e.target.value;
    formik.handleChange(e);

    checkoutForm.email=e.target.value;
    setCheckoutForm(prev => ({...prev}));
    console.log(checkoutForm);
  }

  const onChangePhoneNum = (e,formik) => {

    formik.values.phone = e.target.value;
    formik.handleChange(e);

    checkoutForm.phone=formik.values.phone;
    setCheckoutForm(prev => ({...prev}));
    console.log(formik.values.phone);
    console.log(checkoutForm);
  }

  const onChangeDetailAddress = (e,formik) => {

    formik.values.detailAddress = e.target.value;
    formik.handleChange(e);
    checkoutForm.detailAddress=formik.values.detailAddress;
    setCheckoutForm(prev => ({...prev}));
    console.log(formik.values.detailAddress);
    console.log(checkoutForm);
  }

  const onChangeNote = (e) => {
    checkoutForm.note = e.target.value;
    setCheckoutForm(prev => ({...prev}));
    console.log(checkoutForm);
  }

  const {cartItems} = location.state !== null ? location.state : JSON.parse(localStorage.getItem("cartItems"));

  const onClickCreatePayment = async (checkoutForm) => {

      await createVNPayPayment(checkoutForm).then(

        res => {
          console.log(res.data);
          if(res.data !== "") {
            window.location.href= res.data;
          }
        }
      ).catch(

        err => {
          showToastMessage(err.data.messages[0].messageTitle, err.data.messages[0].messageType,false);
        }
      )
  }
  const [checkoutForm,setCheckoutForm] = useState({});

  const telRegExp = YeeCap.REGEX_STR.NOT_PHONE_NUMBER;
  // create validate schema
  let schema = Yup.object().shape({
    fullName: Yup.string().required(YeeCap.FULLNM.EMPTY_NM),
    email: Yup
      .string()
      .email(YeeCap.EMAIL.INVALID_FORMAT_EMAIL)
      .required(YeeCap.EMAIL.EMPTY_EMAIL),
    phone: Yup.string().required(YeeCap.PHONE.EMPTY_PHONE).matches(telRegExp, YeeCap.PHONE.NOT_NUMBER)
                .length(10, YeeCap.PHONE.LENGTH_10),
    detailAddress: Yup.string().required(YeeCap.ADDRESS.EMPTY_ADDRESS), 
  });

  // validate 
  const formik = useFormik({

    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      detailAddress: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      onClickCreatePayment(checkoutForm);
    },
  });
  //console.log(cartItems);

  const onChangeProvince =(e) => {

    checkoutForm.provinceCd = e.target.value;
    checkoutForm.districtCd=null;
    setCheckoutForm(prev => ({...prev}));
  }

  const onChangeDistrict = (e) => {

    checkoutForm.districtCd = e.target.value;
    checkoutForm.wardCd = null;
    setCheckoutForm(prev => ({...prev}));
  }

  const onChangeWard = (e) => {

    checkoutForm.wardCd = e.target.value;
    setCheckoutForm(prev => ({...prev}));
  }

  const onChangeDelivery = (e) => {

    checkoutForm.deliveryUnitId = e.target.value;
    setCheckoutForm(prev => ({...prev}));
  } 
  const onChangeDeliveryService = (e) => {

    checkoutForm.deliveryServiceId = e.target.value;
    setCheckoutForm(prev => ({...prev}));
  } 
  const onChangePayMethod = (e) => {

    checkoutForm.payId = e.target.value;
    setCheckoutForm(prev => ({...prev}));
  }

  const getCheckOut = async () => {

    if (cartItems !== null ) {

      checkoutForm.cartItems = cartItems;
      //setCheckoutForm(prev => ({...prev}));
      
      await getCheckOutApi(checkoutForm).then(
  
        res => {
          setCheckoutForm(res.data);
          console.log(res.data);
        }
      ).catch(
        err => {
          showToastMessage(CART_MSG.ERROR_SELECT,YEE_MSG_TYPE.MSG_ERROR, false);
        }
      );
    } else {

      showToastMessage("Lỗi", YEE_MSG_TYPE.MSG_ERROR,false);
    }
    
  }

  const {id} = useParams(); 
  const handlePayment = async () => {
    console.log(id);
    await handleVnPayCallback(location.search,id).then(
      res => {
        
        navigate(res.data);
      }
    ).catch();
  }
  useEffect(() => {
    if (location.search !=="") {
      console.log(location.search);
      handlePayment();
    }
    getCheckOut();
  },[Object.entries(checkoutForm).length === 0, checkoutForm.provinceCd, checkoutForm.districtCd, checkoutForm.wardCd,checkoutForm.deliveryServiceId,checkoutForm.deliveryUnitId]);
  return (
    <>
      <Meta title={"Thanh Toán"}></Meta>
      <BreadCrumb title="Thanh Toán"></BreadCrumb>
      {Object.entries(checkoutForm).length > 0 &&
          <Container class1="checkout-wrapper mb-1 home-wrapper-2">
            <div className="row yee-br-none pb-5">
              <div className="col-md-7 col-sm">
                <div className="checkout-left-data">
                  <h4 className="title total">Thông tin khách hàng</h4>
                  <p className="user-details total">
                    {checkoutForm.userNm} ({checkoutForm.userEmail} - {checkoutForm.userTel})
                  </p>
                  <h4 className="mb-3">Thông tin nhận hàng</h4>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-10 flex-wrap justify-content-between"
                  >
                    <div className="row w-100">
                      <div className="col">
                        <div className="yee-required">
                          <label htmlFor="fullName" className="form-label mb-0 text-14">Họ Tên</label>
                          <input id="fullName"
                            type="text"
                            name="fullName"
                            placeholder="Ví dụ: Nguyễn Văn A"
                            onChange={(e) => onChangeFullNm(e,formik)}
                            className={`form-control ${formik.touched.fullName && formik.errors.fullName ? "border-danger": ""}`} 
                          />
                          <small className="form-text text-danger">{formik.touched.fullName && formik.errors.fullName}</small>
                        </div>
                      </div>
                      <div className="col">
                        <div className="yee-required">
                          <label htmlFor="phoneNum" className="form-label mb-0 text-14">Số điện thoại</label>
                          <input id="phoneNum"
                            type="text"
                            name="phone"
                            placeholder="Ví dụ: 0987654321"
                            className={`form-control ${formik.touched.phone && formik.errors.phone ? "border-danger": ""}`} 
                            onChange={(e) => onChangePhoneNum(e,formik)}
                          />
                          <small className="form-text text-danger">{formik.touched.phone && formik.errors.phone}</small>
                        </div>
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="col">
                        <div className="yee-required">
                          <label htmlFor="email" className="form-label mb-0 text-14">Email</label>
                          <input id="email"
                            type="text"
                            name="email"
                            placeholder="Ví dụ: xiaoyishop@yee.com"
                            className={`form-control ${formik.touched.email && formik.errors.email ? "border-danger": ""}`} 
                            onChange={(e) => onChangeEmail(e,formik)}
                          />
                          <small className="form-text text-danger">{formik.touched.email && formik.errors.email}</small>
                        </div>
                      </div>
                    </div>
                    <div className="row w-100">
                        <div className="col-4">
                            <div className="yee-required">
                                <label htmlFor="provinceSelect" className="form-label mb-0 text-14">Tỉnh/Thành Phố</label>
                                <select name="" onChange={(e) => onChangeProvince(e)} className="form-control form-select w-100" id="provinceSelect">
                                {checkoutForm.provinces && checkoutForm.provinces.map((p,index) => (
                                    <option key={index} value={p.provinceID} >
                                        {p.provinceName}
                                    </option>
                                ))}
                                </select>              
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="yee-required">
                                <label htmlFor="provinceSelect" className="form-label mb-0 text-14">Quận/Huyện</label>
                                <select name="districtSelect" className="form-control form-select w-100" onChange={(e) => onChangeDistrict(e)} id="districtSelect">
                                {checkoutForm.districts && checkoutForm.districts.map((d,index) => (
                                    <option key={index} value={d.districtID}>
                                        {d.districtName}
                                    </option>
                                ))}
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="yee-required">
                                <label htmlFor="wardSelect" className="form-label mb-0 text-14">Phường/Xã</label>
                                <select name="" onChange={(e) => onChangeWard(e)} className="form-control form-select w-100" id="wardSelect">
                                    {checkoutForm.wards && checkoutForm.wards.map((w,index) => (
                                        <option key={index} value={w.wardId}>
                                            {w.wardNm}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>
                    
                    <div className="row w-100">
                        <div className="yee-required">
                            <label htmlFor="detailAddress" className="form-label mb-0 text-14">Địa chỉ nhận hàng</label>
                            <input id= "detailAddress"
                                type="text"
                                name="detailAddress"
                                placeholder="Ví dụ: 01,Võ Văn Ngân, Tp.Hồ Chí Minh"
                                className={`form-control ${formik.touched.detailAddress && formik.errors.detailAddress ? "border-danger": ""}`} 
                                onChange={(e) => onChangeDetailAddress(e,formik)}
                            />
                            
                            <small className="form-text text-danger">{formik.touched.detailAddress && formik.errors.detailAddress}</small>
                        </div>
                    </div>
                    <div className="row w-100">
                        <div className="col">
                            <div className="yee-required">
                                <label htmlFor="deliveryUnit" className="form-label mb-0 text-14">Đơn vị vận chuyển</label>
                                <select name="" className="form-control form-select" onChange={(e) => onChangeDelivery(e)} id="deliveryUnit">
                                    {checkoutForm.deliveryUnits && checkoutForm.deliveryUnits.map((d,index) => (
                                        <option key={index} value={d.deliveryUnitId} >
                                            {d.deliveryUnitNm}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="yee-required">
                                <label htmlFor="deliveryUnit" className="form-label mb-0 text-14">Dịch vụ vận chuyển</label>
                                <select name="" className="form-control form-select" onChange={(e) => onChangeDeliveryService(e)} id="deliveryUnit">
                                    {checkoutForm.deliveryServices && checkoutForm.deliveryServices.map((d,index) => (
                                        <option key={index} value={d.serviceId} >
                                            {d.serviceNm}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row w-100">
                      <div className="col">
                          <div className="yee-required">
                              <label htmlFor="payMethod" className="form-label mb-0 text-14">Phương thức thanh toán</label>
                              <select name="" className="form-control form-select" onChange={(e) => onChangePayMethod(e)} id="payMethod">
                                  {checkoutForm.payMents && checkoutForm.payMents.map((p,index) => (
                                      <option key={index} value={p.payId} >
                                          {p.payNm}
                                      </option>
                                  ))}
                              </select>
                          </div>
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="col">
                        <textarea className="form-control" onChange={(e) => {onChangeNote(e)}} value={checkoutForm.note} id="textArea" rows="3" placeholder="Ghi chú v.v"></textarea>
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/cart" className="text-dark">
                          <BiArrowBack className="me-2" />
                          Về Giỏ Hàng
                        </Link>
                        <button type="submit" className={`button`} >
                          Đặt Hàng
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md col-sm w-100">
                <div className="border-bottom py-4">
                  {cartItems && cartItems.map((item,index) => (
                  <div key={index} className={`d-flex gap-10 mb-2 align-align-items-center`}>
                    <div className="w-100 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: "4px", right: "2px" }}
                          className="badge bg-primary text-white yee-wd-17 rounded-circle position-absolute"
                        >
                          {item.orderQty}
                        </span>
                        <img
                          className="img-fluid"
                          src={item.image}
                          alt="product"
                        />
                      </div>
                      <div>
                        <p className="title yee-text-fw-bold">
                          {item.productNm}
                        </p>
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center">
                            <h6 className="text-14">Màu sắc</h6>
                            <h6 className="total text-14">{item.productColor}</h6>
                          </div>    
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="text-14">Đơn giá</h6>
                            <h6 className="total text-14">{item.unitPrice}</h6>
                          </div>
                          { item.discount !== "0" && item.sales !== null &&
                            <div className="mb-1">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="d-flex flex-column">
                                        <h6 className="text-14 mb-0">Chương trình khuyến mãi</h6>
                                        <small className="text-12 color-primary">{item.sales.saleNm} giảm {item.discount} %</small>
                                    </div>
                                    <h6 className="total text-14">{item.discount} %</h6>
                                </div>
                                <div className="d-flex flex-column">
                                    <small className="text-12 color-primary">{item.sales.saleDescription}</small>
                                </div>
                            </div>
                          }
                          { item.discount === "0" && item.sales !== null &&
                                <div className="mb-1">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="d-flex flex-column">
                                            <h6 className="text-14 mb-0">Chương trình khuyến mãi</h6>
                                            <small className="text-12 color-primary">{item.sales.saleNm}</small>
                                        </div>
                                        <div className="input-group w-50 mb-1">
                                            <input type="text" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                            <button className="btn btn-outline-secondary" type="button" id="button-addon1">Dùng</button>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <small className="text-12 color-primary">{item.sales.saleDescription}</small>
                                    </div>
                                    
                                </div>
                            }
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="text-14">Giá mới</h6>
                            <h6 className="total text-14">{item.newPrice}</h6>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="text-14">Tạm tính</h6>
                            <h6 className="total text-14">{item.tempPrice}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
                <div className="border-bottom py-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="total">Tạm Tính</p>
                    <p className="total-price yee-text-fw-bold">{checkoutForm.tempPriceTotal}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 total">Vận Chuyển</p>
                    <p className="mb-0 total-price">{checkoutForm.deliveryFee}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center py-4">
                  <h4 className="total">Tổng Thanh Toán</h4>
                  <h5 className="total-price text-danger">{checkoutForm.totalPrice}</h5>
                </div>
              </div>
            </div>
          </Container>
      }
      <YeeToastMsg/>
    </>
  );
};

export default Checkout;
