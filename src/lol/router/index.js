
import VueRouter from 'vue-router'

const router = new VueRouter({
  routes:[
    {
      path:"/",
      component: ()=>import("../view/fallback/bindarea.vue")
    },
  ]
})

export default router;