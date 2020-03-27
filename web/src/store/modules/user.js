import loginAPI from '../../api/loginAPI'
import {getToken, setToken, removeToken, setExpiredTime} from '../../utils/auth'
import router from '../../router'

const user = {
    state: {
        userName: '',
        userId: undefined,
        account: '',
        token: '',
        sex: '',
        email: ''
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERNAME: (state, userName) => {
            state.userName = userName
        },
        SET_USERID: (state, userId) => {
            state.userId = userId
        },
        SET_ACCOUNT: (state, account) => {
            state.account = account
        },
        SET_SEX: (state, sex) => {
            state.sex = sex
        },
        SET_EMAIL: (state, email) => {
            state.email = email
        }
    },
    actions: {
        updateUserInfo ({commit}, data, token) {
            let {userName, account, sex, email} = data;
            commit('SET_USERNAME', userName);
            commit('SET_ACCOUNT', account);
            commit('SET_SEX', sex);
            commit('SET_EMAIL', email);
            commit('SET_USERID', data.id);
            commit('SET_TOKEN', token);
        },
        Locked ({commit}) {
            removeToken();
            router.push({path: '/login'})
        },
        LoginByAccount ({commit}, data) {
            const account = data.account;
            const password = data.password;
            return new Promise((resolve, reject) => {
                loginAPI.login(account, password).then(response => {
                    // debugger
                    console.log(response);
                    const token = response.data.token;
                    const userName = response.data.userName;
                    console.log(userName);
                    const userId = response.data.userId;
                    const account = response.data.account;
                    commit('SET_TOKEN', token);
                    // commit('SET_USERNAME', userName);
                    // commit('SET_USERID', userId);
                    // commit('SET_ACCOUNT', account);
                    setToken(token); // 设置token
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
            // console.log('LoginByAccount', password)
        },
        // 登出
        LogOut ({commit, state}) {
            return new Promise((resolve, reject) => {
                loginAPI.logout().then(() => {
                    commit('SET_TOKEN', '');
                    // commit('SET_ROLES', [])
                    removeToken();
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user
