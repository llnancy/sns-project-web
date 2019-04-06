<template>
    <div class="main container">
        <div class="row">
            <div class="col-lg-9 main-content">
                <div class="conversation-head">
                    <span>最近联系</span>
                    <el-button
                        type="primary"
                        size="mini"
                        class="pull-right"
                        style="margin: 10px 0;"
                        @click="dialogFormVisible = true">
                        写私信
                    </el-button>
                    <el-dialog
                        :visible.sync="dialogFormVisible"
                        top="20vh"
                        :center="true"
                        width="400px"
                        title="发送私信">
                        <el-form :model="letter">
                            <el-form-item label="" :label-width="formLabelWidth">
                                <el-input type="input" :disabled="disabled" v-model="letter.toName" suffix-icon="el-icon-search" size="small" clearable placeholder="搜索用户"></el-input>
                            </el-form-item>
                            <el-form-item label="" :label-width="formLabelWidth">
                                <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 1, maxRows: 5}"
                                    v-model="letter.content"
                                    placeholder="私信内容...">
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button size="small" type="primary" @click="addLetter" style="width: 60%;">发送</el-button>
                        </div>
                    </el-dialog>
                </div>
                <div class="conversation-list">
                    <div class="conversation-list-empty" v-if="conversations.length === 0">
                        <div class="empty-item">
                            还没有人给你发私信，不如你主动一点，给神交已久的伞友发一封问候私信吧:)
                        </div>
                    </div>
                    <div class="conversation-item" v-for="(c,index) in conversations" :key="index">
                        <UserInfo type="badge-img" :count="c.objs.unread" :user="c.objs.user"></UserInfo>
                        <div class="overview">
                            <p>
                                <span v-if="c.objs.isSend">我发送给</span>
                                <UserInfo type="a" :user="c.objs.user"></UserInfo>
                                <span>：{{c.objs.message.content}}</span>
                            </p>
                            <div>
                                <span class="pull-left" style="margin-top: 4px;">{{c.objs.message.createdDate | formatDate}}</span>
                                <div class="action pull-right">
                                    <span>
                                        <router-link :to="{name: 'Letter',params: {conversationId: c.objs.message.conversationId}}">
                                            查看对话
                                        </router-link>
                                    </span>
                                    <span>
                                        <a @click.prevent="writeBack(c.objs.user.loginName)">回复</a>
                                    </span>
                                    <span>
                                        <a @click.prevent="delConversation">删除</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div class="conversation-item">-->
                        <!--<UserInfo type="img" :user="user"></UserInfo>-->
                        <!--<div class="overview">-->
                            <!--<p>-->
                                <!--我发送给-->
                            <!--</p>-->
                            <!--<div>-->
                                <!--<span class="pull-left" style="margin-top: 4px;">2019-01-09 17:24</span>-->
                                <!--<div class="action pull-right">-->
                                    <!--<span>-->
                                        <!--<a>查看对话</a>-->
                                    <!--</span>-->
                                    <!--<span>-->
                                        <!--<a>回复</a>-->
                                    <!--</span>-->
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
        name: 'Conversation',
        components: {UserInfo},
        data() {
            return {
                dialogFormVisible: false,
                disabled: false,
                letter: {toName: '', content: ''},
                formLabelWidth: '0',
                conversations: ''
            };
        },
        created () {
            this.getConversationList();
        },
        methods: {
            /* 获取会话列表信息 */
            getConversationList() {
                this.$http.get('message/conversation')
                    .then((response) => {
                        if (response.body.code === 0) {
                            this.conversations = response.body.data.conversations_info;
                        }
                    });
            },
            /* 发送私信 */
            addLetter() {
                this.$http.post('message', this.letter)
                    .then((response) => {
                        if (response.body.code === 200) {
                            this.dialogFormVisible = false;
                            // 清空输入框内容
                            this.letter.toName = '';
                            this.letter.content = '';
                            this.$Message.info({
                                content: response.body.msg,
                                duration: 3,
                                closable: true
                            });
                            // 重新渲染会话列表
                            this.getConversationList();
                        }
                    });
            },
            /* 回复 */
            writeBack(toName) {
                this.letter.toName = toName;
                this.disabled = true;
                this.dialogFormVisible = true;
            },
            /* 删除会话 */
            delConversation() {
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
    .conversation-head{height: 48px;line-height: 48px;border-bottom: 1px solid #F1F1F1;}
    .conversation-head span{font-size: 14px;color: #222;line-height: 55px;margin-left: 10px;}
    .conversation-item{border-bottom: 1px solid #F1F1F1;padding: 10px 0;float: left;width: 100%;}
    .conversation-item .overview{float: left;margin-left: 15px;width: 90%;}
    .conversation-item .overview p{margin-bottom: 0px;}
    .conversation-item .overview span{font-size: 12px;color: #666;margin-right: 6px;}
    .empty-item{color: #ccc;border: 2px dashed #ddd;padding: 15px 0;text-align: center;margin: 15px 0 0;}
</style>
