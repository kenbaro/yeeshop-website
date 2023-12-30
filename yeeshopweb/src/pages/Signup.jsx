// import React from "react";
// import BreadCrumb from "../components/BreadCrumb";
// import Meta from "../components/Meta";
// import { Link, useNavigate } from "react-router-dom";
// import Container from "../components/Container";
// import CustomInput from "../components/CustomInput";
// import { YeeCap,YeeUI } from "../constants/YeeCapConstants";
// import * as Yup from "yup";
// import { useFormik } from "formik";
// import { registerAccount } from "../api/AuthApi";
// import { showToastMessage, YeeToastMsg } from "../components/YeeToastMsg";
// import { YEE_MSG_TYPE } from "../constants/YeeConst";
// const Signup = () => {

//   // regex for special character
//   const pwRegExp = YeeCap.REGEX_STR.NOT_SPECIAL_CHAR;

//   const telRegExp = YeeCap.REGEX_STR.NOT_PHONE_NUMBER;
//   // create validate schema
//   let schema = Yup.object().shape({
//     fullName: Yup.string().required(YeeCap.FULLNM.EMPTY_NM),
//     email: Yup
//       .string()
//       .email(YeeCap.EMAIL.INVALID_FORMAT_EMAIL)
//       .required(YeeCap.EMAIL.EMPTY_EMAIL),
//     phone: Yup.string().required(YeeCap.PHONE.EMPTY_PHONE).matches(telRegExp, YeeCap.PHONE.NOT_NUMBER)
//                 .length(10, YeeCap.PHONE.LENGTH_10),
//     passWord: Yup.string().required(YeeCap.PASSWORD.EMPTY_PW)
//               .min(6,YeeCap.PASSWORD.MIN_6).max(20, YeeCap.PASSWORD.MAX_20)
//               .matches(pwRegExp, YeeCap.PASSWORD.SPECIAL_CHAR_PW),
//     confirmPassword: Yup.string().required(YeeCap.PASSWORD.EMPTY_PW)
//               .min(6,YeeCap.PASSWORD.MIN_6).max(20, YeeCap.PASSWORD.MAX_20)
//               .matches(pwRegExp, YeeCap.PASSWORD.SPECIAL_CHAR_PW).oneOf([Yup.ref("passWord")], YeeCap.PASSWORD.NOT_MATCH),
//   });

//   // validate 
//   const formik = useFormik({

//     initialValues: {
//       fullName: "",
//       email: "",
//       phone: "",
//       passWord: "",
//       confirmPassword: "",
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       signUp(values);
//     },
//   });

//   const navigate = useNavigate();
//   async function signUp(values) {
    
//       await registerAccount(values)
//               .then(
//                   res => {
//                       if(!res.data.isError) {
//                         navigate("/send-otp/"+res.data , {state:{valid: true}});
//                       } else {
//                         showToastMessage(res.data.messages[0].messageTitle, YEE_MSG_TYPE.MSG_ERROR,false);
//                       }
//                   }
//               ).catch(
//                 err => {
//                   console.log("FAILED")
//                 }
//               )
//   }
//   return (
//     <>
//       <Meta title={YeeUI.YEE_CAP_SIGNUP.SIGN_UP_TITLE} />
//       <BreadCrumb title={YeeUI.YEE_CAP_SIGNUP.SIGN_UP_TITLE} />
//       <Container class1="login-wrapper pb-2 home-wrapper-2">
//         <div className="row yee-br-none">
//           <div className="col-12">
//             <div className="auth-card signup-card pt-1">
//               <div className="signup-exist">
//                 <p>{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_SUB_TILTE}</p><Link to={"/login"}>{YeeUI.YEE_CAP_LOGIN.LOGIN_TITLE}</Link>
//               </div>
//               <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
//                 {/* infor input */}
//                 <h3 className="border-bottom">{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_YOUR_INFO}</h3>
//                 <div className="required">
//                   <label className="w-25 px-0">{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_FULL_NM}</label>
//                   <div className="d-flex flex-column">
//                     <CustomInput className={`input-control ${formik.touched.fullName && formik.errors.fullName ? "border-danger": ""}`} type="text" name="fullName" placeholder="" onChange={(e) => {formik.values.fullName = e.target.value; formik.handleChange(e)}} autoComplete="true"/>
//                     <small className="form-text text-danger ms-3">{formik.touched.fullName && formik.errors.fullName}</small>
//                   </div>
//                 </div>

