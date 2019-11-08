import { push } from "connected-react-router";
import { loadTodos } from "./todo";

const API_URL = "https://pomonatodo.herokuapp.com";

const loginSuccess = (token) => ({
    type: 'LOGIN_SUCCESS',
    token
})

const registerError = (message) => ({
    type: 'REGISTER_ERROR',
    message
})

const loginError = (message) => ({
    type: 'LOGIN_ERROR',
    message
})

//START REGISTER
export const postRegister = user => {
    return dispatch => {
        return fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    dispatch(registerError(data.data.message));
                } else {
                    localStorage.setItem("token", data.data.token);
                    dispatch(push('/'))
                    dispatch(loginSuccess(data.data.token));
                }
            }).catch(err => console.log(err))
    }
}

// START LOGIN
export const postLogin = user => {
    return dispatch => {
        return fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                if (data.data.message) {
                    dispatch(loginError(data.data.message));
                } else {
                    localStorage.setItem("token", data.data.token)
                    dispatch(loginSuccess(data.data.token))
                    dispatch(loadTodos())
                }
            }).catch(err => console.log(err))
    }
}

// START LOGOUT
export const logoutSuccess = () => ({
    type: 'LOGOUT_SUCCESS'
})






