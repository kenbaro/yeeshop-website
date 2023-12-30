import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { sendMailForgotPassword } from "../api/AuthApi";
import { showToastMessage, YeeToastMsg } from "../components/YeeToastMsg";
import { YEE_MSG_TYPE } from "../constants/YeeConst";
import * as Yup from "yup";
import { YeeCap } from "../constants/YeeCapConstants";
import { useFormik } from "formik";
const Forgotpassword = () => {

  // create validate schema
  let schema = Yup.object().shape({
    email: Yup
      .string()
      .email(YeeCap.EMAIL.INVALID_FORMAT_EMAIL)
      .required(YeeCap.EMAIL.EMPTY_EMAIL),
  });

  const [isDisable, setIsDisable] = useState(false);
  // validate 
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      sendMail(values.email);
    },
  });
  const sendMail = async (value) => {

    showToastMessage("Mật khẩu mới sẽ được gửi vào email của bạn trong ít phút, vui lòng kiểm tra email của bạn.", YEE_MSG_TYPE.MSG_INFO, false);
    setIsDisable(() => true);
    await sendMailForgotPassword(value).then(
      res=> {
        setIsDisable(() => false);
        showToastMessage("Gửi mail reset mật khẩu thành công", YEE_MSG_TYPE.MSG_SUCCESS, false);
        console.log(res.data);
       // e.target.disabled = false;
      }
    ).catch(
      err => {
        setIsDisable(() => false);
        showToastMessage("Gửi mail reset mật khẩu không thành công", YEE_MSG_TYPE.MSG_ERROR, false);
        console.log(err);
        //e.target.disabled = false;
      }
    )
  }
  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper pb-2 home-wrapper-2">
        <div className="row yee-br-none pb-5">
          <div className="col-12">
            <div className="auth-card mb-5">
              <h3 className="text-center mb-1">Reset Mật Khẩu</h3>
              <p className="text-center mt-2 mb-3">
                Mật khẩu mới sẽ được gửi vào email của bạn trong ít phút, vui lòng kiểm tra email của bạn.
              </p>
              <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput type="text" name="email" className={`w-50 mx-auto ${formik.touched.email && formik.errors.email ? "border-danger": ""}`} onChange={(e) => {formik.values.email = e.target.value; formik.handleChange(e)}} placeholder="Email" />
                <small className="form-text text-danger mx-auto">{formik.touched.email && formik.errors.email}</small>
                <div className="mb-5">
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className={`button ${isDisable ? 'disable' :''}`} type="submit">
                      Gửi Email
                    </button>
                    <Link to="/login" className="button">Huỷ</Link>
                  </div>
                </div>
                <div className="mb-5"></div>
              </form>
            </div>
          </div>
        </div>
      </Container>
      <YeeToastMsg/>
    </>
  );
};

export default Forgotpassword;
