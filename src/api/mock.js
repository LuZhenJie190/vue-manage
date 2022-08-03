import Mock from "mockjs";
import homeApi from "./mockServeData/home"
import userApi from "./mockServeData/user";
import permissionApi from "./mockServeData/permission"

Mock.mock("/home/getData", homeApi.getStatisticalData);
Mock.mock("/user/createUser", userApi.createUser);
Mock.mock("/user/updateUser", userApi.updateUser);

Mock.mock(RegExp("/user/getAbouUser.*"), 'get', userApi.getUserList);

Mock.mock("/user/del", 'get', userApi.deleteUser);

Mock.mock("/permissionApi/getMenu", permissionApi.getMenu);