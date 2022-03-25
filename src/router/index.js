import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "graphitization",
        component: () => import("@/views/production/index"),
      },
      {
        path: "/huanbao",
        name: "huanbao",
        component: () => import("@/views/huanbao/index"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  // const hastoken = localStorage.getItem('token');
  const hastoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyMGRkZTM5YTExMDVhY2EzYTc5NWNmYiIsImFjY291bnQiOiJ0ZXN0IiwicGFzc3dvcmQiOiIkMmEkMTAkQ1BxY1g5Qk9DZWFWWGg4S2hQbDU0T3hVQVNMMk41aG9HajlOTWJhOUtEb2pRZVR5Z3R3RlMiLCJuYW1lIjoidGVzdCIsIkF2YXRhclVybCI6Imh0dHA6Ly8xMDEuNDIuMjMzLjIyNjo5MDAwL2F2YXRhci9hdmF0YXJfbG9nby5wbmciLCJzZXgiOiLnlLciLCJwaG9uZSI6IjEyMzQ1NiIsInNhbHQiOiI3Njk5NzUyMDI2OTE4NzUzMjUwIiwicm9sZUlkIjoiNjIwOTBkNTFkNjVhY2E2NzIxZDE4NDA1Iiwib3BlbklkIjoiIn0sImlzcyI6InNkbCIsIm5iZiI6MTY0ODA4NDYzNX0.4wCZlHo9lpr6wj-gLCwQR7p1EJuDOvb4kJ1a5UDi6xc'

  if(hastoken){
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next()
    }    
  }else{
    if (to.path !== "/login") {
      next({ path: "/login" });
    } else {
      next()
    }  
  }

});
export default router;
