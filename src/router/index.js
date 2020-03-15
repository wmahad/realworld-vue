import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import EventList from '@/views/EventList.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkIssue from '@/views/NetworkIssue.vue'
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
      try {
        const event = await store.dispatch('event/fetchEvent', to.params.id)
        to.params.event = event
        next()
      } catch (error) {
        if (error.response && error.response.status == 404) {
          next({ name: '404', params: { resource: 'event' } })
        } else {
          next({ name: 'network-issue' })
        }
      }
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: () => import('../views/EventCreate.vue')
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } }
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
