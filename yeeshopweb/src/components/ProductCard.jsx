import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";

const ProductCard = (props) => {

  const { grid, products} = props;

  let location = useLocation();
  return (
    <>
      {products !== null && products !== undefined && products.map((product,idx) => (

        <div key={idx}
          className={` ${
            location.pathname === "/product" ? `gr-${grid}` : "yee-flx-col"
          } `}
        >
          <Link
            to={`${
              location.pathname ==="/"
                ? "/product/"+product.productCd
                : location.pathname === "/product/:SKU"
                ? "/product/"+product.productCd
                : "/product/"+product.productCd
            }`}
            state={{SKU: product.productCd}}
            className="product-card position-relative"
          >
            <div className="wishlist-icon position-absolute">
              {product.productDiscount > 0 && 
                <button className="border-0 yee-br-4px bg-primary">
                  <span className="text-12 mx-2 color-white"> Giảm {product.productDiscount}% </span>
                </button>
              }
            </div>
            <div className="product-image mt-5">
              <img src={product.productImg} width={200} className="" alt={product.productNm} />
              <img src={product.productImg} width={200} className="" alt={product.productNm} />
            </div>
            <div className="product-details mt-1">
              <h6 className="brand">{product.brandNm}</h6>
              <h5 className="product-title">
              {product.productNm}
              </h5>
              <ReactStars
                count={5}
                size={24}
                value={4}
                edit={false}
                activeColor="#ffd700"
              />
              <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                {product.productDescription}
              </p>
              {product.productDiscount > 0 && 
                <span>
                  <span className="price yee-new-price color-primary">{product.productDiscountPrice}</span>&nbsp;<span className="price yee-old-price">{product.productUnitPrice}</span>
                </span>
              }
              {product.productDiscount <= 0 && 
                <span className="price yee-new-price color-primary">{product.productUnitPrice}</span>
              }
            </div>
          </Link>
        </div>
      ))}
      
    </>
  );
};

export default ProductCard;
