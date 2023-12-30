import axios from 'axios'
import { YEE_TOKEN } from '../constants/YeeConst';
import jwt_decode from 'jwt-decode';

const Instance = axios.create({
    baseURL: "http://192.168.1.21:9090",
    headers:{
        "Content-Type" : "application/json",
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
        'Access-Control-Allow-Headers': 'Accept,Authorization, Content-Type',
        'Access-Control-Allow-Credentials': 'true',
    }
});

Instance.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem('accessToken') 

  if(accessToken) {
    const decodedToken = jwt_decode(accessToken)
    if(decodedToken.exp * 1000 < new Date().getTime()) {
      accessToken  = await refreshToken()
      localStorage.setItem('accessToken', accessToken )
      
    }
    config.headers.Authorization = 'Bearer ' + accessToken 
  }
  
  return config;
});

const refreshToken = () => {

  return localStorage.getItem(YEE_TOKEN.ACCESS_TOKEN)
  ? localStorage.getItem(YEE_TOKEN.ACCESS_TOKEN)
  : null;
}
export default Instance