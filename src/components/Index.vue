<template>
    <div class="main container">
        <div class="row">
            <div class="col-lg-9 main-content">
                <ul class="nav nav-tabs category-nav-tabs">
                    <li>
                        <a href="">等待回复</a>
                    </li>
                    <li>
                        <a href="">热门</a>
                    </li>
                    <li>
                        <a href="">推荐</a>
                    </li>
                    <li class="active">
                        <a href="">最新</a>
                    </li>
                </ul>
                <div class="question-list">
                    <div class="question-list-empty" v-if="questions.length === 0">
                        <div class="empty-item">
                            网站还没有人提问哦，如果服务端正常的话，也许是网站的数据库被删了:)
                        </div>
                    </div>
                    <div class="question-item" v-for="(q,index) in questions" :key="index">
                        <UserInfo type="img" :user="q.objs.user"></UserInfo>
                        <div class="overview">
                            <p>
                                <router-link :to="{name: 'Question',params: {questionId: q.objs.question.id}}">
                                    {{q.objs.question.title}}
                                </router-link>
                            </p>
                            <div>
                                <span>
                                    <span>{{q.objs.user.nickName}}</span>发起了问题
                                </span>
                                <span>1 人关注</span>
                                <span>{{q.objs.question.commentCount}}个回复</span>
                                <!--<span>110 次浏览</span>-->
                                <span>{{q.objs.question.createdDate | formatDate}}</span>
                            </div>
                            <div class="question-content" v-if="q.objs.question.content.length > 100 && q.objs.question.content.length < 200">
                                <p>{{q.objs.question.content}}</p>
                                <div>
                                    <router-link :to="{name: 'Question',params: {questionId: q.objs.question.id}}">
                                        查看更多
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div class="content-item">
                        <img src="img/2e21e58a990f5c756e813a64a4bba14c_m.jpg" />
                        <div class="overview">
                            <p><a href="#">关于轮播图展示的问题</a></p>
                            <div>
                                <span>赵君 发起了问题</span>
                                <span>1 人关注</span>
                                <span>0 个回复</span>
                                <span>110 次浏览</span>
                                <span>2019-01-09 17:24</span>
                            </div>
                        </div>
                    </div>-->
                </div>
            </div>
            <div class="col-lg-3">
                <div class="column">
                    <div class="column-head">
                        <a class="pull-right" href="">更多></a>
                        <h4>热门话题</h4>
                    </div>
                    <div class="column-body">
                        <ul class="list-group">
                            <li class="list-group-item">Cras justo odio</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </div>
                </div>
                <div class="column">
                    <div class="column-head">
                        <a class="pull-right" href="">更多></a>
                        <h4>热门用户</h4>
                    </div>
                    <div class="column-body">
                        <ul>
                            <!-- <li><img src="img/2e21e58a990f5c756e813a64a4bba14c_m.jpg" /></li>
                            <li><img src="img/2e21e58a990f5c756e813a64a4bba14c_m.jpg" /></li>
                            <li><img src="img/2e21e58a990f5c756e813a64a4bba14c_m.jpg" /></li>
                            <li><img src="img/2e21e58a990f5c756e813a64a4bba14c_m.jpg" /></li>
                            <li><img src="img/2e21e58a990f5c756e813a64a4bba14c_m.jpg" /></li>
                            <li><img src="img/2e21e58a990f5c756e813a64a4bba14c_m.jpg" /></li> -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserInfo from './UserInfo';
    export default {
        name: 'Index',
        components: {UserInfo},
        computed: {
            questions() {
                return this.$store.state.questions;
            }
        },
        created() {
            this.$store.dispatch('getQuestionsAction');
        },
        methods: {
            // /* 获取全部最新问题 */
            // getQuestions() {
            //     this.$http.get('question/all')
            //         .then((response) => {
            //             if (response.body.code === 0) {
            //                 this.questions = response.body.data.questions_info;
            //             }
            //         });
            // }
        }
    };
</script>

<style scoped>
    .column{padding: 15px 0 0 0;border-bottom: 1px solid #F1F1F1;}
    .category-nav-tabs{padding: 10px 5px 0 0;}
    .category-nav-tabs li{float: right;}
    .category-nav-tabs li a{border: none;color: #666;}
    .category-nav-tabs li a:hover,
    .category-nav-tabs li.active a,
    .category-nav-tabs li.active a:hover{border: none;background-color: #FFFFFF;border-bottom: 2px solid #514D8D;}
    .question-item{border-bottom: 1px solid #F1F1F1;padding: 10px 0;float: left;width: 100%;}
    .question-item .overview{float: left;margin-left: 15px;width: 90%;}
    .question-item .overview p{margin-bottom: 0px;}
    .question-item .overview span{font-size: 12px;color: #666;margin-right: 6px;}
    .question-content{margin-top: 5px;}
    .empty-item{color: #ccc;border: 2px dashed #ddd;padding: 15px 10px;text-align: center;margin: 15px 0 0;}
</style>
