import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import { useState } from "react";
import { getContactInfo } from "../api/CommonApi";

const Contact = () => {

  // init state for contactForm
  const [contactForm,setContactForm] = useState({});
  
  // call Contact Api
  const getContactApi = async () => {

    await getContactInfo().then(
      res => {
        setContactForm(res.data);
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  useEffect(() => {
    getContactApi();
  },[]);
  return (
    <>
      <Meta title={"Liên Hệ"} />
      <BreadCrumb title="Liên Hệ" />
      <Container class1="contact-wrapper pb-2 home-wrapper-2">
        <div className="row pb-5">
          <div className="col-sm col-md- mt-5">
            <div>
              <h3 className="contact-title mb-4">Thông Tin Liên Hệ</h3>
              <div>
                <ul className="ps-0">
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <AiOutlineHome className="fs-5" />
                    <address className="mb-0">
                      {contactForm.address}
                    </address>
                  </li>
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <BiPhoneCall className="fs-5" />
                    <a href={`tel:${contactForm.shopTel}`}>{contactForm.shopTel}</a>
                  </li>
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <AiOutlineMail className="fs-5" />
                    <a href={`mailto:${contactForm.email}`}>{contactForm.email}</a>
                  </li>
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <BiInfoCircle className="fs-5" />
                    <p className="mb-0">{contactForm.workTime}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm col-md mt-5">
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4854676362934!2d106.76972441477211!3d10.850632392271216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1677509639126!5m2!1svi!2s"
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="address_map"
            ></iframe>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
