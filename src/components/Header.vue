<template>
    <div class="header bg-theme-color">
        <div class="container">
            <span class="logo pull-left">
                <router-link to="/" exact active-class>
                    <Icon type="ios-umbrella" /> 格子伞
                </router-link>
            </span>
            <div class="search pull-left hidden-xs hidden-sm">
                <!-- bootstrap实现 -->
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="搜索你感兴趣的内容...">
                    <span class="input-group-btn">
                        <a class="btn btn-danger" style="color: #fff;">搜索</a>
                    </span>
                </div>
            </div>
            <div class="nav-bar hidden-xs">
                <ul class="nav navbar-nav">
                    <router-link to="/" tag="li" exact>首页</router-link>
                    <router-link to="/find" tag="li">发现</router-link>
                    <router-link to="/notification" tag="li">消息</router-link>
                </ul>
            </div>
            <div class="login-reg">
                <span class="login-off pull-right" v-if="!isLogin">
                    <router-link to="/login" class="btn btn-normal btn-primary" active-class>登录</router-link>
                </span>
                <div class="profile list-group pull-right" v-if="isLogin">
                    <a class="list-group-item login-on">
                        <img class="avatar" :src="user.avatar" />
                        <span>{{user.loginName}}</span>
                    </a>
                    <a class="list-group-item profile-item">
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>我的主页
                    </a>
                    <router-link to="/conversation" class="list-group-item profile-item">
                        <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>私信
                    </router-link>
                    <a class="list-group-item profile-item">
                        <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>设置
                    </a>
                    <a @click.prevent="logout" class="list-group-item profile-item">
                        <span class="glyphicon glyphicon-off" aria-hidden="true"></span>退出
                    </a>
                </div>
            </div>
            <div class="add-question pull-right" v-if="isLogin">
                <a class="btn btn-info" @click="dialogFormVisible = true">提问</a>
                <el-dialog
                    :visible.sync="dialogFormVisible"
                    top="20vh"
                    custom-class="add-question-dialog"
                    :center="true"
                    width="500px"
                    title="提问">
                    <el-form :model="question">
                        <el-form-item label="" :label-width="formLabelWidth">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 1, maxRows: 5}"
                                v-model="question.title"
                                placeholder="写下你的问题，准确地描述问题更容易得到解答">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="" :label-width="formLabelWidth">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 1, maxRows: 5}"
                                v-model="question.content"
                                placeholder="输入问题背景、条件等详细信息（选填）">
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align: right;">
                        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
                        <el-button size="small" type="primary" @click="addQuestion">发布问题</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
        <BackTop style="background-color: #F1F1F1;"></BackTop>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                keyword: '',
                dialogFormVisible: false,
                question: {title: '', content: ''},
                formLabelWidth: '0'
            };
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            },
            user() {
                return this.$store.state.user;
            }
        },
        created() {
            /* 检测登录状态 */
            this.$store.dispatch('checkLoginAction');
        },
        methods: {
            /* 退出登录 */
            logout() {
                this.$http.get('user/logout')
                    .then((response) => {
                        if (response.body.code === 200) {
                            // 退出登录，清除sessionStorage中的user信息和cookie中的ticket，跳转到登录页
                            sessionStorage.removeItem('user');
                            this.$cookie.delete('ticket');
                            this.$router.push('/login');
                            this.$store.dispatch('checkLoginAction');
                        }
                    });
            },
            /* 发布问题 */
            addQuestion() {
                this.$http.post('question', this.question)
                    .then((response) => {
                        if (response.body.code === 200) {
                            this.dialogFormVisible = false;
                            // 清空输入框内容
                            this.question.title = '';
                            this.question.content = '';
                            this.$Message.info({
                                content: response.body.msg,
                                duration: 3,
                                closable: true
                            });
                            // 更新questions
                            this.$store.dispatch('getQuestionsAction');
                        }
                    });
            }
        }
    };
</script>

<style scoped>
    .header{width: 100%;height: 50px;}
    .header a{text-decoration: none;color: #FFFFFF;}
    .header a:hover{text-decoration: none;color: #FFFFFF;}
    .header .logo{width: 100px;line-height: 50px;font-size: 18px;text-align: center;}
    .header .search{width: 300px;line-height: 50px;}
    .header .search input{float: none;outline: none;border: none;}
    .nav-bar{height: 50px;float: left;line-height: 50px;margin-left: 20px;}
    .nav-bar li{padding: 0px 20px;color: #CDCDCD;cursor: pointer;}
    .nav-bar li:hover{background: #563D7C!important;color: #FFFFFF;}
    .active{background: #563D7C!important;}
    .add-question{line-height: 50px;}
    .add-question a{padding: 6px 20px;}
    .login-reg .login-off{line-height: 50px;}
    .login-reg .login-off a{padding: 6px 25px;color: #FFFFFF;}
    .profile{width: 120px;height: 50px;border-radius: 0px;margin-left: 25px;}
    .profile .list-group-item{background: #514D8D;color: #C0C0C0!important;border: none;border-top: 1px solid #563D7C;z-index: 1;}
    .profile .list-group-item:hover{background: #563D7C!important;color: #FFFFFF!important;}
    .profile-item{display: none;}
    .profile .list-group-item:first-child{border-radius: 0px;border: none;}
    .profile:hover .profile-item{
        display: block;
    }
    .profile .login-on{height: 50px;}
    .login-on span{margin-left: 5px;font-size: 16px;}
    .profile .avatar{width: 28px;height: 28px;border-radius: 14px;}
    .login-reg .glyphicon{margin: 0 11px 0 0;}
</style>