//                 <div className="required" >
//                   <label className="w-25 px-0">{YeeUI.YEE_CAP_LOGIN.LOGIN_EMAIL}</label>
//                   <div className="d-flex flex-column">
//                     <CustomInput 
//                       type="email" 
//                       className={`input-control ${formik.touched.email && formik.errors.email ? "border-danger": ""}`} 
//                       name="email" 
//                       placeholder="" 
//                       onChange={(e) => {formik.values.email = e.target.value; formik.handleChange(e)}} 
//                       autoComplete="true"/>
//                     <small className="form-text text-danger ms-3">{formik.touched.email && formik.errors.email}</small>
//                   </div>
//                 </div>
//                 <div className="required" >
//                   <label className="w-25 px-0">{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_PHONE}</label>
//                   <div className="d-flex flex-column">
//                     <CustomInput
//                       className={`input-control ${formik.touched.email && formik.errors.email ? "border-danger": ""}`}
//                       type="tel"
//                       name="phone"
//                       placeholder=""
//                       autoComplete="true"
//                       onChange={(e) => {formik.values.phone = e.target.value; formik.handleChange(e)}}
//                       />
//                       <small className="form-text text-danger ms-3">{formik.touched.phone && formik.errors.phone}</small>
//                     </div>
//                 </div>
//                 <h3 className="border-bottom mb-3">{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_YOUR_PW}</h3>
//                 <div className="required" >
//                   <label className="w-25 px-0">{YeeUI.YEE_CAP_LOGIN.LOGIN_PASSWORD}</label>
//                   <div className="d-flex flex-column">
//                     <CustomInput
//                       className={`input-control ${formik.touched.passWord && formik.errors.passWord ? "border-danger": ""}`}
//                       type="password"
//                       name="passWord"
//                       placeholder=""
//                       autoComplete="true"
//                       onChange={(e) => {formik.values.passWord = e.target.value; formik.handleChange(e)}}
//                       />
//                     <small className="form-text text-danger ms-3">{formik.touched.passWord && formik.errors.passWord}</small>
//                   </div>
//                 </div>
//                 <div className="required" >
//                   <label className="w-25 px-0">{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_CONFIRM_PW}</label>
//                   <div className="d-flex flex-column">
//                     <CustomInput
//                     className={`input-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-danger": ""}`}
//                     type="password"
//                     name="confirmPassword"
//                     placeholder=""
//                     autoComplete="true"
//                     onChange={(e) => {formik.values.confirmPassword = e.target.value; formik.handleChange(e)}}
//                     />
//                     <small className="form-text text-danger ms-3">{formik.touched.confirmPassword && formik.errors.confirmPassword}</small>
//                   </div>
                  
//                 </div>
//                 {/* end password input */}
//                 {/* <h3 className="border-bottom mb-3">Hình Ảnh</h3>
//                 <div className="required" >
//                   <label className="w-25 px-0">Hình Ảnh: </label>
//                   <CustomInput
//                   type="file"
//                   name="photo" 
//                 />
//                 </div> */}
//                 <div >
//                   <div className="mt-3 d-flex justify-content-sm-end align-items-center p-3">
//                     <button type="submit" className="button">{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_TITLE}</button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </Container>
//       <YeeToastMsg/>
//     </>
//   );
// };

// export default Signup;

import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import { ToastContainer } from "react-toastify";
// import { getUserInfo, updateAdminInfo } from "../api/CustomerApi";
import {Link, useNavigate} from "react-router-dom"
import {uploadImage} from "../api/UploadApi";
import * as yup from "yup";
import { useFormik } from "formik";
import { YeeCap } from "../constants/YeeCapConstants";
import dayjs from 'dayjs';
import { toast } from "react-toastify";
import { Radio } from 'antd';
import { getAddress } from "../api/AddressApi";
import { addNewUser } from "../api/AuthApi";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { YeeUI } from "../constants/YeeCapConstants";
import YeeLoader from "../components/YeeLoader";

