<template>
  <div>
    <h1>Event list</h1>
    <Card v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import { getEvents } from '@/utils/api'

export default {
  components: {
    Card
  },
  data() {
    return {
      events: []
    }
  },
  async created() {
    try {
      const res = await getEvents()
      this.events = res.data
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
