import React, { useState} from "react";
import { useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { YEE_CONST_STOCK } from "../constants/YeeConst";
import { YEE_NUMBER } from "../constants/YeeConst";
import { getSingleProductApi } from "../api/ProductApi";
import { useEffect } from "react";
let imglink = "https://cdn-v2.didongviet.vn/files/products/2023/8/13/1/1694544996241_thumb_iphone_15_pro_didongviet.png";

const SingleProduct = () => {

    const location = useLocation()
    const { SKU } = location.state;
    // let params = {SKU};
    //     params.storage = "empty";
    //     params.color = "empty";
    const [params,setParams] = useState({SKU,storage: "empty", color: "empty"});
    console.log(params);
    const [singleProductForm1,setSingleProductForm1] = useState({});
    const [storage,setStorage] = useState({});
    const [color,setColor] = useState({colorCd: "", colorNm:""})
    
    const handlerParams = () => {

        setParams((prev) => ({...prev, 
            storage: storage.storageNm,
            color: color.colorNm}));

    }
    const [selectedStorage,setSelectedStorage] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const handlerColor = (e) => {

        console.log(e.target.innerText);
        
        setColor(() => {
            color.colorCd = "0";
            color.colorNm = e.target.innerText;});
        selectedColor = color.colorCd;
        setSelectedColor(selectedColor);
        console.log(color);
    }
    const singleProductForm = {
        "thumbNail": {

            "mainImage": "https://cdn-v2.didongviet.vn/files/products/2023/8/13/1/1694544996241_thumb_iphone_15_pro_didongviet.png",
            "thumbNail2": "https://cdn-v2.didongviet.vn/files/products/2023/7/1/1/1690864046762_2_iphone_pro_max_didongviet.jpg",
            "thumbNail3": "https://cdn-v2.didongviet.vn/files/products/2023/7/1/1/1690864048860_3_iphone_pro_max_didongviet.jpg",
            "thumbNail4": "https://cdn-v2.didongviet.vn/files/products/2023/7/1/1/1690864048860_3_iphone_pro_max_didongviet.jpg",
        },
        "productInfo": {

            "productTitle": "iPhone 14 128GB Chính hãng (VN/A)",
            "type": "iPhone 14",
            "category": "iPhone Chính Hãng",
            "brand": "Apple",
            "tag": "iphone",
            "defaultStatus": "1",
            "pDescription" : "iPhone 13 128GB - Đem đến những gì tuyệt vời nhất ,iPhone 13 128GB với thiết kế ngoại hình giống iPhone 12 đã quá “mãn nhãn” người dùng, lần này với những nâng cấp sâu hơn trên iPhone 13 về cấu hình cũng như camera, viên pin được nâng cấp từ dung lượng đến độ bền bỉ sẽ gây ấn tượng mạnh mẽ đến dàn iFans hùng hậu trên toàn thế giới."
        },
        "productDetail": {

            "monitorTech": "OLED",
            "monitorWide": "6.1 - Tần số quét 60 Hz",
            "touchGlassSurface": "Kính cường lực Ceramic Shield",
            "monitorResolution": "1170 x 2532 Pixels",
            "flashLight": "Đèn LED kép",
            "afterResolution": "2 camera 12MP",
            "film": "4K 2160p@30fps / 4K 2160p@60fps / FullHD 1080p@120fps / HD 720p@30fps / FullHD 1080p@240fps / FullHD 1080p@60fps / 4K 2160p@24fps / FullHD 1080p@30fps",
            "beforeResolution": "12MP",
            "videoCall": "HDR, Quay video Full HD",
            "cpu": "Apple A15 Bionic",
            "operatingSystem": "iOS 15",
            "gpu": "Apple GPU 4 nhân",
            "internalMemory": "128GB",
            "remainingMemory": "Không rõ",
            "externalMemory": "Không",
            "mobileNetwork": "Hỗ Trợ 5G",
            "headphoneJack": "Lightning",
            "sim": "1 Nano SIM & 1eSim",
            "bluetooth": "v5.0",
            "gps": "QZSS, iBeacon, A-GPS, BDS, GALILEO, GLONASS",
            "battery": "Li-Ion",
            "batteryTech": "Sạc pin nhanh, Tiết kiệm pin, Sạc không dây MagSafe, Sạc không dây",
            "design": "Nguyên khối",
            "size": "146.7 x 71.5 x 7.4 mm",
            "weight": "164g",
            "material": "Nhôm tái chế thân thiện với môi trường",
        },
        "productStorage": {

            "storage1": "64GB",
            "storage2": "128GB",
            "storage3": "256GB",
            "storage4": "512GB",
        },
        "productColor": {

            "color1": {
                "SKU": "3400000004196",
                "colorCd": "FFD700",
                "colorNm": "Màu Vàng",
                "status": "1"
            },
            "color2": {
                "SKU": "3400000004197",
                "colorCd": "FF4500",
                "colorNm": "Màu Đỏ",
                "status": "1"
            },
            "color3": {
                "SKU": "3400000004198",
                "colorCd": "FFA500",
                "colorNm": "Màu Xám",
                "status": "0"
            },
            "color4": {
                "SKU": "3400000004199",
                "colorCd": "FF8C00",
                "colorNm": "Màu Đen",
                "status": "1"
            },
        }
    
    }
    const props = {
        width: 594,
        height: 600,
        zoomWidth: 600,
        img: imglink,
    };
    const mainThumnail = useRef(null);
    const onChangeThumnail = (e) => {

        props.img = e.target.src;
        mainThumnail.current.props = props;
        console.log(mainThumnail.current.props);
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
    const closeModal = () => { };

    const getSingleProduct = async (params) => {
        await getSingleProductApi(params).then(
            res => {
                console.log(res.data);
                setSingleProductForm1(() => (res.data));
                setStorage(()=> res.data.productStorageDto)
                setColor(() => res.data.productColor);
                setParams((prev) => ({...prev, 
                    storage: res.data.productStorageDto.storageNm,
                    color: res.data.productColor.colorNm}));
                
            }
        ).catch(
            err => {console.log(err)}
        )
    }

    useEffect(() => {
        getSingleProduct(params);
    },[params.storage,params.color]);
    console.log(storage);
    return (
        <>
            <Meta title={"Chi Tiết Sản Phẩm"} />
            <BreadCrumb title="Chi Tiết Sản Phẩm" />
            <Container class1="main-product-wrapper pb-1 home-wrapper-2">
                <div className="row yee-br-none">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom ref={mainThumnail} {...props} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15 ">
                            {Object.entries(singleProductForm.thumbNail).map(([key, value]) => {
                                return (
                                    <div key={key}>
                                        <img src={value} onClick={(e) => { props.img = e.target.src; console.log(props) }} className="img-thumbnail d-flex" alt={key} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className="title yee-text-fw-bold">
                                    {singleProductForm1.productNm}
                                </h3>
                            </div>
                            <div className="py-3">
                                <div className="product-inf">
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">SKU :</h3>
                                        <p className="product-data">{singleProductForm1.sku}</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Thương hiệu :</h3>
                                        <p className="product-data">{singleProductForm1.productBrandNm}</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Danh Mục :</h3>
                                        <p className="product-data">{singleProductForm1.productCateNm}</p>
                                    </div>
                                    {/* <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Tags :</h3>
                                        <p className="product-data">{singleProductForm.productInfo.tag}</p>
                                    </div> */}
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Tình Trạng :</h3>
                                        <p className="product-data p-in-stock px-1">
                                            {singleProductForm1.productStatus === YEE_NUMBER.NUMBER_ONE ? YEE_CONST_STOCK.IN_STOCK : YEE_CONST_STOCK.OUT_OF_STOCK}
                                        </p>
                                    </div>
                                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                        <h3 className="product-heading">Dung Lượng :</h3>
                                        <div className="d-flex flex-wrap gap-15">
                                            {singleProductForm1.productStorages !== undefined && singleProductForm1.productStorages.map((pStorage,index) => (

                                                <span key={index} className={`badge border border-1 bg-white text-dark border-secondary radio-btn ${storage.storageCd === pStorage.storageCd ? "border-primary color-primary" : ""}`} onClick={(e) => {setStorage({storageCd:pStorage.storageCd, storageNm:pStorage.storageNm}); handlerParams();}}>
                                                    {pStorage.storageNm}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                        <h3 className="product-heading">Chọn màu để xem giá chi tiết:</h3>
                                        <div className="d-flex flex-wrap gap-15">
                                            {singleProductForm1.productColors !== undefined && singleProductForm1.productColors.map((pColor,index) => (

                                                <span key={index} className={`badge border border-1 bg-white text-dark border-secondary radio-btn ${color.colorCd === selectedColor ? "border-primary color-primary" : ""}`} onClick={(e) => handlerColor(e)}>
                                                    {color.colorNm}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="py-2 d-flex align-items-center justify-content-between ">
                                    <p className="product-heading">Giá bán :</p><p className="price"> {singleProductForm1.newPrice}&nbsp;&nbsp;<span className="yee-old-price">{singleProductForm1.oldPrice}</span></p>
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
                                    <a className="review-btn" href="#review">
                                        Viết đánh giá
                                    </a>
                                </div>
                                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                                    <h3 className="product-heading">Số lượng :</h3>
                                    <div className="">
                                        <input
                                            type="number"
                                            name=""
                                            min={1}
                                            max={10}
                                            className="form-control"
                                            style={{ width: "100px" }}
                                            id=""
                                        />
                                    </div>
                                    <div className="d-flex align-items-center gap-30 ms-5">
                                        <button
                                            className="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            type="button"
                                        >
                                            Thêm Giỏ Hàng
                                        </button>
                                        <button className="button signup">Mua Ngay</button>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <div>
                                        <a href="/#">
                                            <AiOutlineHeart className="fs-5 me-2" /> Thêm vào yêu thích
                                        </a>
                                    </div>
                                </div>
                                <div className="d-flex gap-10 flex-column  my-3">
                                    <h3 className="product-heading">Vận chuyển & Đổi trả :</h3>
                                    <p className="product-data">
                                        Miễn phí vận chuyển và trả lại có sẵn trên tất cả các đơn đặt hàng! <br /> Chúng tôi vận chuyển tất cả các đơn đặt hàng trong vòng
                                        <b> 3-5 ngày </b>tính từ ngày đặt!
                                    </p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-3">
                                    <h3 className="product-heading">Link sản phẩm:</h3>
                                    <a
                                        href="#!"
                                        onClick={() => {
                                            copyToClipboard(
                                                "https://www.google.com.vn/"
                                            );
                                        }}
                                    >
                                        here
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="popular-wrapper py-2 home-wrapper-2">
                <div className="row">
                    <div className="col-12 pt-2">
                        <h4 className="section-heading">Sản Phẩm Tương Tự</h4>
                    </div>
                </div>
                <div className="row">
                    <ProductCard />
                </div>
            </Container>
            <Container class1="description-wrapper py-2 home-wrapper-2">
                <div className="row dsp-row">
                    <div className="col-8 dsp-col">
                        <p>{singleProductForm.productInfo.pDescription !== null && singleProductForm.productInfo.pDescription !== "" && singleProductForm.productInfo.pDescription}</p>
                    </div>
                    <div className="col-4 pe-0">
                        <h4 className="section-heading dsp-col py-2 ps-1 dsp-col mb-0"> <FontAwesomeIcon icon={faGear} className="color-primary ps-1" /> <span className="ps-2 color-primary">Thông số kỹ thuật</span></h4>
                        <div className="bg-white p-3">
                            <table id="monitorTable" className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" className="yee-text-fw-bold yee-br-b-none">Màn hình</th>
                                        <th scope="col" className="yee-br-b-none">&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { singleProductForm.productDetail.monitorTech !== null && singleProductForm.productDetail.monitorTech !== '' &&
                                        <tr>
                                            <td className="col-5">Công nghệ màn hình</td>
                                            <td className="col-7">{singleProductForm.productDetail.monitorTech}</td>
                                        </tr>
                                    }
                                    { singleProductForm.productDetail.monitorWide && 
                                        <tr>
                                            <td className="col-5">Màn hình rộng</td>
                                            <td className="col-7">{singleProductForm.productDetail.monitorWide}</td>
                                        </tr>
                                    }
                                    <tr>
                                        <td className="col-5">Mặt kính cảm ứng</td>
                                        <td className="col-7">{singleProductForm.productDetail.touchGlassSurface}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-5">Độ phân giải</td>
                                        <td className="col-7">{singleProductForm.productDetail.monitorResolution}</td>
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
                                        <td className="col-5">Đèn Flash</td>
                                        <td className="col-7">{singleProductForm.productDetail.flashLight}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-5">Độ phân giải</td>
                                        <td className="col-7">{singleProductForm.productDetail.afterResolution}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-5">Quay phim</td>
                                        <td className="col-7">{singleProductForm.productDetail.film}</td>
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
                                        <td className="col-7">{singleProductForm.productDetail.beforeResolution}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-5">Video Call</td>
                                        <td className="col-7">{singleProductForm.productDetail.videoCall}</td>
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
                                        <td className="col-7">{singleProductForm.productDetail.cpu}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-5">Hệ điều hành</td>
                                        <td className="col-7">{singleProductForm.productDetail.operatingSystem}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-5">Chip đồ họa (GPU)</td>
                                        <td className="col-7">{singleProductForm.productDetail.gpu}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="reviews-wrapper home-wrapper-2 mb-2">
                <div className="row dsp-row">
                    <div className="col-8 dsp-col">
                        <h4 id="review" className="review-heading pt-2">
                            <FontAwesomeIcon icon={faPenToSquare} className="color-primary ps-1" />
                            <span className="ps-2 color-primary">Đánh giá từ người dùng về {singleProductForm.productInfo.productTitle}</span>
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
                                        <a className="color-link" href="#!">
                                            <FontAwesomeIcon icon={faPenToSquare} className="color-link ps-1" /> <span className="color-link text-decoration-underline">Viết đánh giá của bạn</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="review-form py-4 d-none">
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
                            </div>
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
                                        <span id="timeReview" className="color-777777 text-12">2023-06-05T02:07:18.000Z</span>
                                    </div>
                                    <p className="mt-3">
                                        Giá tốt nhất thị trường & nhân viên nhiệt tình giúp đỡ
                                    </p>
                                </div>
                            </div>
                        </div>
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
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                data-bs-backdrop="false"
                            ></button>
                        </div>
                        <div className="modal-body py-0">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 w-50 ">
                                    <img src={watch} className="img-fluid" alt="product imgae" />
                                </div>
                                <div className="d-flex flex-column flex-grow-1 w-50 .mar-50">
                                    <h6 className="mb-3">Apple Watch</h6>
                                    <p className="mb-1">Quantity: asgfd</p>
                                    <p className="mb-1">Color: asgfd</p>
                                    <p className="mb-1">Size: asgfd</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-0 py-0 justify-content-center gap-30">
                            <button type="button" className="button" data-bs-dismiss="modal">
                                Xem Giỏ Hàng
                            </button>
                            <button type="button" className="button signup">
                                Thanh Toán
                            </button>
                        </div>
                        <div className="d-flex justify-content-center py-3">
                            <Link
                                className="text-dark"
                                to="/product"
                                onClick={() => {
                                    closeModal();
                                }}
                            >
                                Continue To Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProduct;