const SignUp = () => {

    const dateFormat = 'YYYY-MM-DD';
    const navigate = useNavigate();

    const [excuteOK,setExecuteOK] = useState(false);
    const [imageSelected, setImageSelected] = useState("");
    const [loading,setLoading] = useState(false);
    const [addressObj,setAddressObj] = useState({
        provinceNm : "",
        districtNm : "",
        wardNm : "",
    }); 

    // regex for special character
    const pwRegExp = YeeCap.REGEX_STR.NOT_SPECIAL_CHAR;

    const telRegExp = YeeCap.REGEX_STR.NOT_PHONE_NUMBER;
    let schema = yup.object().shape({
        fullNm: yup.string().required(YeeCap.FULLNM.EMPTY_NM),
        phone: yup.string().required(YeeCap.PHONE.EMPTY_PHONE).matches(telRegExp, YeeCap.PHONE.NOT_NUMBER)
        .length(10, YeeCap.PHONE.LENGTH_10),
        hamlet: yup.string().required("Địa chỉ cụ thể không được trống"),
        provinceCd: yup.string().required("Tỉnh/Thành phố không được trống"),
        districtCd: yup.string().required("Quận/Huyện không được trống"),
        wardCd: yup.string().required("Phường/Xã không được trống"),
        gender: yup.string().required("Bạn chưa chọn giới tính"),
        role: yup.string().required("Bạn chưa chọn phân loại người dùng"),
        email:yup.string().email(YeeCap.EMAIL.INVALID_FORMAT_EMAIL).required(YeeCap.EMAIL.EMPTY_EMAIL),
        passWord: yup.string().required(YeeCap.PASSWORD.EMPTY_PW).min(6,YeeCap.PASSWORD.MIN_6).max(20, YeeCap.PASSWORD.MAX_20).matches(pwRegExp, YeeCap.PASSWORD.SPECIAL_CHAR_PW),
        // confirmPassword: yup.string().required(YeeCap.PASSWORD.EMPTY_PW)
        //       .min(6,YeeCap.PASSWORD.MIN_6).max(20, YeeCap.PASSWORD.MAX_20)
        //       .matches(pwRegExp, YeeCap.PASSWORD.SPECIAL_CHAR_PW).oneOf([yup.ref("passWord")], YeeCap.PASSWORD.NOT_MATCH),
      });

    const onchangeFile = (e) => {
        setImageSelected(()=> e.target.files[0]);
    }
    const onChangeProvince =  (e) => {
        formik.handleChange(e);

        formik.setFieldValue("initState",false);
        formik.setFieldValue("districtCd", "");
        formik.setFieldValue("districts",[]);
        formik.setFieldValue("wardCd", "");
        formik.setFieldValue("wards",[]);
        getAddressApi(e.target.value,"");
    };

    const onChangeDistrict = (e) => {
        formik.handleChange(e);
        formik.setFieldValue("initState",false);
        formik.setFieldValue("wards",[]);
        getAddressApi(formik.values.provinceCd,e.target.value);

    };

    const onChangeWard = (e) => {
        formik.setFieldValue("initState",false);
        formik.handleChange(e);
    };

    const [isShow,setIsShow] = useState(false);
    const showPw = (e) => {

        e.target.checked ? setIsShow(() => true) : setIsShow(() => false);
    }
    const addNewUserApi = async (data) => {
        setLoading(true);
        await addNewUser(data).then(
            
            res => {
                setExecuteOK(true);
                toast.success(res.data, {duration: 3000});
            }
        ).catch(
            err => {

                toast.error(err.response.data, {duration: 3000});
            }
        ).finally(
            
            ()=> {

                setLoading(false);
            }
        );
    }
    const uploadImageApi = async (formData, values) => {
        setLoading(true);
        await uploadImage(formData).then(
            res => {
                values.userAvatar = res.data.url;
                addNewUserApi(values);
        }).catch(
            err=> {
                toast.error("Không thể upload ảnh, vui lòng chọn lại ảnh và thử lại!",{autoClose: 2500})
            }
        ).finally(

            () => {
                setLoading(false);
            }
        );
    }
    // validate 
    const formik = useFormik({

        initialValues: {
            fullNm:"",
            email:"",
            userBirth: new Date().toJSON().slice(0,10),
            userAvatar:"http://res.cloudinary.com/xiaoyi/image/upload/v1701550617/user_bcbxeg.png",
            phone:"",
            passWord:"",
            //confirmPassWord:"",
            gender:0,
            role:3,
            provinceCd:"",
            wardCd:"",
            districtCd:"",
            hamlet:"",
            provinces: [],
            districts: [],
            wards: [],
            initState:true,
        },
        enableReinitialize:true,
        validationSchema: schema,
        onSubmit: (values) => {

            if ("" !== imageSelected) {

                const formData= new FormData();
                formData.append("file",imageSelected);
                formData.append("upload_preset","avatar-image");
                uploadImageApi(formData,values);
                console.log(values); 
            } else {

                addNewUserApi(values);
            }
             
        },
    });
    const getAddressApi = async (provinceCd,districtCd) => {

        setLoading(true);
        await getAddress(provinceCd,districtCd).then(
            res => {
                formik.setFieldValue("provinces",res.data.provinces);
                formik.setFieldValue("districts",res.data.districts);
                formik.setFieldValue("wards",res.data.wards);
                let wardCd = formik.values.wardCd;
                provinceCd = formik.values.provinceCd;
                districtCd = formik.values.districtCd;
                if (formik.values.initState) {

                    if (formik.values.provinceCd === "") {

                        formik.setFieldValue("provinceCd",res.data.provinces[0].provinceID);
                        provinceCd = res.data.provinces[0].provinceID;
                    }

                    if (formik.values.districtCd === "") {

                        formik.setFieldValue("districtCd",res.data.districts[0].districtID);
                        districtCd = res.data.districts[0].districtID;
                    }

                }
                
                if (formik.values.wardCd === "") {

                    formik.setFieldValue("wardCd",res.data.wards[0].wardId);
                    wardCd = res.data.wards[0].wardId;
                }
                let i = 0;
                console.log(provinceCd);
                for (i =0; i < res.data.provinces.length; i++) {
                    if (Number(res.data.provinces[i].provinceID) === Number(provinceCd)) {

                        const provinceName = res.data.provinces[i].provinceName;
                        addressObj.provinceNm = provinceName;
                        setAddressObj((prev) => ({...prev}));
                    }
                }

                for (i =0 ;i < res.data.districts.length; i++) {
                    if (Number(res.data.districts[i].districtID) === Number(districtCd)) {

                        const districtNm = res.data.districts[i].districtName;
                        addressObj.districtNm = districtNm;
                        setAddressObj((prev) => ({...prev}));
                    }
                }
                for (i =0 ;i < res.data.wards.length; i++) {
                    if (Number(res.data.wards[i].wardId) === Number(wardCd)) {
                        const wardNm = res.data.wards[i].wardNm;
                        addressObj.wardNm = wardNm;
                        setAddressObj((prev) => ({...prev}));
                    }
                }
            }
        ).catch(
            err=> {


            }
        ).finally(
            () => {
                setLoading(false);
            }
        )
    }
    useEffect(()=>{

        getAddressApi(formik.values.provinceCd,formik.values.districtCd);
        
    },[])
    return (
    
    <>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <div className="container mb-5">
            <Meta title={YeeUI.YEE_CAP_SIGNUP.SIGN_UP_TITLE} />
            <BreadCrumb title={YeeUI.YEE_CAP_SIGNUP.SIGN_UP_TITLE} />
            <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="account-settings">
                                <div className="user-profile mb-0">
                                    <div className="user-avatar">
                                        <img src={imageSelected === "" ? formik.values.userAvatar : URL.createObjectURL(imageSelected)} alt="Xiao Yi Admin"/>
                                    </div>
                                    <h5 className="user-name">{formik.values.fullNm}</h5>
                                    <h6 className="user-email">{formik.values.email}</h6>
                                </div>
                                <div className="about2">
                                    <div className={`d-flex justify-content-center mb-4 ${excuteOK ? "d-none" :""}`}>
                                        <div className={`btn btn-primary yee-pointer bg-primary border-0 yee-br-8px ${excuteOK ? "disable" :""}`}>
                                            <label className="form-label text-white m-1 yee-pointer" htmlFor="customFile1">Chọn ảnh</label>
                                            <input type="file" name="userAvatar" className="form-control d-none yee-pointer" id="customFile1" onChange={(e) => onchangeFile(e)} />
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters mb-2">

                                  <div className="signup-exist">
                                    <p>{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_SUB_TILTE} <Link className="color-primary" to={"/login"}>{YeeUI.YEE_CAP_LOGIN.LOGIN_TITLE}</Link></p>
                                  </div>
                                </div>
                                <div className="row gutters mb-2">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-2 color-primary">Thông tin chi tiết</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="yee-required">
                                            <label htmlFor="phone">Email</label>
                                            <input type="text" className={`form-control ${formik.touched.email && formik.errors.email ? "border-danger": ""} ${excuteOK ? "disable" :""}`} name="email" id="email" value={formik.values.email} onChange={(e)=> {formik.handleChange(e)}} placeholder="Ví dụ: abc@gmail.com"/>
                                            <small className="form-text text-danger">{formik.touched.email && formik.errors.email}</small>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="yee-required">
                                            <label htmlFor="fullName" >Họ tên</label>
                                            <input type="text" className={`form-control ${formik.touched.fullNm && formik.errors.fullNm ? "border-danger": ""} ${excuteOK ? "disable" :""}`} name="fullNm" id="fullName" value={formik.values.fullNm} onChange={(e)=> {formik.handleChange(e)}} placeholder="Ví dụ: Thái Duy Bảo"/>
                                            <small className="form-text text-danger">{formik.touched.fullNm && formik.errors.fullNm}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters mb-2">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="yee-required">
                                            <label htmlFor="dateBirth">Ngày sinh</label>
                                            <DatePicker 
                                                className={`form-control ${excuteOK ? "disable" :""}`}
                                                format={dateFormat} 
                                                allowClear={false} 
                                                id="userBirth" 
                                                name="userBirth" 
                                                value={formik.values.userBirth ? dayjs(formik.values.userBirth, dateFormat): dayjs()}  
                                                onChange={
                                                    date=> {
                                                    const dateStr = new Date(date).toLocaleDateString("en-CA");
                                                    formik.setFieldValue('userBirth', dateStr);}} 
                                                placeholder=" Ví dụ: 2023-01-01"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="yee-required">
                                            <label htmlFor="phone">Số điện thoại</label>
                                            <input type="text" className={`form-control ${formik.touched.phone && formik.errors.phone ? "border-danger": ""} ${excuteOK ? "disable" :""}`} name="phone" id="phone" value={formik.values.phone} onChange={(e)=> {formik.handleChange(e)}} placeholder="Ví dụ: 0812200898"/>
                                            <small className="form-text text-danger">{formik.touched.phone && formik.errors.phone}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters align-items-center">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="yee-required mb-1">
                                            <label htmlFor="phone">Mật khẩu</label>
                                            <input type={`${isShow ? 'text' : 'password'}`} className={`form-control ${formik.touched.passWord && formik.errors.passWord ? "border-danger": ""} ${excuteOK ? "disable" :""} ${excuteOK ? "disable" :""}`} name="passWord" id="passWord" value={formik.values.passWord} onChange={(e)=> {formik.handleChange(e)}} placeholder="Nhập mật khẩu"/>
                                            <small className="form-text text-danger">{formik.touched.passWord && formik.errors.passWord}</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" onChange={(e) => showPw(e)} type="checkbox" id="showPw"/>
                                            <label className="form-check-label" htmlFor="showPw">Hiện mật khẩu</label>
                                        </div>
                                    </div>
                                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="yee-required mb-1">
                                            <label htmlFor="phone">Nhập lại mật khẩu</label>
                                            <input type={`${isShow ? 'text' : 'password'}`} className={`form-control ${formik.touched.confirmPassWord && formik.errors.confirmPassWord ? "border-danger": ""} ${excuteOK ? "disable" :""} ${excuteOK ? "disable" :""}`} name="confirmPassWord" id="confirmPassWord" value={formik.values.confirmPassWord} onChange={(e)=> {formik.handleChange(e)}} placeholder="Nhập lại mật khẩu"/>
                                            <small className="form-text text-danger">{formik.touched.confirmPassWord && formik.errors.confirmPassWord}</small>
                                        </div>
                                        <div className="form-check form-switch">
                                            
                                        </div>
                                    </div> */}
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="mb-1 yee-required">
                                            <label htmlFor="gender">Giới tính</label>
                                        </div>
                                        <Radio.Group value={formik.values.gender} onChange={(e) => formik.handleChange(e)} disabled={excuteOK} id="gender" name="gender" buttonCheckedBg="#be1e2d" buttonStyle="solid">
                                            <Radio.Button value={0}>Nam</Radio.Button>
                                            <Radio.Button value={1}>Nữ</Radio.Button>
                                        </Radio.Group>
                                        <div className="form-check form-switch"></div>
                                    </div>
                                </div>
                                {/* <div className="row gutters align-items-center">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="mb-1 yee-required">
                                            <label htmlFor="gender">Giới tính</label>
                                        </div>
                                        <Radio.Group value={formik.values.gender} onChange={(e) => formik.handleChange(e)} disabled={excuteOK} id="gender" name="gender" buttonCheckedBg="#be1e2d" buttonStyle="solid">
                                            <Radio.Button value={0}>Nam</Radio.Button>
                                            <Radio.Button value={1}>Nữ</Radio.Button>
                                        </Radio.Group>
                                        <div className="form-check form-switch"></div>
                                    </div>
                                </div> */}
                                <div className="row gutters mb-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mt-3 mb-2 color-primary">Địa chỉ</h6>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                        <div className="yee-required">
                                            <label htmlFor="province">Tỉnh/Thành phố</label>
                                            <select className={`form-select ${excuteOK ? "disable" :""}`} aria-label="province" name="provinceCd" value={formik.values.provinceCd} onChange = {(e) => {onChangeProvince(e);}}>
                                                {formik.values.provinces !== null && formik.values.provinces !== undefined && formik.values.provinces.map((p,index) => (
                                                    <option key={index} value={p.provinceID}>
                                                        {p.provinceName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                        <div className="yee-required">
                                            <label htmlFor="district">Quận/Huyện</label>
                                            <select className={`form-select ${excuteOK ? "disable" :""}`} name="districtCd" value={formik.values.districtCd} onChange={(e) => onChangeDistrict(e)} aria-label="district">
                                            {formik.values.districts !== null && formik.values.districts !== undefined && formik.values.districts.map((p,index) => (
                                                    <option key={index} value={p.districtID}>
                                                        {p.districtName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                        <div className="yee-required">
                                            <label htmlFor="ward">Phường/Xã</label>
                                            <select className={`form-select ${excuteOK ? "disable" :""}`} name="wardCd" value={formik.values.wardCd} onChange={(e) => onChangeWard(e)} aria-label="ward">
                                                {formik.values.wards !== null && formik.values.wards !== undefined && formik.values.wards.map((p,index) => (
                                                    <option key={index} value={p.wardId}>
                                                        {p.wardNm}
                                                    </option>
                                                ))}
                                            </select>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters mb-4">
                                    <div className="col-xl col-lg col-md col-sm col">
                                        <div className="yee-required">
                                            <label htmlFor="hamlet">Địa chỉ cụ thể: </label>
                                            <input type="text" className={`form-control ${formik.touched.hamlet && formik.errors.hamlet ? "border-danger": ""} ${excuteOK ? "disable" :""}`} name="hamlet" id="hamlet" value={formik.values.hamlet} onChange={(e)=> {formik.handleChange(e)}} placeholder="Ví dụ: 01, Võ Văn Ngân"/>
                                            <small className="form-text text-danger">{formik.touched.hamlet && formik.errors.hamlet}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    { !excuteOK ? 
                                        <div className="text-right d-flex justify-content-end">
                                            
                                            <Link type="button" id="cancel" name="cancel" className="btn btn-secondary" to="/admin/customers">Huỷ</Link>
                                            <button type="button" id="submit" data-bs-target="#signUpModal" data-bs-toggle="modal" name="submit" className="btn btn-primary yee-pointer bg-primary border-0 ms-3">Đăng ký</button>
                                        </div>
                                        :
                                        <div className="text-right d-flex justify-content-end">
                                            
                                            <Link type="button" id="cancel" name="cancel" className="btn btn-secondary" to="/login">Quay về trang đăng nhập</Link>
                                        </div>
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="signUpModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                        <div className="modal-header pd-0 border-0">
                            <h5 className="modal-title color-primary">Xác nhận đăng ký tài khoản</h5>
                        </div>
                        <div className="modal-body py-0">
                            <span>Xác nhận đăng ký tài khoản</span>
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
 
                            <button type="submit"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-backdrop="false"
                              className="button">
                                Đăng ký
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </form>
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
       <YeeLoader loading= {loading} />
    </>
        
    );

}

export default SignUp;
