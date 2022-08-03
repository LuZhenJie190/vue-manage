<template>
    <header>
        <div class="left">
            <el-button icon="el-icon-menu" size="mini" @click="isColl"></el-button>
            <div class="bread">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="item in tabList" :key="item.path" :to="{ path: item.path }">
                        {{ item.label }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>

        </div>
        <div class="right">
            <el-dropdown trigger="click">
                <span>
                    <img class="user" :src="userImg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

    </header>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            userImg: require("../assets/images/user.png"),
        }
    },
    computed: {
        ...mapState({
            tabList: state => state.tab.tabList
        })
    },
    methods: {
        isColl() {
            this.$store.commit("collapseMenu");
        },
        logout() {
            this.$store.commit('clearToken');
            this.$store.commit('clearMenu');
            this.$router.push("/login");

        }
    }
}
</script>

<style lang="less" scoped>
header {
    background: rgb(77, 77, 77);
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    .left {
        display: flex;
        align-items: center;

        .bread {
            margin-left: 20px;

            &/deep/.el-breadcrumb__inner {
                color: #fff;
            }


        }
    }

    .right {
        .el-dropdown {
            span {
                .user {
                    width: 40px;
                    height: 40px;
                    border-radius: 100%;
                }
            }
        }

    }
}
</style>