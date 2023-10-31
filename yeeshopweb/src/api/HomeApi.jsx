import Instance from '../baseURL/Instance';

export const getHomeApi = () =>  {

    const url = "/api/customer/home";
    return Instance.get(url);
}