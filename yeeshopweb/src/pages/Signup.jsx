import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { YeeCap,YeeUI } from "../constants/YeeCapConstants";
import * as Yup from "yup";
import { useFormik } from "formik";
import { registerAccount } from "../api/AuthApi";
const Signup = () => {

  // regex for special character
  const pwRegExp = YeeCap.REGEX_STR.NOT_SPECIAL_CHAR;

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
    passWord: Yup.string().required(YeeCap.PASSWORD.EMPTY_PW)
              .min(6,YeeCap.PASSWORD.MIN_6).max(20, YeeCap.PASSWORD.MAX_20)
              .matches(pwRegExp, YeeCap.PASSWORD.SPECIAL_CHAR_PW),
    confirmPassword: Yup.string().required(YeeCap.PASSWORD.EMPTY_PW)
              .min(6,YeeCap.PASSWORD.MIN_6).max(20, YeeCap.PASSWORD.MAX_20)
              .matches(pwRegExp, YeeCap.PASSWORD.SPECIAL_CHAR_PW).oneOf([Yup.ref("passWord")], YeeCap.PASSWORD.NOT_MATCH),
  });

  // validate 
  const formik = useFormik({

    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      passWord: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      signUp(values);
    },
  });

  async function signUp(values) {
    
      await registerAccount(values)
              .then(
                 res => {
                  console.log(res);
                 }
              ).catch(
                err => {
                  console.log("FAILED")
                }
              )
  }
  return (
    <>
      <Meta title={YeeUI.YEE_CAP_SIGNUP.SIGN_UP_TITLE} />
      <BreadCrumb title={YeeUI.YEE_CAP_SIGNUP.SIGN_UP_TITLE} />
      <Container class1="login-wrapper pb-2 home-wrapper-2">
        <div className="row yee-br-none">
          <div className="col-12">
            <div className="auth-card signup-card pt-1">
              <div className="signup-exist">
                <p>{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_SUB_TILTE}</p><Link to={"/login"}>{YeeUI.YEE_CAP_LOGIN.LOGIN_TITLE}</Link>
              </div>
              <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                {/* infor input */}
                <h3 className="border-bottom">{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_YOUR_INFO}</h3>
                <div className="form-group required">
                  <label className="w-25 px-0">{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_FULL_NM}</label>
                  <div className="d-flex flex-column">
                    <CustomInput className={`input-control ${formik.touched.fullName && formik.errors.fullName ? "border-danger": ""}`} type="text" name="fullName" placeholder="" onChange={(e) => {formik.values.fullName = e.target.value; formik.handleChange(e)}} autoComplete="true"/>
                    <small className="form-text text-danger ms-3">{formik.touched.fullName && formik.errors.fullName}</small>
                  </div>
                </div>

                <div className="form-group required" >
                  <label className="w-25 px-0">{YeeUI.YEE_CAP_LOGIN.LOGIN_EMAIL}</label>
                  <div className="d-flex flex-column">
                    <CustomInput 
                      type="email" 
                      className={`input-control ${formik.touched.email && formik.errors.email ? "border-danger": ""}`} 
                      name="email" 
                      placeholder="" 
                      onChange={(e) => {formik.values.email = e.target.value; formik.handleChange(e)}} 
                      autoComplete="true"/>
                    <small className="form-text text-danger ms-3">{formik.touched.email && formik.errors.email}</small>
                  </div>
                </div>
                <div className="form-group required" >
                  <label className="w-25 px-0">{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_PHONE}</label>
                  <div className="d-flex flex-column">
                    <CustomInput
                      className={`input-control ${formik.touched.email && formik.errors.email ? "border-danger": ""}`}
                      type="tel"
                      name="phone"
                      placeholder=""
                      autoComplete="true"
                      onChange={(e) => {formik.values.phone = e.target.value; formik.handleChange(e)}}
                      />
                      <small className="form-text text-danger ms-3">{formik.touched.phone && formik.errors.phone}</small>
                    </div>
                </div>
                <h3 className="border-bottom mb-3">{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_YOUR_PW}</h3>
                <div className="form-group required" >
                  <label className="w-25 px-0">{YeeUI.YEE_CAP_LOGIN.LOGIN_PASSWORD}</label>
                  <div className="d-flex flex-column">
                    <CustomInput
                      className={`input-control ${formik.touched.passWord && formik.errors.passWord ? "border-danger": ""}`}
                      type="password"
                      name="passWord"
                      placeholder=""
                      autoComplete="true"
                      onChange={(e) => {formik.values.passWord = e.target.value; formik.handleChange(e)}}
                      />
                    <small className="form-text text-danger ms-3">{formik.touched.passWord && formik.errors.passWord}</small>
                  </div>
                </div>
                <div className="form-group required" >
                  <label className="w-25 px-0">{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_CONFIRM_PW}</label>
                  <div className="d-flex flex-column">
                    <CustomInput
                    className={`input-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-danger": ""}`}
                    type="password"
                    name="confirmPassword"
                    placeholder=""
                    autoComplete="true"
                    onChange={(e) => {formik.values.confirmPassword = e.target.value; formik.handleChange(e)}}
                    />
                    <small className="form-text text-danger ms-3">{formik.touched.confirmPassword && formik.errors.confirmPassword}</small>
                  </div>
                  
                </div>
                {/* end password input */}
                {/* <h3 className="border-bottom mb-3">Hình Ảnh</h3>
                <div className="form-group required" >
                  <label className="w-25 px-0">Hình Ảnh: </label>
                  <CustomInput
                  type="file"
                  name="photo" 
                />
                </div> */}
                <div >
                  <div className="mt-3 d-flex justify-content-sm-end align-items-center p-3">
                    <button type="submit" className="button">{YeeUI.YEE_CAP_SIGNUP.SIGN_UP_TITLE}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
