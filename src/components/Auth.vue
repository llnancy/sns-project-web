<template>
    <div></div>
</template>
<script>
    export default {
        name: 'Auth',
        created() {
            this.$http.get('user/auth?id=' + this.$route.query.id + '&token=' + this.$route.query.token)
                .then((response) => {
                    if (response.body.code === 200) {
                        this.$Message.info(response.body.msg + '，请前往登录！');
                        this.$router.push('/login');
                    }
                });
        }
    };
</script>
