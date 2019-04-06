<template>
    <div id="app">
        <Header/>
        <transition
            enter-active-class="animated fadeInDown"
            leave-active-class="animated fadeOutDown"
            mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import Header from './components/Header';
    export default {
        name: 'App',
        components: {Header}
    };
</script>

<style>
    body{margin: 0;padding: 0;background: #F1F1F1;}
    .bg-theme-color{background: #514D8D;}
    /* message在最顶层弹出 */
    .ivu-message{z-index: 2999!important;}
    .main{border: 1px solid #CDCDCD;min-height: 500px;width: 999px!important; border-radius: 5px;background: #FFFFFF;margin-top: 20px;margin-bottom: 20px;}
    .main-content{border-right: 1px solid #CDCDCD;min-height: 500px;}
    /* 文本输入框textarea设置 */
    .el-textarea__inner{resize: none;}
    /* 弹出层dialog设置 */
    .el-dialog__body{padding: 0 25px 0!important;}
    .el-dialog__footer{padding: 0 20px 20px;}
    /* input输入框设置 */
    .el-input__inner{padding: 0 8px;}
    .el-textarea__inner{padding: 5px 8px;}
    .el-textarea__inner:focus,.el-input__inner:focus{border: 1px solid #514D8D;}
    /* popover位置设置 */
</style>
