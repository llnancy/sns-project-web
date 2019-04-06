<template>
    <div class="main container">
        <div class="row">
            <div class="col-lg-9 main-content">
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
                <div class="question-detail">
                    <div class="question-head">
                        <h1>{{question.title}}</h1>
                    </div>
                    <div class="question-body">
                        <div class="question-content">
                            {{question.content}}
                        </div>
                    </div>
                    <div class="question-footer">
                        <div class="meta">
                            <span>{{question.createdDate | formatDate}}</span>
                        </div>
                    </div>
                </div>
                <div class="follow">
                    <a class="btn" style="width: 80px;" :class="followStatus === 1 ? 'follow-active' : 'follow-none'" @click="followQuestion(question.id)">
                        {{followStatusMsg}}
                    </a>
                    <div class="followers-num">
                        <span>{{followerCount}}人关注该问题</span>
                    </div>
                    <div class="followers-avatars" v-if="followers.length > 0">
                        <span v-for="(f,index) in followers" :key="index">
                            <UserInfo type="img" :user="f" :dialogFormVisible="dialogFormVisible" @showAddLetterForm="toShowAddLetterForm"></UserInfo>
                        </span>
                    </div>
                </div>
                <div class="comment-list">
                    <div class="comment-item" v-for="(c,index) in comments" :key="index">
                        <div class="user-meta">
                            <UserInfo type="img" :user="c.objs.user" :dialogFormVisible="dialogFormVisible" @showAddLetterForm="toShowAddLetterForm"></UserInfo>
                            <div class="user-info">
                                <UserInfo type="a" :user="c.objs.user" :dialogFormVisible="dialogFormVisible" @showAddLetterForm="toShowAddLetterForm"></UserInfo>
                            </div>
                        </div>
                        <div class="like-meta">
                            <p><span>{{likeCount[index]}} </span>人赞同了该回答</p>
                        </div>
                        <div class="comment-content">
                            <div v-html="c.objs.comment.content" style="white-space: pre-wrap;"></div>
                        </div>
                        <div class="comment-time">
                            <p>发布于 {{c.objs.comment.createdDate | formatDate}}</p>
                        </div>
                        <div class="action">
                            <!--<el-button size="mini" icon="el-icon-caret-top">-->
                                <!--赞同 1-->
                            <!--</el-button>-->
                            <!--<el-button size="mini" icon="el-icon-caret-bottom">-->
                            <!--</el-button>-->
                            <a class="btn" :class="likeStatus[index] === 1 ? 'like-active' : ''" @click="like(c.objs.comment.id,index)">
                                <i class="glyphicon glyphicon-triangle-top" aria-hidden="true"></i>
                                赞同 {{likeCount[index]}}
                            </a>
                            <a class="btn" :class="likeStatus[index] === -1 ? 'dislike-active' : ''" @click="dislike(c.objs.comment.id,index)">
                                <i class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></i>
                            </a>
                            <span>
                                <Icon type="ios-text" size="20" color="#8590A6" /> 18条评论
                            </span>
                        </div>
                    </div>
                    <!--<div class="comment-item">-->
                        <!--<div class="user-meta">-->
                            <!--<UserInfo type="img" :user="user"></UserInfo>-->
                            <!--<div class="user-info">-->
                                <!--<UserInfo type="a" :user="user"></UserInfo>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="like-meta">-->
                            <!--<p><span>1 </span>人赞同了该回答</p>-->
                        <!--</div>-->
                        <!--<div class="comment-content">-->
                            <!--<p>谢邀！-->
                                <!--网络水军的兴衰起伏，与互联网的进化相互交织。他们是社交时代的镜子，折射的不仅是屏幕上的瞬息万变，还有公众意识与舆论的更替变迁。从论坛时代到微博时代，再到微信时代，水军一直处于舆论的风口浪尖，但他们自称舆论的“弄潮儿”。从人声鼎沸到繁华落尽，如今，水军进入蛰伏期，静待属于他们的春天再次来临。-->
                                <!--论坛时代：兴起-->
                                <!--2005年，互联网爆发式发展，广告人士敏感地把握时代脉搏，网络公关公司应运而生。以经济手段，公司化、集团化的运作，组建了水军大队。水军登上了历史舞台，并成为网络世界的重要角色，但真正大规模崛起，需追溯到论坛时代。-->
                            <!--</p>-->
                        <!--</div>-->
                        <!--<div class="comment-time">-->
                            <!--<p>发布于 2019-01-30 14:38:47</p>-->
                        <!--</div>-->
                        <!--<div class="action">-->
                            <!--<el-button type="success" size="mini" icon="el-icon-caret-top" plain>-->
                                <!--赞同 1-->
                            <!--</el-button>-->
                            <!--<el-button type="success" size="mini" icon="el-icon-caret-bottom" plain></el-button>-->
                            <!--<span>-->
                                <!--<Icon type="ios-text" size="20" color="#8590A6" /> 18条评论-->
                            <!--</span>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
                <div class="comment-area">
                    <Editor :getCommentContent="getCommentContent" :isClear="isClear"></Editor>
                    <el-button type="primary" size="mini" class="pull-right" @click="addComment" style="margin: 10px 0;">发布回答</el-button>
                </div>
            </div>
            <div class="col-lg-3">
            </div>
        </div>
    </div>
</template>

