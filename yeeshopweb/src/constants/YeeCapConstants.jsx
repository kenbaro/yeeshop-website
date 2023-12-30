// YeeShop Cap Message
// @author XiaoYi
// START FOOTER
export const YEE_CAP_1_FOOTER_SOCIALS = "Mạng Xã Hội";
export const YEE_CAP_2_FOOTER_REGIST_NOTIFICATION = "Đăng Ký Email Nhận Thông Báo";
export const YEE_CAP_3_FOOTER_CONTACT = "Liên Hệ";
export const YEE_CAP_4_FOOTER_INFO = "Thông Tin";
export const YEE_CAP_5_FOOTER_ACCOUNT = "Tài Khoản";
export const YEE_CAP_6_FOOTER_BRAND = "Thương Hiệu";
export const YEE_CAP_7_FOOTER_ADDRESS = "Địa Chỉ : 01 Võ Văn Ngân, Linh Chiểu <br /> Thành Phố Thủ Đức, Thành Phố Hồ Chí Minh <br /> PinCode: 700000";
export const YEE_CAP_8_FOOTER_HOSTLINE = "Hotline: +84 812200898";
export const YEE_CAP_9_FOOTER_EMAIL = "Email: xiaoyi@bypass.hax";
export const YEE_CAP_10_FOOTER_WORKING = "Online: Thứ 2 - Chủ Nhật 10 AM - 8 PM";
// END FOOTER

export const YeeCap = {

    FULLNM:{
        EMPTY_NM: "Họ và tên không được để trống !",
        SPECIAL_CHAR_NM: "Họ tên không được chứa ký tự đặc biệt",
    },
    PHONE: {
        EMPTY_PHONE: "Số điện thoại không được để trống",
        NOT_NUMBER: "Số điện thoại không đúng định dạng",
        LENGTH_10: "Số điện thoại phải bao gôm 10 chữ số",
    },
    EMAIL: {
        INVALID_FORMAT_EMAIL: "Email chưa đúng định dạng !",
        EMPTY_EMAIL: "Email không được bỏ trống !",
    },
    PASSWORD: {
        EMPTY_PW: "Mật khẩu không được bỏ trống !",
        SPECIAL_CHAR_PW: "Mật khẩu không được chứa ký tự đặc biệt",
        MAX_20: "Mật khẩu không được vượt quá 20 ký tự",
        MIN_6: "Mật khẩu không được nhỏ hơn 6 ký tự",
        NOT_MATCH: "Mật khẩu xác nhận không trùng khớp với mật khẩu."
    },
    REGEX_STR: {

        NOT_SPECIAL_CHAR: /^[A-Za-z0-9]+$/,
        NOT_PHONE_NUMBER: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

    },
    ADDRESS: {
        EMPTY_ADDRESS: "Địa chỉ không được bỏ trống !",
    },
    OTP: {
        EMPTY: "Mã OTP không được rỗng",
        LENGTH_6: "Mã OTP là mã gồm 6 chữ số",
    },
}

export const YeeUI = {

    YEE_CAP_LOGIN: {
        LOGIN_TITLE: "Đăng Nhập",
        LOGIN_EMAIL: "Email",
        LOGIN_PASSWORD: "Mật Khẩu",
        LOGIN_SAVE_INFO: "Lưu thông tin mật khẩu",
        LOGIN_SHOW_PW: "Hiện mật khẩu",
        LOGIN_FORGOT_PW: "Quên mật khẩu?",
        LOGIN_SIGNUP: "Đăng Ký",
        SIGN_OUT: "Đăng xuất",
        LOGIN_SIGNUP_NOW: "Đăng ký ngay",
    },
    YEE_CAP_SIGNUP : {
        SIGN_UP_TITLE: "Đăng ký",
        SIGN_UP_SUB_TILTE: "Nếu bạn đã có tài khoản, vui lòng",
        SIGN_UP_YOUR_INFO: "Thông tin của bạn",
        SIGN_UP_YOUR_PW: "Mật khẩu của bạn",
        SIGN_UP_FULL_NM: "Họ tên:",
        SIGN_UP_PHONE: "SĐT:",
        SIGN_UP_CONFIRM_PW: "Xác nhận mật khẩu",
    }
}
