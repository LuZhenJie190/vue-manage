<template>
    <div class="com-table">
        <el-table :data="tableData" height="90%" stripe>
            <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label"
                :width="item.width ? item.width : 125">
                <template slot-scope="scope">
                    <span style="margin-left:10px">{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>

            </el-table-column>
        </el-table>
        <el-pagination class="paper" layout="prev,pager,next" :total="config.total" :current-page.sync="config.page"
            @current-change="changePage" :page-size="30"></el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        tableData: Array,
        tableLabel: Array,
        config: Object,


    },
    methods: {
        handleEdit(row) {
            this.$emit('edit', row);
        },
        handleDelete(row) {
            this.$emit('del', row);
        },
        changePage(page) {
            this.$emit('changePage', page);
        }
    }
}
</script>

<style lang="less" soped>
.com-table {
    height: calc(100% - 40px);
    background-color: #fff;
    position: relative;
    top: 20px;

    .paper {
        position: absolute;
        bottom: 0;
        right: 20px;
    }
}
</style>