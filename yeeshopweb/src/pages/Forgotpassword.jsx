import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
const Forgotpassword = () => {
  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper pb-2 home-wrapper-2">
        <div className="row yee-br-none pb-5">
          <div className="col-12">
            <div className="auth-card mb-5">
              <h3 className="text-center mb-1">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form action="" className="d-flex flex-column gap-15">
                <CustomInput type="email" name="email" placeholder="Email" />

                <div className="mb-5">
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button" type="submit">
                      Submit
                    </button>
                    <Link to="/login" className="button">Cancel</Link>
                  </div>
                </div>
                <div className="mb-5"></div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Forgotpassword;
