// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex/store';

import VueResource from 'vue-resource';
import VueCookie from 'vue-cookie';

/* animate.css动画库 */
import 'animate.css/animate.min.css';

/* 在bootstrap之前引入，防止影响bootstrap样式 */
/* import iView from 'iview'; */
/* import 'iview/dist/styles/iview.css'; */

/* iview 按需引入（仍需引入样式） */
import {BackTop, LoadingBar, Message, Icon, Badge} from 'iview';
import 'iview/dist/styles/iview.css';

/* element-ui按需引入 */
import {Popover, Button, Dialog, Form, Input, FormItem} from 'element-ui';

/* bootstrap */
// import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

/* iview组件 */
Vue.component('BackTop', BackTop);
Vue.prototype.$Message = Message;
Vue.prototype.$Loading = LoadingBar;
Vue.component('Icon', Icon);
Vue.component('Badge', Badge);

/* element-ui组件 */
Vue.component(Popover.name, Popover);
Vue.component(Button.name, Button);
Vue.component(Dialog.name, Dialog);
Vue.component(Form.name, Form);
Vue.component(Input.name, Input);
Vue.component(FormItem.name, FormItem);

/* 发送AJAX网络请求组件 */
Vue.use(VueResource);

/* 操作cookie的组件 */
Vue.use(VueCookie);

/* 全局配置loadingBar */
LoadingBar.config({
    color: '#FFFFFF',
    height: 2
});
/* 在发生前端路由请求时的加载进度条 */
router.beforeEach((to, from, next) => {
    LoadingBar.start();
    next();
});
router.afterEach(route => {
    LoadingBar.finish();
});

/* 设置服务端根域名 */
Vue.http.options.root = 'http://127.0.0.1:2333';
/* 设置vue-resource使用post请求时使用application/x-www-form-urlencoded形式发送请求 */
Vue.http.options.emulateJSON = true;
/* 允许客户端处理和发送cookie */
Vue.http.options.credentials = true;
/* vue-resource拦截器 */
Vue.http.interceptors.push((request, next) => {
    /* 进度条开始 */
    LoadingBar.start();
    next((response) => {
        if (!response.ok) {
            LoadingBar.error();
            Message.error({
                content: '服务端异常...',
                duration: 10,
                closable: true
            });
            return;
        }
        // 使用变量接收，避免多次获取
        let body = response.body;
        let code = body.code;
        // 未激活账号
        if (code === 401) {
            console.log(body.data.loginName);
            console.log(body.data.email);
            router.push({
                name: 'Unactivated',
                params: {loginName: body.data.loginName, email: body.data.email}
            });
        }
        // "非正常"的响应
        if (code !== 200 && code !== 0) {
            // 404则直接跳转到404页面
            if (code === 404) {
                router.push({
                    path: '/404'
                });
            } else {
                // 其余则提示服务端返回的响应信息
                Message.warning({
                    content: body.msg,
                    duration: 5,
                    closable: true
                });
                // 未登录或登录身份过期
                if (code === -3) {
                    // 清除登录验证的cookie
                    VueCookie.delete('ticket');
                    VueCookie.delete('user');
                    router.push({
                        path: '/login',
                        /* 传入参数previousHostname用来防止分享登录页面（第一次访问项目访问的是登录页面） */
                        query: {previousHostname: location.hostname}
                    });
                }
            }
        }
        /* 进度条结束 */
        LoadingBar.finish();
        return response;
    });
});
Vue.config.productionTip = false;

function addZero(val) {
    if (val < 10) {
        return '0' + val;
    } else {
        return val;
    }
}

/* 时间格式过滤器 */
Vue.filter('formatDate', function(d) {
    let date = new Date(d);
    let year = date.getFullYear();
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate());
    let hour = addZero(date.getHours());
    let minute = addZero(date.getMinutes());
    let second = addZero(date.getSeconds());
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
