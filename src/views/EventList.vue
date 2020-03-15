<template>
  <div>
    <h1>Event list</h1>
    <Card v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      >Next Page</router-link
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/Card.vue'
import store from '@/store'

const fetchPageEvents = async (to, from, next) => {
  const page = +to.query.page || 1
  await store.dispatch('event/fetchEvents', { page })
  to.params.page = page
  next()
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    Card
  },
  beforeRouteUpdate: fetchPageEvents,
  beforeRouteEnter: fetchPageEvents,
  computed: {
    hasNextPage() {
      return this.totalEvents > this.page * this.perPage
    },
    ...mapState({
      events: state => state.event.events,
      totalEvents: state => state.event.total,
      perPage: state => state.event.perPage
    })
  }
}
</script>
