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
import Card from '@/components/Card.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Card
  },
  async created() {
    this.perPage = 3
    await this.$store.dispatch('event/fetchEvents', { page: this.page })
  },
  computed: {
    page() {
      return +this.$route.query.page || 1
    },
    hasNextPage() {
      return this.totalEvents > this.page * this.perPage
    },
    ...mapState({
      events: state => state.event.events,
      totalEvents: state => state.event.events.total
    })
  }
}
</script>
