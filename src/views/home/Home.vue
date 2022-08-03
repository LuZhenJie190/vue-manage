<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" alt="">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2021-7-19</span></p>
                    <p>上次登录地点：<span>武汉</span></p>
                </div>
            </el-card>
            <el-card style="margin-top:20px;height: 460px;" shadow="hover">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">
            <div class="num">
                <el-card v-for="(item, index) in countData" :key="index" :body-style="{ display: 'flex', padding: 0 }">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="num">￥{{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height:280px">
                <div style="height:280px" ref="echarts"></div>
            </el-card>
            <div class="graph">
                <el-card style="height:260px">
                    <div style="height:240px" ref="userEcharts"></div>
                </el-card>
                <el-card style="height:260px">
                    <div style="height:240px" ref="videoEcharts"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>

</template>

<script>
import { getData } from "../../api/data.js";
import * as echarts from "echarts";
export default {
    name: "Home",
    data() {
        return {
            userImg: require("../../assets/images/user.png"),
            tableData: [],
            tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '购买总数'
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ],
        }
    },
    mounted() {
        getData().then(res => {
            const { code, data } = res.data;
            if (code === 20000) {
                this.tableData = data.tableData;
                const order = data.orderData;
                console.log(data);
                const xData = order.date;
                const keyArray = Object.keys(order.data[0]);
                const series = [];
                keyArray.forEach(key => {
                    series.push({
                        name: key,
                        type: 'line',
                        data: order.data.map(item => item[key])
                    })
                });
                const Orderoption = {
                    legend: {
                        data: keyArray
                    },
                    xAxis: {
                        data: xData
                    },
                    yAxis: {},
                    series
                }
                const myChart = echarts.init(this.$refs.echarts);
                myChart.setOption(Orderoption);

                const Useroption = {
                    // 顶部类型
                    legend: {
                        textStyle: {
                            color: "#333"
                        }
                    },
                    grid: {
                        left: "20%"
                    },
                    // 提示框
                    tooltip: {
                        trigger: "axis",
                    },
                    xAxis: {
                        type: "category", // 类目轴
                        data: data.userData.map(item => item.date),
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                        axisLabel: {
                            interval: 0,
                            color: "#333",
                        },
                    },
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                    color: "#17b3a3",
                                },
                            },
                        },
                    ],
                    // 自定义柱子颜色
                    color: ["#2ec7c9", "#b6a2de"],
                    series: [
                        {
                            name: '新增用户',
                            type: 'bar',
                            data: data.userData.map(item => item.new)
                        },
                        {
                            name: '活跃用户',
                            type: 'bar',
                            data: data.userData.map(item => item.active)
                        }
                    ]
                }
                const userChart = echarts.init(this.$refs.userEcharts);
                userChart.setOption(Useroption);

                const VideoOption = {
                    series: [
                        {
                            type: 'pie',
                            data: data.videoData
                        }
                    ]
                };

                const videoChart = echarts.init(this.$refs.videoEcharts);
                videoChart.setOption(VideoOption);
            }
        })
    }
}
</script>

<style lang="less" scoped>
</style>