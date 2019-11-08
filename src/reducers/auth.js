
export default function auth(state = {}, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { token: action.token, message: '' }

        case 'LOGOUT_SUCCESS':
            return { message: '' }

        case 'LOGIN_ERROR':
        case 'REGISTER_ERROR':
            return { message: action.message }

        default:
            if (localStorage.token)
                return { token: localStorage.token }
            else
                return state;
    }
}