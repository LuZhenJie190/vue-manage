<template>
    <div>
        <el-container style="height:100vh;">
            <el-aside width=auto>
                <com-aside></com-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <com-header></com-header>
                </el-header>
                <com-tags></com-tags>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
import ComAside from '@/components/ComAside.vue';
import ComHeader from '@/components/ComHeader.vue';
import ComTags from '@/components/ComTags.vue';

export default {
    components: { ComAside, ComHeader, ComTags },

}
</script>

<style lang="less" scoped>
.el-container {
    border: none;

    .el-header {
        margin: 0;
        padding: 0;
    }
}
</style>