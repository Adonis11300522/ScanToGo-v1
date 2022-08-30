import Axios from "./instance";

export const loginApi = (email, password) => {
    return new Promise((resolve, reject) => {
        Axios.post('/login', { email: email, password: password })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject({ status: 'error' })
            })
    })
}

export const signUpApi = (firstName, lastName, email, password, confirmPassword) => {
    return new Promise((resolve, reject) => {
        Axios.post('/signup', { first_name: firstName, last_name: lastName, email: email, password: password, password_confirmation: confirmPassword })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject({ status: 'error' })
            })
    })
}

export const getFiles = (user_id, file_name, index_page, per_page,) => {
    return new Promise((resolve, reject) => {
        Axios.post('/files', { user_id: user_id, file_name: file_name, index_page: index_page, per_page: per_page })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err)
                reject({ data: [], count: 0 });
            })
    })
}

export const updateProfile = (data) => {
    return new Promise((resolve, reject) => {
        Axios.post('/update_profile', data)
            .then((res) => {
                resolve(res.data)
            })
            .catch(err => {
                reject("error")
            })
    })
}

export const getProfile = (id) => {
    return new Promise((resolve, reject) => {
        Axios.post('/get_profile', { id: id })
        .then((res) => {
            resolve(res.data)
        })
        .catch(err=> {
            reject([])
        })
    })
}