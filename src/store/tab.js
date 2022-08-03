import Cookies from "js-cookie";
export default {
    state: {
        isCollapse: false,
        tabList: [{
            path: "/",
            name: "home",
            label: "首页",
            icon: "home"
        }],
        // 当前点击的tab
        currentMenu: null,
        menu: []
    },
    actions: {},
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state, value) {
            //判断点击的是否为首页
            if (value.name !== "home") {
                state.currentMenu = value;
                // 判断点击的菜单存不存在
                const result = state.tabList.findIndex(item => item.name === value.name);
                // 不存在时才添加到数组
                if (result === -1) {
                    state.tabList.push(value);

                }
            } else {
                state.currentMenu = null;
            }
        },
        tagClose(state, val) {
            // 寻找传进来的数据是否下标一致
            const result = state.tabList.findIndex(item => item.name === val.name);
            // 如果一致，进行删除
            state.tabList.splice(result, 1);
        },
        setMenu(state, val) {
            state.menu = val;
            Cookies.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = [];
            Cookies.remove('menu')
        },
        addMenu(state, router) {
            if (!Cookies.get("menu")) {
                return
            }
            const menu = JSON.parse(Cookies.get('menu'));
            state.menu = menu;
            const menuArray = [];
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item;
                    })
                    menuArray.push(...item.children);
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 路由动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    },
    getters: {}

}