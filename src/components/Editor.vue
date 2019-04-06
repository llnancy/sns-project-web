<template>
    <div id="editor">
    </div>
</template>

<script>
    import E from 'wangeditor';
    export default {
        name: 'Editor',
        data() {
            return {
                editor: ''
            };
        },
        props: ['getCommentContent', 'isClear'],
        mounted() {
            this.editor = new E('#editor');
            this.editor.customConfig.onchange = (html) => {
                // 将富文本编辑器中的内容传递给父组件
                this.getCommentContent(html);
            };
            this.editor.create();
        },
        watch: {
            isClear(val) {
                if (val) {
                    // 清空富文本编辑器内容
                    this.editor.txt.clear();
                }
            }
        }
    };
</script>

<style scoped>
</style>
