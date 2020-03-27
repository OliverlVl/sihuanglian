import {dataFormat} from '../../utils'

const app = {
    state: {
        sidebar: {
            isCollapse: false
        },
        default: {
            page: 1,
            pageSize: 15,
            pageSizeList: [10, 15, 30, 50]
        },
        routes: []
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            state.sidebar.isCollapse = !state.sidebar.isCollapse;
            // console.log(  state.sidebar.isCollapse )
        },
        MERGE_DEFAULT_DATA: (state, data) => {
            if (dataFormat.isNull(data)) return;
            let res = dataFormat.objectMerge(state.default, data, true);
            state.default = res;
        },
        UPDATE_ROUTES: (state, data) => {
            state.routes = data;
        }
    },
    actions: {
        toggleSideBar ({commit}) {
            // console.log('toggleSideBar commit')
            commit('TOGGLE_SIDEBAR');
        },
        updateRoutes ({commit}, data) {
            commit('UPDATE_ROUTES', data);
        },
        updateDefault ({commit}, data) {
            commit('MERGE_DEFAULT_DATA', data);
        }
    }
}

export default app
