import Instance from '../baseURL/Instance'

export const registerAccount = (data) =>{
    const url = '/api/customer/signup';
    return Instance.post(url, data);
}

export const signIn = (data) =>{
    const url = '/api/customer/login';
    return Instance.post(url, data);
}

export const getSignIn = () =>  {
    const url = "/api/customer/login";
    return Instance.get(url);
}

export const forgotPassword = (data) =>{
    const url = '/api/site/forgot-password';
    return Instance.post(url, data);
}

export const headerApi = () =>{
    const url = '/api/customer/headerApi';
    return Instance.get(url);
}

export const getOauth2Token = (urlParams) => {

    const url = '/api/customer/login-google';
    return Instance.post(url,urlParams);
}

export const sendMailForgotPassword = (email) => {

    const url = "/api/customer/send-mail-forgot-password";
    return Instance.post(url,email);
}

export const sendOTP = (email) => {

    const url = "/api/customer/send-otp";
    return Instance.post(url,email);
}

export const getMail = (email) => {
    
    const url = "/api/customer/get-email";
    return Instance.post(url,email);
}

export const activateUser = (obj) => {
    
    const url = "/api/customer/activate?email="+obj.email+"&otp="+obj.otp;
    return Instance.get(url);
}

export const getMe = () => {

    const url = "/api/user/get-me";
    return Instance.get(url);
}

export const updateInfoAPI = (info) => {
    
    const url = "/api/user/change-info";
    return Instance.post(url,info);
}

export const changePassword = (info) => {

    const url = "/api/user/change-password";
    return Instance.post(url,info); 
}

export const getUserInfo = async (data) => {

    const url = "/api/user/get-user-info";
    return Instance.post(url,data);
};

export const updateUserInfo = async (data) => {

    const url = "/api/user/update-info-user";
    return Instance.post(url,data);
};

export const addNewUser = async (data) => {

    const url = "/api/customer/add-new-user";
    return Instance.post(url,data);
};