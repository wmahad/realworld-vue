import { postEvent, getEvents, getEvent } from '@/utils/api'

export default {
  async createEvent({ commit }, event) {
    const res = await postEvent(event)
    commit('ADD_EVENT', res.data)
    return res.data
  },
  async fetchEvents({ commit }, { page, perPage = 3 }) {
    try {
      const { data, headers } = await getEvents(page, perPage)
      commit('SET_EVENTS_TOTAL', +headers['x-total-count'])
      commit('SET_EVENTS', data)
    } catch (error) {
      console.log(error)
    }
  },
  async fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return
    }
    try {
      const { data } = await getEvent(id)
      commit('SET_EVENT', data)
    } catch (error) {
      console.log(error)
    }
  }
}
