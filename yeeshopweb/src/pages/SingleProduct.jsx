import React, { useState} from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../components/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPenToSquare,faCirclePlus,faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { YEE_CONST_STOCK, YEE_NUMBER, YEE_MSG_TYPE, CART_MSG, YEE_TOKEN } from "../constants/YeeConst";
import { getSingleProductApi, validateProductApi } from "../api/ProductApi";
import { addCartApi } from "../api/CartApi";
import { useEffect } from "react";
import {removeAllComma, addAllComma,removeComma,addComma} from "../utils/YeeCommonUtils";
import {YeeToastMsg, showToastMessage} from "../components/YeeToastMsg";

const SingleProduct = () => {


    const location = useLocation();
    let { SKU } = useParams();

    if (null === SKU) {
        SKU = {};
    }
    const [params,setParams] = useState({SKU: "" ,storage: "", color: ""});

    if (params.SKU !== SKU) {

        params.SKU = SKU;
        params.storage = "";
        params.color="";
        setParams((prev) => ({...prev}));
        console.log(params);
    }

    const [cart,setCart] = useState({});
    const [singleProductForm,setSingleProductForm] = useState({});

    const executeScroll = () => {
        
        const elem = document.getElementById("review"); 
             elem.scrollIntoView();
    }

    const ctlReviewDiv = () => {

        document.getElementById('reviewDiv').classList.remove('d-none');
    }
    const handlerColorSelected = (e,pColor) => {

        singleProductForm.productColor.colorCd = pColor.colorCd; 
        singleProductForm.productColor.colorNm = pColor.colorNm;
        singleProductForm.productColor.showFlg = pColor.showFlg;

        setSingleProductForm((prev) => ({...prev}));
        params.color = singleProductForm.productColor.colorNm;
        setParams((prev) => ({...prev}));
    }

    const handlerStorageSelected = (e, pStorage) => {

        singleProductForm.productStorageDto.storageCd = pStorage.storageCd; 
        singleProductForm.productStorageDto.storageNm = pStorage.storageNm;
        setSingleProductForm((prev) => ({...prev}));
        params.storage = singleProductForm.productStorageDto.storageNm;
        setParams((prev) => ({...prev}));
    }
    const handleChangeQty = (e,typeChg) => {

        removeAllComma();

        const qty = singleProductForm.orderQty;
        const nwPrice = removeComma(singleProductForm.newPrice);
        // case plus qty
        if ( 1 === typeChg && Number(qty) < 10) {

            singleProductForm.orderQty = Number(qty) + 1;
            singleProductForm.tempPrice = addComma(Number(singleProductForm.orderQty) * Number(nwPrice));
            setSingleProductForm((prev) => ({...prev}));
        }

        if ( 0 === typeChg && Number(qty) > 1) {

            singleProductForm.orderQty = Number(qty) - 1;
            singleProductForm.tempPrice = addComma(Number(singleProductForm.orderQty) * Number(nwPrice));
            setSingleProductForm((prev) => ({...prev}));
        }

        addAllComma();
    }
    const [propsImg,setPropsImg] = useState({
        width: 594,
        height: 600,
        zoomWidth: 600,
        img: "image",
    });

    const paymentProduct = () => {
        
        showToastMessage("Khong the thanh toan", YEE_MSG_TYPE.MSG_ERROR,true);
    }

    const onChangeThumnail = (e) => {

        propsImg.img = e.target.src;
        setPropsImg((prev) => ({...prev}));
    }

    const [orderedProduct, setorderedProduct] = useState(true);

    const copyToClipboard = (text) => {
        console.log("text", text);
        var textField = document.createElement("textarea");
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();
    };
    const addCartFunc = async (data) => {

        await addCartApi(data).then(

            res => {
                const msgObj = res.data;
                if (!msgObj.isError && msgObj.messages.length > 0) {

                    showToastMessage(msgObj.messages[0].messageTitle, YEE_MSG_TYPE.MSG_SUCCESS,);
                
                    document.getElementById("cartCnt").innerText= Number(document.getElementById("cartCnt").innerText)+Number(singleProductForm.orderQty);
                }
            }
        ).catch(
            err =>{
                showToastMessage(CART_MSG.REQUIRE_LOGIN2, YEE_MSG_TYPE.MSG_ERROR,false);
            }
        );
    }
    //const closeModal = () => { };
    const addCartProc = async (singleProductForm) => {

        await validateProductApi(singleProductForm).then(

            res => {
                cart.cartItems = [{
                    sku : singleProductForm.sku,
                    productNm : singleProductForm.productNm,
                    image : singleProductForm.image.mainImage,
                    orderQty : singleProductForm.orderQty,
                    unitPrice : singleProductForm.oldPrice,
                    newPrice : singleProductForm.tempPrice,
                }];
                setCart (prev => ({...prev}));
                res.data ? addCartFunc(cart)
                : showToastMessage(CART_MSG.ADD_CART_FAIL,YEE_MSG_TYPE.MSG_ERROR,false);
            }

        ).catch();
    };

    const addToCart = () => {

        if ("" === localStorage.getItem(YEE_TOKEN.ACCESS_TOKEN) 
            || undefined === localStorage.getItem(YEE_TOKEN.ACCESS_TOKEN) 
            || null === localStorage.getItem(YEE_TOKEN.ACCESS_TOKEN)) {

                window.location= "/login";}
        addCartProc(singleProductForm);
    };

    const getSingleProduct = async (params) => {

        //console.log(params);
        await getSingleProductApi(params).then(
            res => {
                console.log(res.data)
                setSingleProductForm(() => (res.data));

                propsImg.img = res.data.image.mainImage;
                setPropsImg((prev) => ({...prev}));
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            }
        ).catch(
            err => {console.log(err)}
        )
       
    }

    useEffect(() => {

        getSingleProduct(params);
        
    },[params.SKU,params.storage,params.color]);
    return (
        <>
            <Meta title={"Chi Tiết Sản Phẩm"} />
            <BreadCrumb title="Chi Tiết Sản Phẩm" />
            <Container class1="main-product-wrapper pb-1 home-wrapper-2">
                <div className="row yee-br-none">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...propsImg} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15 ">
                            {null !== singleProductForm.image && undefined !== singleProductForm.image && Object.entries(singleProductForm.image).map(([key, value]) => {
                                return (
                                    <div key={key}>
                                        <img src={value} onClick={(e) => onChangeThumnail(e)} className="img-thumbnail yee-pointer d-flex" alt={key} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className="title yee-text-fw-bold">
                                    {singleProductForm.productNm}
                                </h3>
                            </div>
                            <div className="py-3">
                                <div className="product-inf">
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">SKU :</h3>
                                        <p className="product-data">{singleProductForm.sku}</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Thương hiệu :</h3>
                                        <p className="product-data">{singleProductForm.productBrandNm}</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Danh mục :</h3>
                                        <p className="product-data">{singleProductForm.productCateNm}</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Tình Trạng :</h3>
                                        <p className="product-data p-in-stock px-1">
                                            {singleProductForm.productStatus === YEE_NUMBER.NUMBER_ONE ? YEE_CONST_STOCK.IN_STOCK : YEE_CONST_STOCK.OUT_OF_STOCK}
                                        </p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Đã bán :</h3>
                                        <p className="product-data">{singleProductForm.soldQty}</p>
                                    </div>
                                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                        <h3 className="product-heading">Dung Lượng :</h3>
                                        <div className="d-flex flex-wrap gap-15">
                                            {singleProductForm.productStorages !== undefined && Array.isArray(singleProductForm.productStorages) && singleProductForm.productStorages.map((pStorage,index) => (

                                                <button key={index} 
                                                        className={`badge border border-1 bg-white text-dark border-secondary radio-btn ${singleProductForm.productStorageDto.storageCd === pStorage.storageCd ? "border-primary color-primary" : ""}`} 
                                                        onClick={(e) => {handlerStorageSelected(e,pStorage);}}
                                                >
                                                    {pStorage.storageNm}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                        <h3 className="product-heading">Chọn màu để xem giá chi tiết:</h3>
                                        <div className="d-flex flex-wrap gap-15">
                                            {singleProductForm.productColors !== undefined && Array.isArray(singleProductForm.productColors) && singleProductForm.productColors.map((pColor,index) => (

                                                <button key={index} 
                                                    disabled={false === pColor.showFlg ? "disabled" : ""} 
                                                    className={`badge border border-1 bg-white text-dark border-secondary ${false === pColor.showFlg ? "disable" : ""} radio-btn ${singleProductForm.productColor.colorCd === pColor.colorCd ? "border-primary color-primary" : ""}`} 
                                                    onClick={(e) => {handlerColorSelected(e,pColor);}}
                                                >
                                                    {pColor.colorNm}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="py-2 d-flex align-items-center justify-content-between ">
                                    {(singleProductForm.productStatus === YEE_NUMBER.NUMBER_ONE || singleProductForm.productQuantity > 0) &&
                                        <div className="d-flex align-items-center">
                                            <p className="product-heading me-2">Giá bán :</p><p className="price"><span id="newPrice" className="yeeComma">{singleProductForm.newPrice}</span>&nbsp;&nbsp;<span className={`yee-old-price ${singleProductForm.oldPrice === singleProductForm.newPrice ? "d-none" :""}`}>{singleProductForm.oldPrice}</span></p>
                                        </div>
                                    }
                                    
                                    <div className="d-flex align-items-center gap-10">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={4}
                                            edit={false}
                                            activeColor="#F2994A"
                                        />
                                        <p className="mb-0 t-review">( 1 đánh giá )</p>
                                    </div>
                                    <span className="review-btn yee-pointer" onClick = {executeScroll}>
                                        Viết đánh giá
                                    </span>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <div>
                                        <a href="/#">
                                            <AiOutlineHeart className="fs-5 me-2" /> Thêm vào yêu thích
                                        </a>
                                    </div>
                                </div>
                                {
                                    singleProductForm.sales !== null  &&
                                    <div className="d-flex gap-10 flex-column  my-3">
                                        <h3 className="product-heading"> Chương trình khuyến mãi: <span className="color-white bg-primary p-1 yee-br-4px">{singleProductForm.sales?.saleNm}</span> </h3>
                                        <p className="product-data">
                                            {singleProductForm.sales?.saleDescription}
                                        </p>
                                    </div>
                                }
                                
                                <div className="d-flex gap-10 align-items-center justify-content-end my-3">
                                    <h3 className="product-heading">Copy link sản phẩm:</h3>
                                    <a
                                        href="#!"
                                        onClick={() => {
                                            copyToClipboard(
                                                "http://localhost:3001/product/"+params.SKU
                                            );
                                        }}
                                    >
                                        here
                                    </a>
                                </div>
                                { (singleProductForm.productStatus === YEE_NUMBER.NUMBER_ONE || singleProductForm.productQuantity > 0) &&
                                    <div>
                                        <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                                            <h3 className="product-heading">Số lượng :</h3>
                                            <div className="d-flex align-items-center">
                                                <FontAwesomeIcon icon={faCircleMinus} onClick={(e) => handleChangeQty(e,0)} className="yee-pointer color-777777 fa-lg"/>
                                                <input
                                                    type="number"
                                                    name=""
                                                    value={singleProductForm.orderQty}
                                                    className="form-control mx-2 text-center yee-wd-48px"
                                                    id="productQty"
                                                    readOnly="readonly"
                                                />
                                                <FontAwesomeIcon icon={faCirclePlus} onClick={(e) => handleChangeQty(e,1)} className="yee-pointer color-primary fa-lg"/>
                                            </div>
                                            <h3 className="product-heading">Tạm tính :</h3>
                                            <p className="price yeeComma" id="tempPrice">{singleProductForm.tempPrice}</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-15 justify-content-end flex-row mt-2 mb-3">
                                            <div className="d-flex align-items-center gap-30">
                                                <button onClick={() => addToCart()} className="button signup">Thêm Giỏ Hàng</button>
                                                {/* <button
                                                    className="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop"
                                                    type="button"
                                                >
                                                    Mua Ngay
                                                </button> */}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            {
                Array.isArray(singleProductForm.relatedProductDtos) &&
                <Container class1="popular-wrapper py-2 home-wrapper-2">
                    <div className="row">
                        <div className="col-12 pt-2">
                            <h4 className="section-heading">Sản Phẩm Tương Tự</h4>
                        </div>
                    </div>
                    <div className="row">
                        <ProductCard grid={5} products={singleProductForm.relatedProductDtos ? singleProductForm.relatedProductDtos : []}/>
                    </div>
                </Container>
            }
            
            <Container class1="description-wrapper py-2 home-wrapper-2">
                <div className="row dsp-row">
                    <div className="col-8">
                        <div className="row" style={{minHeight: "370px"}}>
                            <div className="d-flex">
                                <p>{singleProductForm.productDesription !== null && singleProductForm.productDesription !== "" && singleProductForm.productDesription}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-flex">
                                <div>
                                    <h4 id="review" className="review-heading pt-2">
                                        <FontAwesomeIcon icon={faPenToSquare} className="color-primary ps-1" />
                                        <span className="ps-2 color-primary">Đánh giá từ người dùng về {singleProductForm.productNm}</span>
                                    </h4>
                                    <div className="review-inner-wrapper">
                                        <div className="review-head d-flex justify-content-between align-items-end">
                                            <div>
                                                <h4 className="mb-2">Đánh Giá Tổng Quát</h4>
                                                <div className="d-flex align-items-center gap-10">
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        value={4}
                                                        edit={false}
                                                        activeColor="#F2994A"
                                                    />
                                                    <p className="mb-0">1 người đã đánh giá</p>
                                                </div>
                                            </div>
                                            {orderedProduct && (
                                                <div>
                                                    <button onClick={() => ctlReviewDiv()} className="color-link border-0 bg-transparent">
                                                        <FontAwesomeIcon icon={faPenToSquare} className="color-link ps-1" /> <span className="color-link text-decoration-underline">Viết đánh giá của bạn</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        {orderedProduct && (
                                        <div id="reviewDiv" className="review-form py-4 d-none">
                                            <h4>Viết đánh giá</h4>
                                            <form action="" className="d-flex flex-column gap-15">
                                                <div>
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        value={1}
                                                        edit={true}
                                                        activeColor="#F2994A"
                                                    />
                                                </div>
                                                <div>
                                                    <textarea
                                                        name=""
                                                        id=""
                                                        className="w-100 form-control"
                                                        cols="30"
                                                        rows="4"
                                                        placeholder="Viết đánh giá tại đây..."
                                                    ></textarea>
                                                </div>
                                                <div className="d-flex justify-content-end">
                                                    <button className="button border-0">Đánh giá</button>
                                                </div>
                                            </form>
                                        </div>)}
                                        <div className="reviews mt-4">
                                            <div className="review">
                                                <div className="d-flex gap-10 align-items-center">
                                                    <h6 className="mb-0">Xiao Yi</h6>
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        value={4}
                                                        edit={false}
                                                        activeColor="#F2994A"
                                                    />
                                                    <span id="timeReview" className="color-777777 text-12">2023-06-05T02:07:18.000</span>
                                                </div>
                                                <p className="mt-3">
                                                    Giá tốt nhất thị trường & nhân viên nhiệt tình giúp đỡ
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 pe-0">
                        <h4 className="section-heading dsp-col py-2 ps-1 dsp-col mb-0"> <FontAwesomeIcon icon={faGear} className="color-primary ps-1" /> <span className="ps-2 color-primary">Thông số kỹ thuật</span></h4>
                        { singleProductForm.productAttribute &&
                        <div className="bg-white p-3">
                            <table id="monitorTable" className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" className="yee-text-fw-bold yee-br-b-none">Màn hình</th>
                                        <th scope="col" className="yee-br-b-none">&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="col-5">Công nghệ màn hình</td>
                                        <td className="col-7">{singleProductForm.productAttribute.monitorTech}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-5">Màn hình rộng</td>
                                        <td className="col-7">{singleProductForm.productAttribute.monitorWide}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-5">Mặt kính cảm ứng</td>
                                        <td className="col-7">{singleProductForm.productAttribute.touchGlassSurface}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-5">Độ phân giải</td>
                                        <td className="col-7">{singleProductForm.productAttribute.monitorResolution}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table id="afterCamTable" className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" className="yee-text-fw-bold yee-br-b-none">CameraSau</th>
                                        <th scope="col" className="yee-br-b-none">&nbsp;</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr>
                                            <td className="col-5">Độ phân giải</td>
                                            <td className="col-7">{singleProductForm.productAttribute.afterResolution}</td>
                                        </tr>
                                        <tr>
                                            <td className="col-5">Quay phim</td>
                                            <td className="col-7">{singleProductForm.productAttribute.film}</td>
                                        </tr>
                                    </tbody>
                            </table>
                            <table id="beforeCamTable" className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" className="yee-text-fw-bold yee-br-b-none">Camera trước</th>
                                        <th scope="col" className="yee-br-b-none">&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="col-5">Độ phân giải</td>
                                        <td className="col-7">{singleProductForm.productAttribute.beforeResolution}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table id="CPU" className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" className="yee-text-fw-bold yee-br-b-none">Hệ điều hành & CPU</th>
                                        <th scope="col" className="yee-br-b-none">&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="col-5">Chip xử lý (CPU)</td>
                                        <td className="col-7">{singleProductForm.productAttribute.pcpu}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-5">Hệ điều hành</td>
                                        <td className="col-7">{singleProductForm.productAttribute.operatingSystem}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-5">Chip đồ họa (GPU)</td>
                                        <td className="col-7">{singleProductForm.productAttribute.pgpu}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        }
                    </div>
                </div>
            </Container>
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                        <div className="modal-header pd-0 border-0">
                            <h5 className="modal-title color-primary">Xác nhận mua ngay</h5>
                        </div>
                        <div className="modal-body py-0">
                            { Object.keys(singleProductForm).length !== 0  &&
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 w-50 ">
                                    <img src={singleProductForm.image.mainImage} className="img-fluid" alt="product imgae" />
                                </div>
                                <div className="d-flex flex-column flex-grow-1 w-50 mar-50">
                                    <h6 className="mb-3">{singleProductForm.productNm}</h6>
                                    <p className="mb-1">Số lượng: <span className="yee-text-fw-bold">{singleProductForm.orderQty}</span></p>
                                    <p className="mb-1">Dung lượng: <span className="yee-text-fw-bold">{singleProductForm.productStorageDto.storageNm}</span></p>
                                    <p className="mb-1">Màu: <span className="yee-text-fw-bold">{singleProductForm.productColor.colorNm}</span></p>
                                    <p className="mb-1">Tạm tính: <span className="color-primary yee-text-fw-bold">{singleProductForm.tempPrice}</span></p>
                                </div>
                            </div>
                            }
                        </div>
                        <div className="modal-footer border-0 justify-content-center gap-30 py-2">
                            <button 
                                type="button"
                                className="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                data-bs-backdrop="false">
                                Huỷ
                            </button>
 
                            <button type="button" onClick={() => paymentProduct()} className="button">
                                Thanh Toán
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
            <YeeToastMsg />
        </>
    );
};

export default SingleProduct;
