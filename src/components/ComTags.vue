<template>
    <div class="tags">
        <el-tag size="small" v-for="(tag, index) in tags" :key="tag.name" :type="tag.type"
            :closable="tag.name !== 'home'" :effect="$route.name === tag.name ? 'dark' : 'plain'"
            @click="handleChange(tag)" @close="handleClose(tag, index)">
            {{ tag.label }}
        </el-tag>
    </div>

</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {

        };
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabList
        }),
    },
    methods: {
        ...mapMutations({
            close: "tagClose"
        }),
        handleChange(tag) {
            this.$router.push({
                name: tag.name
            })

        },
        handleClose(tag, index) {
            // 改变高亮焦点
            // 获取长度
            const length = this.tags.length - 1;
            // 调用函数
            this.close(tag);
            // 如果路由不一致，不需要改变焦点
            if (tag.name !== this.$route.name) {
                return;
            }
            // 判断点击是否最后一个
            if (index === length) {
                // 向左移一位
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                // 无需移动
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tags {
    padding: 20px;

    .el-tag {
        cursor: pointer;
        margin-right: 15px;
    }
}
</style>