<template>
    <div class="unactivated container">
        <div class="row">
            <p>您的账号{{this.$route.params.loginName}}({{this.$route.params.email}})暂未激活！
                <br />激活邮件在注册时已发送到您的邮箱，请您关注查收并前往激活！</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NotAuth'
    };
</script>

<style scoped>
    .unactivated{border: 1px solid #CDCDCD;min-height: 500px;width: 666px!important; border-radius: 5px;background: #FFFFFF;margin-top: 20px;margin-bottom: 20px;}
    p{text-align: center;padding: 235px 0;font-size: 16px;}
</style>
