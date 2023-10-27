const Dashboard = () =>
  import(/* webpackChunkName: "views/dashboard" */ "@/views/Dashboard.vue");
const Setting = () =>
  import(/* webpackChunkName: "views/setting" */ "@/views/Setting");

export const routers = [
  {
    name: "Dashboard",
    path: "/",
    component: Dashboard
  },
  {
    name: "Setting",
    path: "/setting",
    component: Setting
  }
];
