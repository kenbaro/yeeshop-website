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