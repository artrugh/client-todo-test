import axios from 'axios';

export const getUser = async (jwt) => {

    try {
        const res = await axios({
            method: 'get',
            url: '/api/user',
            timeout: 4000,    // 4 seconds timeout
            headers: {
                'x-auth-token': jwt
            }
        });
        return res
    } catch (err) {
        console.log(err);
        return err.response
    }
};

export const addItem = async (jwt, item) => {

    try {
        const res = await axios({
            method: 'post',
            url: '/api/todo',
            timeout: 4000,    // 4 seconds timeout
            data: {
                item: item
            }, headers: {
                'Content-Type': 'application/json',
                'x-auth-token': jwt
            }
        });
        return res
    } catch (err) {
        console.log(err.response);
        return err.response
    }
};

export const deleteItem = async (jwt, id) => {

    try {
        const res = await axios({
            method: 'delete',
            url: `/api/todo/${id}`,
            timeout: 4000,    // 4 seconds timeout
            headers: {
                'x-auth-token': jwt
            }
        });

        return res
    } catch (err) {
        console.log(err);
        return err.response
    }
};


export const changeTodoStatus = async (jwt, id) => {

    try {
        const res = await axios({
            method: 'put',
            url: `/api/todo/status/${id}`,
            timeout: 4000,    // 4 seconds timeout
            headers: {
                'x-auth-token': jwt
            }
        });

        return res
    } catch (err) {
        console.log(err);
        return err.response
    }
};

export const sign = async (userData) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/api/sign',
            timeout: 4000,    // 4 seconds timeout
            data: {
                name: userData.name,
                email: userData.email,
                password: userData.password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res
    } catch (err) {
        console.log(err);
        return err.response.data
    }
};

export const login = async (userData) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/api/login',
            timeout: 4000,    // 4 seconds timeout
            data: {
                email: userData.email,
                password: userData.password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        return res
    } catch (err) {
        console.log(err);
        return err.response.data
    }
};


export const logout = async (jwt) => {
    try {
        const res = await axios({
            method: 'put',
            url: '/api/logout',
            timeout: 4000,    // 4 seconds timeout
            headers: {
                'x-auth-token': jwt
            }
        })
        return res
    } catch (err) {
        console.log(err);
        return err.response.data
    }
};