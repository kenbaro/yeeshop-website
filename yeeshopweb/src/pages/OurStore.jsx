import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import MultiRangeSlider from "../components/MultiRangeSlider";
import { filterProductAPIv1, findProductFilterApi, getAllProductsApi } from "../api/ProductApi";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
const OurStore = () => {
  const [grid, setGrid] = useState(3);

  const [storeForm,setStoreForm] = useState({});

  const [searchParams, setSearchParams] = new useSearchParams();

  const keyWord = searchParams.get("keywords") !== null ? searchParams.get("keywords") : "";

  console.log(keyWord);
  const handleChangeRange = (value) => {

    const {values} = value;
    storeForm.filterFromPrice = values.min;
    storeForm.filterToPrice = values.max;

    setStoreForm(prev => ({...prev}));
  }

  const filterProductsAPIv1 = async (data) => {

    await filterProductAPIv1(data).then(
      res=>{
        console.log(res.data);
        setStoreForm(() => (res.data));
      }
    ).catch();
  }
  const filterProductFunc = (e) => {

    if (e.target.nodeName  === "LI") {
        const brandCd = e.target.attributes.brand_cd.value;
        
        storeForm.filterBrand = brandCd;
    }  else if (e.target.attributes.id !== undefined) {

      if (e.target.attributes.id.value === "showMoreBtn"){

        storeForm.productShowQty + storeForm.productRemainingQty !== storeForm.products.length ? storeForm.showMore = true : storeForm.showMore = false;
      } else if (e.target.attributes.id.value === "showFilterPriceBtn"){

      } else {

        storeForm.filterBy = e.target.options[e.target.options.selectedIndex].value.toString();
      }
    }
    
    setStoreForm(prev => ({...prev}));
    filterProductsAPIv1(storeForm);
  }
  const getProducts = async (keyWord) => {

    await getAllProductsApi(keyWord).then(
      res => {
        console.log(res.data);
        setStoreForm(res.data);
      }
    ).catch();
  }


  useEffect(() => {

    getProducts(keyWord);
  },[]);
  return (
    <>
      <Meta title={"Sản Phẩm"} />
      <BreadCrumb title="Sản Phẩm" />
      <Container class1="store-wrapper home-wrapper-2 pb-2">
        <div className="row  yee-br-none">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title mb-1">Thương Hiệu</h3>
              <div>
                <ul className="ps-0">
                  {
                    Object.entries(storeForm).length > 0 && storeForm.brands.map((brand,index) => (
                      <li key={index} brand_cd={brand.brandCd} onClick={(e) => filterProductFunc(e)} className={`yee-text-fw-bold ${ brand.brandCd === storeForm.filterBrand ? "color-primary": ""}`}>{brand.brandNm}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Chọn Giá</h3>
              <div className="filter-content mb-2">
                <div className="d-flex align-items-center gap-10">
                    <MultiRangeSlider onChange={handleChangeRange}/>
                </div>
                <div className="d-flex justify-content-end">

                  <button id="showFilterPriceBtn" onClick={(e) => filterProductFunc(e)} className="button mt-4"> Xem kết quả </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block yee-wd-100px">
                    Lọc theo:
                  </p>
                  <select
                    name="filter"
                    defaultValue={"0"}
                    className="form-control form-select"
                    id="filterSelect"
                    onChange={(e) => filterProductFunc(e)}
                  >
                    <option value="0">Mặc định</option>
                    <option value="1">Sản phẩm bán chạy</option>
                    <option value="2">Tên sản phẩm, A-Z</option>
                    <option value="3">Tên sản phẩm, Z-A</option>
                    <option value="4">Giá, thấp đến cao</option>
                    <option value="5">Giá, cao đến thấp</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">
                    {Object.entries(storeForm).length > 0 && storeForm.productShowQty} sản phẩm
                  </p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard grid={grid} products={storeForm.products ? storeForm.products : []}/>
              </div>
            </div>
            {
              Object.entries(storeForm).length > 0 && storeForm.productShowQty > 7 &&
              <div className="w-100 d-flex justify-content-center mb-4">
                <button className="button" id="showMoreBtn" onClick={(e) => filterProductFunc(e)}> { storeForm.productShowQty + storeForm.productRemainingQty !== storeForm.products.length  ? `Xem thêm  ${storeForm.productRemainingQty} sản phẩm` : "Rút gọn"}</button>
               </div>
            }
            
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
