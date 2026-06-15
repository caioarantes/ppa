import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import VideosPage from '../pages/VideosPage.vue'
import WikiPage from '../pages/WikiPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/videos', name: 'videos', component: VideosPage },
    { path: '/wiki', redirect: '/wiki/regulamentos' },
    { path: '/wiki/:slug', name: 'wiki', component: WikiPage },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
