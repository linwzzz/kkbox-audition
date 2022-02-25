import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FeaturedPlaylist from '../views/FeaturedPlaylist.vue'
import NewhitsPlaylist from '../views/NewhitsPlaylist.vue'
import CharsPlaylist from '../views/CharsPlaylist.vue'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/FeaturedPlaylist',
    name: 'FeaturedPlaylist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: FeaturedPlaylist
  },
  {
    path: '/NewhitsPlaylist',
    name: 'NewhitsPlaylist',
    component: NewhitsPlaylist
  },
  {
    path: '/CharsPlaylist',
    name: 'CharsPlaylist',
    component: CharsPlaylist
  },
  {
    path: '/Search',
    name: 'Search',
    component: Search
  },
]

const router = new VueRouter({
  routes
})

export default router
