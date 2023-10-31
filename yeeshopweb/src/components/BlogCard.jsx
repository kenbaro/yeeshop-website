import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src="https://cdn-v2.didongviet.vn/files/media/A-iPhone-13/iPhone-13-128gb/iphone-13-red-didongviet.jpg" className="img-fluid w-100" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">2 Dec, 2023</p>
        <h5 className="title">All will die soon, Ultra dead</h5>
        <p className="desc">
          Fuck Fuck Fuck! Fuck the life ! Fuck the world! Ultra Dead! No hope.
        </p>
        <Link to="/blog/:id" className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
