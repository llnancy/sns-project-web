<template>
    <el-popover
        placement="bottom-start"
        width="300"
        trigger="hover"
        :open-delay=800
        :visible-arrow="false"
        >
        <div v-if="type==='badge-img'" slot="reference" class="pull-left">
            <Badge :count="count" overflow-count="99">
                <img :src="user.avatar"/>
            </Badge>
        </div>
        <img v-if="type==='img'" slot="reference" :src="user.avatar"/>
        <a v-if="type==='a'" slot="reference">{{user.loginName}}</a>
        <div>
            <div class="user_info">
                <img class="user-img" :src="user.avatar"/>
                <p>
                    <a href="#"
                       :title="user.nickName + '（' + user.email + '）'">
                        {{user.nickName}}（{{user.email}}）
                    </a>
                </p>
            </div>
            <div class="info-meta">
                <a class="btn pull-left"
                   :class="isFollower == 1 ? 'follow-active' : 'follow-none'"
                   @click="followUser(user.id)">
                    <i class='el-icon-plus' v-if="this.isFollower != 1"></i>
                    {{isFollowerMsg = this.isFollower === 1 ? "已关注" : '关注他'}}
                </a>
                <a class="btn pull-right" @click="showAddLetterForm"><i class="el-icon-message"></i>  发私信 </a>
            </div>
        </div>
    </el-popover>
</template>

<script>
    export default {
        name: 'UserInfo',
        props: ['type', 'user', 'count', 'dialogFormVisible'],
        data() {
            return {
                isFollower: '',
                isFollowerMsg: ''
            };
        },
        created() {
            this.getLoginUserFollowStatus(this.user.id);
        },
        methods: {
            /* 显示发送私信框 */
            showAddLetterForm () {
                this.$emit('showAddLetterForm', true);
            },
            /* 获取当前登录用户对该用户的关注状态 */
            getLoginUserFollowStatus(userId) {
                this.$http.get('getLoginUserFollowUserStatus?userId=' + userId)
                    .then((response) => {
                        if (response.body.code === 0) {
                            // 当前登录用户对该用户的关注状态
                            this.isFollower = response.body.data.follow_status;
                            this.isFollowerMsg = this.isFollower === 1 ? '已关注' : '关注他';
                        }
                    });
            },
            /* 关注该用户 */
            followUser(userId) {
                this.$http.get('followUser?userId=' + userId + '&hasFollowed=' + this.isFollower)
                    .then((response) => {
                        if (response.body.code === 0) {
                            // 当前登录用户对该用户的关注状态
                            this.isFollower = response.body.data.follow_status;
                            this.isFollowerMsg = this.isFollower === 1 ? '已关注' : '关注他';
                            // 该用户的关注人数
                            // this.followerCount = response.body.data.follower_count;
                        }
                    });
            }
        }
    };
</script>

<style scoped>
    img{width: 40px;height: 40px;border: 1px solid #CDCDCD;border-radius: 20px;float: left;cursor: pointer;}
    .user-img{width: 50px;height: 50px;border-radius: unset;margin-top: -20px;}
    .user_info{width: 100%;float: left;border-bottom: 1px solid #CDCDCD;padding-bottom: 10px;}
    .user_info p{padding-left: 10px;margin-bottom: 3px;white-space:nowrap;text-overflow:ellipsis;overflow: hidden;cursor: pointer;}
    .info-meta{float: left;width: 100%;padding-top: 10px;}
    .info-meta a{width: 46%;color: #514D8D;background-color: #E8EAED;}
    .info-meta .btn{border: none;box-shadow:none;}
    .follow-none{background-color: #514D8D!important;color: #FFFFFF!important;}
    .follow-active{border: none;box-shadow:none;background-color: #76839B!important;color: #FFFFFF!important;}
</style>
