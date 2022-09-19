import axios  from "axios";


export const API_BASE_URL = "http://localhost:8000/api";


//headers 
const headers = {
    "Content-Type": "application/json"
    
}

//fetch get request with token
export const fetchGetAuth = (url ,params) => {
    let token = localStorage.getItem("token");
    token = token.replaceAll('"', '');
    return axios.get(API_BASE_URL + url, {
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`
        },
        params: params,
    });
}
//fetch get request
export const fetchGet = (url ,params) => {
    return axios.get(API_BASE_URL + url, {
        headers: {
            ...headers,
        },
        params: params,
    });
}
//fetch post request
export const fetchPost = (url, data) => {
    return axios.post(API_BASE_URL + url, data, {
        headers: {
            ...headers,
        },
    });
}
//fetch post request with token
export const fetchPostAuth = (url, data, accessToken) => {
    let token = localStorage.getItem("token");
    token = token.replaceAll('"', '');
    return axios.post(API_BASE_URL + url, data, {
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`
        },
    });
}



