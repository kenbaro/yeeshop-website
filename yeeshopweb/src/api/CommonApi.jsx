import Instance from '../baseURL/Instance';

export const getHeaderApi = () =>  {

    const url = "/api/customer/headerApi";
    return Instance.get(url);
}

export const getContactInfo = () => {

    const url = "/api/customer/contact";
    return Instance.get(url);
}