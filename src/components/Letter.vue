<template>
    <div class="main container">
        <div class="row">
            <div class="col-lg-9 main-content">
                <div class="letter-head">
                    <div class="return-meta">
                        <router-link to="/conversation">« 返回</router-link>
                    </div>
                    <div class="action-meta">
                        <span>发私信给</span>
                        <UserInfo type="a" :user="toUser"></UserInfo>
                    </div>
                    <div class="letter-content">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 1, maxRows: 100}"
                            v-model="letter.content"
                            placeholder="私信内容..."
                            style="margin-top: 5px;">
                        </el-input>
                    </div>
                    <div class="send-letter">
                        <el-button type="primary" size="mini" @click="addLetter" class="pull-right" style="margin-top: 10px;">发送</el-button>
                    </div>
                </div>
                <div class="letter-list">
                    <div class="letter-list-empty" v-if="letters.length === 0">
                        <div class="empty-item">
                            私信记录都找不到了哦，可能是你在某个时间删除了，尝试给伞友重新发一封问候私信吧:)
                        </div>
                    </div>
                    <div class="letter-item" v-for="(l,index) in letters" :key="index">
                        <UserInfo type="img" :user="l.objs.user"></UserInfo>
                        <div class="overview">
                            <p>
                                <UserInfo type="a" :user="l.objs.user"></UserInfo>
                                <span>：</span>
                                <span>{{l.objs.message.content}}</span>
                            </p>
                            <div>
                                <span class="pull-left" style="margin-top: 4px;">{{l.objs.message.createdDate | formatDate}}</span>
                                <div class="action pull-right">
                                    <span>
                                        <a @click.prevent="delLetter">删除</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div class="letter-item">-->
                        <!--<UserInfo type="img" :user="user"></UserInfo>-->
                        <!--<div class="overview">-->
                            <!--<p>-->
                                <!--<UserInfo type="a" user="user"></UserInfo>-->
                                <!--<span>：</span>-->
                                <!--<span>-->
                                    <!--私信内容私信内容私信内容私信内容私信内容私信内容私信内容-->
                                <!--</span>-->
                            <!--</p>-->
                            <!--<div>-->
                                <!--<span class="pull-left" style="margin-top: 4px;">2019-01-09 17:24</span>-->
                                <!--<div class="action pull-right">-->
                                    <!--<span>-->
                                        <!--<a>删除</a>-->
                                    <!--</span>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
            <div class="col-lg-3">
            </div>
        </div>
    </div>
</template>

<script>
    import UserInfo from './UserInfo';
    export default {
        name: 'Letter',
        components: {UserInfo},
        data() {
            return {
                letter: {toName: '', content: ''},
                letters: '',
                toUser: ''
            };
        },
        created () {
            this.getConversationDetail();
        },
        methods: {
            /* 获取会话的全部消息内容 */
            getConversationDetail() {
                this.$http.get('message/conversation/' + this.$route.params.conversationId)
                    .then((response) => {
                        if (response.body.code === 0) {
                            this.letters = response.body.data.messages_info;
                            // 设置当前页面发送私信的接收者
                            this.toUser = response.body.data.toUser;
                            this.letter.toName = this.toUser.loginName;
                        }
                    });
            },
            /* 发送私信 */
            addLetter() {
                this.$http.post('message', this.letter)
                    .then((response) => {
                        if (response.body.code === 200) {
                            // 清空输入框内容
                            this.letter.content = '';
                            this.$Message.info({
                                content: response.body.msg,
                                duration: 3,
                                closable: true
                            });
                            // 重新渲染会话列表
                            this.getConversationDetail();
                        }
                    });
            },
            delLetter() {
                /* 删除私信 */
                this.$Message.info({
                    content: '程序猿哥哥正在加班写代码哟...',
                    duration: 3,
                    closable: true
                });
            }
        }
    };
</script>

<style scoped>
    .letter-head{line-height: 25px;}
    .letter-head,.letter-list{padding: 15px 10px 0;}
    .action-meta span{color: #999;font-weight: 400;}
    .send-letter{height: 48px;border-bottom: 1px solid #CDCDCD;}
    .letter-item{border-bottom: 1px solid #F1F1F1;padding: 10px 0;float: left;width: 100%;}
    .letter-item .overview{float: left;margin-left: 15px;width: 90%;}
    .letter-item .overview p{margin-bottom: 1px;}
    .letter-item .overview span{font-size: 12px;color: #666;margin-right: 6px;}
    .empty-item{color: #ccc;border: 2px dashed #ddd;padding: 15px 10px;text-align: center;margin: 15px 0 0;}
</style>
