import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/Index';
import Login from '../components/Login';
import Question from '../components/Question';
import Conversation from '../components/Conversation';
import Letter from '../components/Letter';
import Page404 from '../components/Page404';
import Notification from '../components/Notification';
import Unactivated from '../components/Unactivated';
import Auth from '../components/Auth';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/404',
            name: '404',
            component: Page404
        },
        /* 未激活 */
        {
            path: '/user/unactivated',
            name: 'Unactivated',
            component: Unactivated
        },
        /* 激活功能 */
        {
            path: '/user/auth',
            name: 'Auth',
            component: Auth
        },
        /* 首页 */
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        /* 登录注册页 */
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        /* 问题详细页 */
        {
            path: '/question/:questionId',
            name: 'Question',
            component: Question
        },
        /* 私信列表页 */
        {
            path: '/conversation',
            name: 'Conversation',
            component: Conversation
        },
        /* 私信详细页 */
        {
            path: '/letter/:conversationId',
            name: 'Letter',
            component: Letter
        },
        /* 通知列表页 */
        {
            path: '/notification',
            name: 'Notification',
            component: Notification
        }
    ],
    /* router-link元素激活时的css类名 */
    linkActiveClass: 'active'
});
