const Dashboard = () =>
  import(/* webpackChunkName: "views/dashboard" */ "@/views/Dashboard.vue");

export const routers = [
  {
    name: "Dashboard",
    path: "/",
    component: Dashboard
  }
];
