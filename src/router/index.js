import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter);


export default new VueRouter({
    mode: "history",
    routes: [{
            path: '/',
            name: "Main",
            component: () => import("../views/TheMain.vue"),
            redirect: '/home',
            children: [
                // {
                //     path: '/home',
                //     name: "home",
                //     component: () => import("../views/home/Home.vue")
                // },
                // {
                //     path: '/mall',
                //     name: "mall",
                //     component: () => import("../views/mall/Mall.vue")
                // },
                // {
                //     path: '/user',
                //     name: "user",
                //     component: () => import("../views/user/User.vue")
                // },
                // {
                //     path: '/page1',
                //     name: "page1",
                //     component: () => import("../views/other/PageOne.vue")
                // },
                // {
                //     path: '/page2',
                //     name: "page2",
                //     component: () => import("../views/other/PageTwo.vue")
                // },
            ]
        },

        {
            path: '/login',
            name: "login",
            component: () => import("../views/login/Login.vue")
        }
    ]

})