<template>
    <div class="login-wrap">
        <div class="login-html">
            <input id="tab-1" type="radio" name="tab" class="sign-in" :checked="loginChecked" @click="registerChecked=false;loginChecked=true;" />
            <label for="tab-1" class="tab">登录</label>
            <input id="tab-2" type="radio" name="tab" class="sign-up" :checked="registerChecked" @click="loginChecked=false;registerChecked=true;" />
            <label for="tab-2" class="tab">注册</label>
            <div class="login-form">
                <div class="sign-in-htm">
                    <form :model="loginUser">
                        <div class="group">
                            <label class="label">用户名</label>
                            <input type="text" class="input" v-model="loginUser.loginString" placeholder="邮箱/手机号/用户名">
                        </div>
                        <div class="group">
                            <label class="label">密码</label>
                            <input type="password" class="input" v-model="loginUser.password" placeholder="密码">
                        </div>
                        <!-- <div class="group">
                                <input id="check" type="checkbox" class="check" checked>
                                <label for="check"><span class="icon"></span> 近期自动登录</label>
                            </div> -->
                        <div class="group">
                            <input type="button" class="button" value="登录" @click="doLogin">
                        </div>
                    </form>
                    <div class="hr"></div>
                    <div style="text-align: center;">
                        还没有账号？<a @click.prevent="loginChecked=false;registerChecked=true;"> 立即注册</a>
                    </div>
                </div>
                <div class="sign-up-htm">
                    <form :model="registerUser">
                        <div class="group">
                            <label class="label">Username</label>
                            <input type="text" class="input" v-model="registerUser.loginName" placeholder="用户名">
                        </div>
                        <div class="group">
                            <label class="label">Password</label>
                            <input type="password" class="input" v-model="registerUser.password" placeholder="密码">
                        </div>
                        <!--<div class="group">
                            <label class="label">Repeat Password</label>
                            <input type="password" class="input" placeholder="确认密码">
                        </div>-->
                        <div class="group">
                            <label class="label">Email Address</label>
                            <input type="text" class="input" v-model="registerUser.email" placeholder="邮箱">
                        </div>
                        <div class="group">
                            <input type="button" class="button" value="立即注册" @click="doRegister">
                        </div>
                    </form>
                    <div class="hr"></div>
                    <div style="text-align: center;">
                        已有账号？<a @click.prevent="loginChecked=true;registerChecked=false;"> 前去登录</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                loginChecked: true,
                registerChecked: false,
                loginUser: {
                    loginString: '',
                    password: ''
                },
                registerUser: {
                    loginName: '',
                    password: '',
                    email: ''
                }
            };
        },
        methods: {
            /* 登录 */
            doLogin() {
                this.$http.post('user/login', this.loginUser)
                    .then((response) => {
                        if (response.body.code === 200) {
                            this.$Message.info(response.body.msg);
                            // 将登录用户信息存储到sessionStorage中
                            sessionStorage.setItem('user', JSON.stringify(response.body.data.user));
                            this.$store.dispatch('checkLoginAction');
                            if (this.$route.query.previousHostname === location.hostname) {
                                // 防止第一次访问项目直接访问登录页面的情况
                                this.$router.go(-1);
                            } else {
                                this.$router.push('/');
                            }
                        }
                    });
            },
            /* 注册 */
            doRegister() {
                this.$http.post('user/register', this.registerUser)
                    .then((response) => {
                        if (response.body.code === 200) {
                            this.$Message.info(response.body.msg);
                            // 注册成功跳转到未激活
                            this.$router.push({
                                name: 'Unactivated',
                                params: {loginName: response.body.data.loginName, email: response.body.data.email}
                            });
                            // // 清空输入框内容
                            // this.registerUser.loginName = '';
                            // this.registerUser.password = '';
                            // this.registerUser.email = '';
                            // // 注册成功则切换到登录
                            // this.loginChecked = true;
                            // this.registerChecked = false;
                        }
                    });
            }
        }
    };
</script>

