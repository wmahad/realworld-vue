import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import EventList from '@/views/EventList.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
  },
  {
    path: '/event/:id',
    name: 'event-detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/EventDetail.vue'),
    props: true,
    beforeEnter: async (to, from, next) => {
      const event = await store.dispatch('event/fetchEvent', to.params.id)
      to.params.event = event
      next()
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: () => import('../views/EventCreate.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
