<template>
  <div class="home">
    <h1>create event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        v-model="event.category"
        :options="categories"
      />
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Add an event title"
        class="field"
      />
      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
        class="field"
      />
      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a location"
        class="field"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <BaseSelect
        label="Select a time"
        v-model="event.time"
        :options="times"
        class="field"
      />
      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(),
      times,
      categories: this.$store.state.categories
    }
  },
  methods: {
    async createEvent() {
      NProgress.start()
      try {
        const event = await this.$store.dispatch(
          'event/createEvent',
          this.event
        )
        this.$router.push({
          name: 'event-detail',
          params: { id: event.id }
        })
        this.event = this.createFreshEvent()
        // eslint-disable-next-line no-empty
      } catch (e) {
        NProgress.done()
      }
    },
    createFreshEvent() {
      const user = this.$store.state.user
      return {
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