<style scoped>
    input, button {
        outline: none;
        border: none;
    }
    .login-wrap{
        width:100%;
        margin:30px auto;
        max-width:500px;
        min-height:470px;
        position:relative;
        background:url(../../static/images/login_bg.jpg) no-repeat center;
        box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
        border-top: 6px solid #514D8D;
    }
    .login-html{
        width:100%;
        height:100%;
        position:absolute;
        padding:50px 70px 50px 70px;
        background:rgba(255,255,255,.8);
    }
    .login-html .sign-in-htm,
    .login-html .sign-up-htm{
        top:0;
        left:0;
        right:0;
        bottom:0;
        position:absolute;
        -webkit-transform:rotateY(180deg);
        transform:rotateY(180deg);
        -webkit-backface-visibility:hidden;
        backface-visibility:hidden;
        -webkit-transition:all .4s linear;
        transition:all .4s linear;
    }
    .login-html .sign-in,
    .login-html .sign-up{
        display:none;
    }
    .login-html .tab{
        width: 100px;
        text-align: center;
        color: #2F4056;
        font-size:22px;
        padding-bottom:5px;
        margin:0 15px 10px 0;
        display:inline-block;
        border-bottom:2px solid transparent;
    }
    .login-html .sign-in:checked + .tab,
    .login-html .sign-up:checked + .tab{
        color:#563D7C;
        border-color:#563D7C;
    }
    .login-form{
        min-height:345px;
        position:relative;
        -webkit-perspective:1000px;
        perspective:1000px;
        -webkit-transform-style:preserve-3d;
        transform-style:preserve-3d;
    }
    .login-form .group{
        margin-bottom:10px;
    }
    .login-form .group .label,
    .login-form .group .input{
        color: black;
    }
    .login-form .group .input,
    .login-form .group .button{
        width:100%;
        display:block;
        border:none;
        padding:8px 10px;
        border: 1px solid #CDCDCD;
        border-radius:5px;
    }
    .login-form .group .label{
        color:#aaa;
        font-size:12px;
    }
    .login-form .group .button{
        color: white;
        background:#563D7C;
    }
    /* .login-form .group label .icon{
        width:15px;
        height:15px;
        border-radius:2px;
        position:relative;
        display:inline-block;
        background:rgba(255,255,255,.1);
    }
    .login-form .group label .icon:before,
    .login-form .group label .icon:after{
        content:'';
        width:10px;
        height:2px;
        background:#fff;
        position:absolute;
        -webkit-transition:all .2s ease-in-out 0s;
                transition:all .2s ease-in-out 0s;
    }
    .login-form .group label .icon:before{
        left:3px;
        width:5px;
        bottom:6px;
        -webkit-transform:scale(0) rotate(0);
            -ms-transform:scale(0) rotate(0);
                transform:scale(0) rotate(0);
    }
    .login-form .group label .icon:after{
        top:6px;
        right:0;
        -webkit-transform:scale(0) rotate(0);
            -ms-transform:scale(0) rotate(0);
                transform:scale(0) rotate(0);
    }
    .login-form .group .check:checked + label{
        color:#fff;
    }
    .login-form .group .check:checked + label .icon{
        background:#1161ee;
    }
    .login-form .group .check:checked + label .icon:before{
        -webkit-transform:scale(1) rotate(45deg);
            -ms-transform:scale(1) rotate(45deg);
                transform:scale(1) rotate(45deg);
    }
    .login-form .group .check:checked + label .icon:after{
        -webkit-transform:scale(1) rotate(-45deg);
            -ms-transform:scale(1) rotate(-45deg);
                transform:scale(1) rotate(-45deg);
    } */
    .login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
        -webkit-transform:rotate(0);
        -ms-transform:rotate(0);
        transform:rotate(0);
    }
    .login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
        -webkit-transform:rotate(0);
        -ms-transform:rotate(0);
        transform:rotate(0);
    }
    .hr{
        height:2px;
        margin:50px 0 20px 0;
        background:rgba(86,61,124,.2);
    }
</style>
