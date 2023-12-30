// YeeConst
// author Thai Duy Bao

const YEE_CONST_STOCK = {
    "OUT_OF_STOCK" : "Hết Hàng",
    "IN_STOCK" : "Còn Hàng"
}
export {YEE_CONST_STOCK};

const YEE_NUMBER = {
    "NUMBER_ONE": 1,
    "NUMBER_TWO": 2,
    "NUMBER_THREE": 3,
    "NUMBER_FOUR": 4,
    "NUMBER_FIVE": 5,
    "NUMBER_SIX": 6,
    "NUMBER_SEVEN": 7,
    "NUMBER_EIGHT": 8,
    "NUMBER_NINE": 9,
    "NUMBER_TEN": 10,
}

export {YEE_NUMBER}

const YEE_TOKEN = {

    ACCESS_TOKEN : "accessToken",
}
export {YEE_TOKEN}

const YEE_PATH = {

    INDEX: "/",
    LOGIN_PATH: "/login",
}
export {YEE_PATH}

export const YEE_MSG_TYPE = {

    MSG_SUCCESS: 3,
    MSG_ERROR: 0,
    MSG_WARNING: 1,
    MSG_INFO: 2,
}

export const CART_MSG = {
    ADD_CART_SUCCESS : "Thêm giỏ hàng thành công",
    ADD_CART_FAIL : "Không thể thêm giỏ hàng",
    NOT_ENOUGH_QTY: "Số lượng sản phẩm bạn chọn vượt quá số lượng tồn kho.",
    REQUIRE_LOGIN: "Đã xảy ra vấn đề xác thực ở phía máy chủ. Vui lòng đăng nhập để vào giỏ hàng",
    REQUIRE_LOGIN2: "Đã xảy ra vấn đề xác thực ở phía máy chủ. Vui lòng đăng nhập và thử lại sau",

    QTY_0: "Sản phẩm tạm thời hết hàng!",
    QTY_GRT_ODR: "Số lượng sản phẩm đang vượt quá số lượng tồn kho!",
    INVENTORY: "Tồn kho: ",
    ERROR_METHOD: "Phương thức thanh toán hiện đang lỗi, cảm phiền bạn chọn phương thức thanh toán khác hoặc thử lại sau. Xin lỗi vì sự bất tiện này",
    ERROR_SELECT : "Lựa chọn này hiện không khả dụng, cảm phiền lựa chọn phương án khác hoặc thử lại sau. Xin lỗi vì sự bất tiện này !"
}