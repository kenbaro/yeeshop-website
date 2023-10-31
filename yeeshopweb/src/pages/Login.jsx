import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { YEE_TOKEN } from "../constants/YeeConst";
const Login = () => {

  const navigate = useNavigate();
  // props of Modal
  const [modalProps, setModalProps] = useState({

    type : "ERROR_MODAL",
    errCap: "YeeShop ERROR",
    errTitle: "Đăng nhập không thành công!",
    errMessage: "",
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

          setModalProps((prevState) => ({...prevState, errMessage: loginResponse.data.messages[0].messageTitle}));

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

  // get login function
  async function loadData() {

    if (localStorage.getItem(YEE_TOKEN.ACCESS_TOKEN)) {

      localStorage.removeItem(YEE_TOKEN.ACCESS_TOKEN);
    } 
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Meta title={YeeUI.YEE_CAP_LOGIN.LOGIN_TITLE} />
      <BreadCrumb title={YeeUI.YEE_CAP_LOGIN.LOGIN_TITLE} />
      <Container class1="login-wrapper mb-2 home-wrapper-2">
        <div className="row yee-br-none pb-3">
          <div className="col-sm col-md logo-col">
            <div className="border-frame">
              <img className="login-img-logo" src={biglogo} alt=""></img>
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
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                        <label className="form-check-label text-14" htmlFor="flexSwitchCheckDefault">{YeeUI.YEE_CAP_LOGIN.LOGIN_SAVE_INFO}</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" onClick={(e) => showPassword(e)} id="showPwChkbox"/>
                        <label className="form-check-label text-14" htmlFor="showPwChkbox">{YeeUI.YEE_CAP_LOGIN.LOGIN_SHOW_PW}</label>
                    </div>
                  </div>
                  <div>
                    <Link to="/forgot-password">{YeeUI.YEE_CAP_LOGIN.LOGIN_FORGOT_PW}</Link>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button" type="submit">{YeeUI.YEE_CAP_LOGIN.LOGIN_TITLE}</button>
                      <Link to="/signup" className="button signup">{YeeUI.YEE_CAP_LOGIN.LOGIN_SIGNUP}</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <YeeModal modalProps = {modalProps}/>
    </>
  );
};

export default Login;
