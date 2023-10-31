import Instance from '../baseURL/Instance';

export const getSingleProductApi = (params) =>  {

    const url = "/api/customer/getSingleProductApi/"+params.SKU+"/"+params.storage+"/"+params.color;
    return Instance.get(url);
}