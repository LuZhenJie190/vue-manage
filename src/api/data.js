import axios from "./axios";

export const getData = () => {
    return axios.request({
        url: "/home/getData"
    })
}

export const createUser = (params) => {
    return axios.request({
        url: '/user/createUser',
        method: 'post',
        data: params
    })
}

export const updateUser = (params) => {
    return axios.request({
        url: '/user/updateUser',
        method: 'post',
        data: params
    })
}

export const getAbouUser = (params) => {
    return axios.request({
        url: `/user/getAbouUser`,
        method: 'get',
        params
    })
}

///user/del

export const delUser = (id) => {
    return axios.request({
        url: `/user/del`,
        method: 'get',
        data: id
    })
}

///permissionApi/getMenu

export const getMenu = (params) => {
    return axios.request({
        url: `/permissionApi/getMenu`,
        method: 'post',
        data: params
    })
}