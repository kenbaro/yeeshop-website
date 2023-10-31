import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";

const Blog = () => {
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <Container class1="blog-wrapper home-wrapper-2 pb-2">
        <div className="row yee-br-none">
          <div className="col-sm col-md-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Find By Categories</h3>
              <div>
                <ul className="ps-0">
                  <li>Watch</li>
                  <li>Tv</li>
                  <li>Camera</li>
                  <li>Laptop</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm col-md-9">
            <div className="row">
              <div className="col-sm col-md-6 mb-3">
                <BlogCard />
              </div>
              <div className="col-sm col-md-6 mb-3">
                <BlogCard />
              </div>
              <div className="col-sm col-md-6 mb-3">
                <BlogCard />
              </div>
              <div className="col-sm col-md-6 mb-3">
                <BlogCard />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;