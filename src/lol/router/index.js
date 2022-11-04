
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
          path:"/:area",
          props: true,
          name:"area",
          children:[
            {
              path:"/",
              component:()=>import("../view/self.vue"),
            }
          ]
        }
      ]
    }
  ]
})

export default router;