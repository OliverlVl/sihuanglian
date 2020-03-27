const getters = {
    sidebar: state => state.app.state.sidebar,
    token: state => state.user.state.token,
    userName: state => state.user.userName,
    userId: state => state.user.userId,
    account: state => state.user.account
}
export default getters
