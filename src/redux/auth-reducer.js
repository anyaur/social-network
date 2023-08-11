import { AuthAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } })

export const getAuthUserData = () => async (dispatch) => {
    let response = await AuthAPI.me();
           
                if (response.data.resultCode === 0) {
                    let { id, email, login } = response.data.data
                    dispatch(setAuthUserData(id, email, login, true))
                }

    }




export const login = (loginData, setStatus) => {
    return (dispatch) => {
        AuthAPI.login(loginData.email, loginData.password, loginData.rememberMe)
            .then(data => {
                if(data.data.resultCode === 0) {
                    dispatch(getAuthUserData())
                } else {
                    setStatus({error: 'Неправильный логин или пароль'})
                }
            })
    }
}

export const logout = () => (dispatch) => {
    AuthAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}

export default authReducer;