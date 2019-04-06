import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const VueObj = new Vue();
export default new Vuex.Store({
    state: {
        /* 登录状态：未登录 */
        isLogin: false,
        /* 登录用户信息 */
        user: {avatar: '', loginName: ''},
        /* 问题Questions */
        questions: ''
    },
    // 改变状态的方法
    mutations: {
        /* 检查登录状态 */
        checkLogin(state) {
            let ticketCookie = VueObj.$cookie.get('ticket');
            let userStorage = JSON.parse(sessionStorage.getItem('user'));
            if (ticketCookie == null || userStorage == null) {
                state.isLogin = false;
            }
            if (userStorage != null) {
                state.isLogin = true;
                // let userObj = JSON.parse(decodeURIComponent(user));
                state.user.avatar = userStorage.avatar;
                state.user.loginName = userStorage.loginName;
            }
        },
        /* 获取全部最新问题 */
        getQuestions(state) {
            VueObj.$http.get('question/all')
                .then((response) => {
                    if (response.body.code === 0) {
                        state.questions = response.body.data.questions_info;
                    }
                });
        }
    },
    /* 驱动action使得mutations可以启动 */
    actions: {
        checkLoginAction({commit}) {
            commit('checkLogin');
        },
        getQuestionsAction({commit}) {
            commit('getQuestions');
        }
    }
});
