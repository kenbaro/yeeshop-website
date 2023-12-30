import React, {useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import biglogo from "../images/LogoTitle192.png";
import { getSignIn } from "../api/AuthApi";
import { signIn } from "../api/AuthApi";
import YeeModal from "../components/YeeModal";
import * as Yup from "yup";
import { useFormik } from "formik";
import { YeeCap,YeeUI } from "../constants/YeeCapConstants";
import { YEE_MSG_TYPE, YEE_TOKEN } from "../constants/YeeConst";
import { showToastMessage, YeeToastMsg } from "../components/YeeToastMsg";
import {getSocialLoginUrl} from "../utils/Helpers";
const Login = () => {

  const navigate = useNavigate();

  const location = useLocation();

  // props of Modal
  const [modalProps, setModalProps] = useState({

    type : "ERROR_MODAL",
    errCap: "YeeShop ERROR",
    errTitle: "Đăng nhập không thành công!",
    errMessage: "",
    errId:"",
    mail:"",
  })

  // show password function
  const showPassword = (e) => {

    if (e.target.checked) {

      // show password
      document.getElementById("password").type="text";
    } else {

      // hide password
      document.getElementById("password").type="password";
    } 
  }

  // regex for special character
  const pwRegExp = YeeCap.REGEX_STR.NOT_SPECIAL_CHAR;

  // create validate schema
  let schema = Yup.object().shape({
    email: Yup
      .string()
      .email(YeeCap.EMAIL.INVALID_FORMAT_EMAIL)
      .required(YeeCap.EMAIL.EMPTY_EMAIL),
    passWord: Yup.string().required(YeeCap.PASSWORD.EMPTY_PW)
              .min(6,YeeCap.PASSWORD.MIN_6).max(20, YeeCap.PASSWORD.MAX_20)
              .matches(pwRegExp,YeeCap.PASSWORD.SPECIAL_CHAR_PW),
  });

  // validate 
  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      login(values);
    },
  });
  
  // post login function
  const login = async (values) => {

    await signIn(values).then(
      loginResponse => {

        if (!loginResponse.data.isError) {

          // case server response successfully
          localStorage.setItem(YEE_TOKEN.ACCESS_TOKEN, loginResponse.data.bearerToken.accessToken);
  
          // direct to home page
          //navigate('/', {state: loginResponse.data.yeeHeaderDto});
          window.location = "/";
        } else {
          console.log(loginResponse.data)
          setModalProps((prevState) => ({...prevState, errMessage: loginResponse.data.messages[0].messageTitle, errId: loginResponse.data.messages[0].messageId,mail: formik.values.email}));
          let loginModal = document.getElementById("err_Modal");
          loginModal.style.display = "block";
          loginModal.classList.add("show");
          document.getElementById("backdrop").style.display="block";
          document.getElementById("backdrop").classList.add("show");
        }
       
      }
    ).catch(
        err => {

          alert("error:" + err)
        }
    )
  }

  const params = new URLSearchParams(window.location.search);
  // get login function
  async function loadData() {

    if (localStorage.getItem(YEE_TOKEN.ACCESS_TOKEN)) {

      localStorage.removeItem(YEE_TOKEN.ACCESS_TOKEN);
    }
    
    if (params.get("logoutMsg") !== undefined) {
  
      showToastMessage(params.get("logoutMsg"),YEE_MSG_TYPE.MSG_SUCCESS,false);
    }
  };

  useEffect(() => {
    loadData();
    if (location.state && location.state.message !== null && location.inModal !== null && location.type !== null) {
      const msg = location.state;
      showToastMessage(msg.message,msg.type,msg.inModal);
    }
  }, []);

  return (
    <>
      <Meta title={YeeUI.YEE_CAP_LOGIN.LOGIN_TITLE} />
      <BreadCrumb title={YeeUI.YEE_CAP_LOGIN.LOGIN_TITLE} />
      <Container class1="login-wrapper mb-2 home-wrapper-2">
        <div className="row yee-br-none pb-3">
          <div className="col-sm-8 col-md-8 logo-col">
            <div className="border-frame">
              <img className="login-img-logo" src={`https://didongviet.vn/icon/login/loginbg.png`} alt=""></img>
            </div>
          </div>
          <div className="col-sm col-md">
            <div className="border-frame">
              <div className="auth-card">
                <h3 className="text-center mb-3">{YeeUI.YEE_CAP_LOGIN.LOGIN_TITLE}</h3>
                <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-10">
                  <div className="yee-required">
                    <label htmlFor="email">{YeeUI.YEE_CAP_LOGIN.LOGIN_EMAIL}</label>
                    <CustomInput className={`input-control" ${formik.touched.email && formik.errors.email ? "border-danger": ""}`} type="text" id="email" name="email" title={YeeUI.YEE_CAP_LOGIN.LOGIN_EMAIL} placeholder="Email" onChange={(e) => {formik.values.email = e.target.value; formik.handleChange(e)}} autoComplete="true"/>
                    <small className="form-text text-danger">{formik.touched.email && formik.errors.email}</small>
                  </div>
                  <div className="yee-required">
                    <label className="control-label" htmlFor="password">{YeeUI.YEE_CAP_LOGIN.LOGIN_PASSWORD}</label>
                    <CustomInput className={`input-control ${formik.touched.passWord && formik.errors.passWord ? "border-danger": ""}`} type="passWord" id="password" title={YeeUI.YEE_CAP_LOGIN.LOGIN_PASSWORD} name="password" placeholder="Password" onChange={(e) => {formik.values.passWord = e.target.value; formik.handleChange(e)}} autoComplete="true"/>
                    <small className="form-text text-danger">{formik.touched.passWord && formik.errors.passWord}</small>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Link to="/forgot-password" className="">{YeeUI.YEE_CAP_LOGIN.LOGIN_FORGOT_PW}</Link>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" onClick={(e) => showPassword(e)} id="showPwChkbox"/>
                        <label className="form-check-label text-14" htmlFor="showPwChkbox">{YeeUI.YEE_CAP_LOGIN.LOGIN_SHOW_PW}</label>
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="mt-3 d-flex justify-content-between gap-15 align-items-center">
                      <button className="button w-100" type="submit">{YeeUI.YEE_CAP_LOGIN.LOGIN_TITLE}</button>
                    </div>
                    
                  </div>
                  <div>
                      <h6 className="or-text"><span>hoặc </span></h6>
                  </div>
                  <div className="d-flex flex-fill justify-content-between">
                    <div className="d-flex justify-content-start gap-15 align-items-center">
                      <a href={getSocialLoginUrl("google")} className="border-1 px-4 me-4 bg-transparent button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google color-primary" viewBox="0 0 16 16">
                          <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                        </svg> <span className="color-primary">Google</span> 
                      </a>
                    </div>
                    <div className="yee-ml-16 d-flex justify-content-start gap-15 align-items-center">
                        <a href={getSocialLoginUrl("facebook")} className="border-1 px-4 bg-transparent button-fb">
                          <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-facebook color-fb me-1" fill="#4267b2" width="16" height="16" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
                          <span className="color-fb">Facebook</span> 
                        </a>
                    </div>
                  </div>
                  <div className="mt-2 d-flex justify-content-end">
                      <span>Bạn chưa có tài khoản? <Link to="/signup" className="color-primary yee-text-fw-bold">{YeeUI.YEE_CAP_LOGIN.LOGIN_SIGNUP_NOW}</Link></span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <YeeModal modalProps = {modalProps}/>
      <YeeToastMsg/>
    </>
  );
};

export default Login;
