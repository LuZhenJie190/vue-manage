<template>
    <div class="login">
        <h1>登录</h1>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="btn_login">
                    <el-button type="primary" @click="login">登录</el-button>
                </div>

            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Mock from 'mockjs';
import { getMenu } from "@/api/data"
export default {
    name: "Login",
    data() {
        return {
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, message: '长度不少于3个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, message: '长度不少于3个字符', trigger: 'blur' }
                ]
            },
            form: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            getMenu(this.form).then(({ data: res }) => {
                console.log(res);
                if (res.code === 20000) {
                    this.$store.commit('clearMenu');
                    this.$store.commit('setMenu', res.data.menu);
                    this.$store.commit('setToken', res.data.token);
                    this.$store.commit('addMenu', this.$router);
                    this.$router.push({ name: 'home' });

                } else {
                    this.$message.warning(res.data.message)
                }
            })
            // const token = Mock.random.guid();
            // this.$store.commit("setToken", token);
            // this.$router.push({ name: 'home' });
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    width: 350px;

    background-color: #fff;
    border-radius: 15px;
    margin: 180px auto;
    padding: 30px;
    box-shadow: 0px 0px 10px #ccc;

    h1 {
        margin: 10px auto 20px auto;
        font-size: 24px;
        text-align: center;
    }

    .btn_login {
        margin: 10px auto 0px 40px;

    }

}
</style>