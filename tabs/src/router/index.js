import Home from '@/views/HomeView.vue'

const routerOptions = {
  base: './',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:pathMatch(.*)*', redirect: { name: 'home' } 
    }
  ],
  scrollBehavior (to, from) {
    // always scroll to top
    if (import.meta.env.SSR) return
    if (to.path === from.path) return
    return { top: 0 }
  }
}

export default routerOptions 