
import VueRouter from 'vue-router'

const router = new VueRouter({
  routes:[
    {
      path:"/",
      component: ()=>import("../main.vue"),
      children:[
        {
          path:"/",
          component: ()=>import("../view/fallback/bindarea.vue"),
        },
        {
          name:"search",
          path:"/search/:nickname",
          props: true,
          component: ()=>import("../view/search.vue"),
        },
        {
          path:"/area/:area",
          props: true,
          name:"area",
          component:()=>import("../view/self.vue"),
        },
        {
          path:"/area/:area/type/:accountType/id/:id",
          props: true,
          name:"summary",
          component:()=>import("../view/summary.vue"),
        },
        {
          path:"*",
          redirect: "/"
        }
      ]
    }
  ]
})

export default router;