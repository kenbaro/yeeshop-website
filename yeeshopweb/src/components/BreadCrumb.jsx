import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
  const { title } = props;
  return (
    <div className="breadcrumb mb-0 pb-0 pt-1">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 py-3 mb-0 bg-white">
            <p className="mb-0">
              <Link to="/" className="text-dark">
              <span ><i className="fas fa-home"></i></span>&nbsp;Trang Chủ&nbsp; &nbsp;  
              </Link>
             <span ><i className="far fa-angle-right"></i></span> &nbsp; &nbsp; {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
