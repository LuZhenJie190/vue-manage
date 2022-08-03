<template>
    <el-menu default-active="/home" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
        <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
        <el-menu-item :index="item.path" v-for=" item in noChildren" :key="item.path" @click="linkPage(item)">
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu :index="item.path" v-for=" item in hasChildren" :key="item.path">
            <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span>{{ item.label }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item @click="linkPage(item2)" :index="item2.path" v-for="item2 in item.children"
                    :key="item2.path">
                    <i :class="'el-icon-' + item2.icon"></i>
                    <span>{{ item2.label }}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>


    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            mainMenu: [

            ],

        }
    },
    computed: {
        noChildren() {
            return this.asynMemu.filter(item => !item.children);
        },
        hasChildren() {
            return this.asynMemu.filter(item => item.children);
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse;
        },
        asynMemu() {
            return this.$store.state.tab.menu;
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        linkPage(data) {
            this.$router.push({
                name: data.name
            });
            this.$store.commit("selectMenu", data);
        },
    }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100%;
    border: none;

    h3 {
        text-align: center;
        color: #fff;
        line-height: 48px;
    }
}
</style>