<script>
    import UserInfo from './UserInfo';
    import Editor from './Editor';
    export default {
        name: 'Question',
        components: {Editor, UserInfo},
        data() {
            return {
                question: '',
                user: '',
                followStatus: 0,
                followStatusMsg: '',
                followerCount: '',
                followers: '',
                comments: '',
                comment: {
                    questionId: '',
                    content: ''
                },
                isClear: false,
                likeCount: '',
                likeStatus: '',
                /* 私信相关 */
                dialogFormVisible: false,
                disabled: false,
                letter: {toName: '', content: ''},
                formLabelWidth: '0'
            };
        },
        created() {
            this.getQuestionById();
        },
        methods: {
            /* 根据id获取问题详细信息 */
            getQuestionById() {
                this.$http.get('question/' + this.$route.params.questionId)
                    .then((response) => {
                        if (response.body.code === 0) {
                            let data = response.body.data;
                            // 问题信息
                            this.question = data.question_info.objs.question;
                            // 提问的用户信息
                            this.user = data.question_info.objs.user;
                            // 当前用户对该问题的关注状态
                            this.followStatus = data.follow_status;
                            // 显示已关注还是关注问题
                            this.followStatusMsg = this.followStatus === 1 ? '已关注' : '关注问题';
                            // 该问题的关注人数
                            this.followerCount = data.follower_count;
                            // 问题的关注人信息，显示最新的10个关注用户
                            this.followers = data.follower_users_info;
                            // 问题的评论信息
                            this.comments = data.comments_info;
                            let len = this.comments.length;
                            // 每一条评论的踩赞状态信息
                            this.likeCount = new Array(len);
                            this.likeStatus = new Array(len);
                            for (let i = 0; i < len; i++) {
                                this.likeCount[i] = this.comments[i].objs.like_count;
                                this.likeStatus[i] = this.comments[i].objs.like_status;
                            }
                            this.comment.questionId = data.question_info.objs.question.id;
                        }
                    });
            },
            /* 实时获取富文本编辑器中的内容（父组件向子组件传递方法） */
            getCommentContent(value) {
                this.comment.content = value;
            },
            /* 发表回答 */
            addComment() {
                this.isClear = false;
                this.$http.post('comment', this.comment)
                    .then((response) => {
                        if (response.body.code === 200) {
                            this.$Message.info(response.body.msg);
                            // 清空富文本编辑器
                            this.isClear = true;
                            // 重新渲染问题详细页面
                            this.getQuestionById();
                        }
                    });
            },
            /* 点赞 */
            like(commentId, index) {
                this.$http.get('like/commentLike/' + commentId + '?hasLiked=' + this.likeStatus[index])
                    .then((response) => {
                        if (response.body.code === 0) {
                            // 改变数组中某个元素的值也触发刷新
                            this.$set(this.likeCount, index, response.body.data.like_count);
                            this.$set(this.likeStatus, index, response.body.data.like_status);
                        }
                    });
            },
            /* 点踩 */
            dislike(commentId, index) {
                this.$http.get('like/commentDislike/' + commentId + '?hasDisliked=' + this.likeStatus[index])
                    .then((response) => {
                        if (response.body.code === 0) {
                            this.$set(this.likeCount, index, response.body.data.like_count);
                            this.$set(this.likeStatus, index, response.body.data.like_status);
                        }
                    });
            },
            /* 关注问题 */
            followQuestion(questionId) {
                this.$http.get('followQuestion?questionId=' + questionId + '&hasFollowed=' + this.followStatus)
                    .then((response) => {
                        if (response.body.code === 0) {
                            // 当前用户对该问题的关注状态
                            this.followStatus = response.body.data.follow_status;
                            this.followStatusMsg = this.followStatus === 1 ? '已关注' : '关注问题';
                            // 该问题的关注人数
                            this.followerCount = response.body.data.follower_count;
                            // 问题的关注人信息，显示最新的10个关注用户
                            this.followers = response.body.data.follower_users;
                        }
                    });
            },
            /* 显示发送私信form框 */
            toShowAddLetterForm(dialogFormVisible) {
                this.dialogFormVisible = dialogFormVisible;
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
                        }
                    });
            }
        }
    };
</script>

<style scoped>
    .question-detail,.comment-list{padding: 10px 10px;}
    .question-head{border-bottom: 1px solid #F1F1F1;padding-bottom: 5px;}
    .question-head h1{font-size: 20px;}
    .question-body .question-content{padding: 10px 0;}
    .question-footer .meta{min-height: 20px;line-height: 20px;font-size: 12px;color: #CDCDCD;}
    .follow{margin: 10px 10px 5px 10px;}
    .followers-num{padding: 10px 0;color: #666;}
    .followers-avatars{min-height: 25px;}
    .followers-avatars >>> img{width: 25px;height: 25px;margin-right: 3px;}
    /*.comment-list{padding: 10px 10px;}*/
    .comment-list{border-bottom: 1px solid #F1F1F1;}
    .comment-item{width: 100%;padding-top: 10px;border-top: 1px solid #F1F1F1;}
    .comment-item >>> a{font-weight: 600;color: inherit;text-decoration: none;}
    .user-meta{display: flex;}
    .user-meta .user-info{flex: 1 1;margin-left: 10px;overflow: hidden;}
    .like-meta,.comment-time{margin-top: 10px;font-size: 14px;color: #8590A6;}
    .action{margin-bottom: 10px;}
    .action span{margin-left: 5px;color: #8590A6;cursor: pointer;}
    .action a,.follow .btn{color: #514D8D;background-color: #E8EAED;}
    .ivu-icon-ios-text{margin-top: -2px;}
    .comment-area{margin-top: 10px;}
    .btn{border: none;box-shadow:none;}
    .dislike-active,.like-active{background-color: #514D8D!important;color: #FFFFFF!important;}
    .follow-none{background-color: #514D8D!important;color: #FFFFFF!important;}
    .follow-active{border: none;box-shadow:none;background-color: #76839B!important;color: #FFFFFF!important;}
</style>
