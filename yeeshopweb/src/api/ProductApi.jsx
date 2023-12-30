import Instance from '../baseURL/Instance';

export const getSingleProductApi = (params) =>  {

    const url = "/api/customer/getSingleProductApi/sku="+params.SKU+"/storage="+params.storage+"/color="+params.color;
    return Instance.get(url);
}

export const getValidateProductApi = (params) =>  {

    const url = "/api/customer/validateProduct/id="+params.SKU+"/qty="+params.qty;
    return Instance.get(url);
}

export const validateProductApi = (data) =>  {

    const url = "/api/customer/validateProduct";
    return Instance.post(url,data);
}

export const getAllProductsApi = (keyWord) =>  {

    const url = "/api/customer/allProduct/keyWord="+keyWord;
    return Instance.get(url);
}

export const findProductFilterApi = (params) => {

    const url="/api/customer/findProductFilter/br="+params.brand+"/fromPr="+params.fromPr+"/toPr="+params.toPr+"/filterBy="+params.filterBy+"/showMore="+params.showMore;
    return Instance.get(url);
}

export const filterProductAPIv1 = (data) => {

    const url="/api/customer/filterProductAPIv1";
    return Instance.post(url,data);
}

export const searchProductAPI = (keyword) => {
    const url = "/api/customer/product-search/keyword="+keyword;
    return Instance.get(url);
} 

export const filterSingleProduct = (color, storage) => {
    const url = `/api/customer/product-detail-filter?color=${color}&storage=${storage}`;
    return Instance.get(url);
} 

export const autoCompleteSearchAPI = (keyword) => {

    const url = "/api/customer/product-auto-complete/keyword="+keyword;
    return Instance.get(url);
}