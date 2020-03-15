import { postEvent, getEvents, getEvent } from '@/utils/api'

export const namespaced = true

export const state = {
  events: [],
  event: {},
  total: 0
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, count) {
    state.totalEvents = count
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  async createEvent({ commit, dispatch }, event) {
    try {
      const res = await postEvent(event)
      commit('ADD_EVENT', res.data)
      return res.data
    } catch (error) {
      const notification = {
        type: 'error',
        message: 'There was a problem creating your event: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
      throw error
    }
  },
  async fetchEvents({ commit, dispatch }, { page, perPage = 3 }) {
    try {
      const { data, headers } = await getEvents(page, perPage)
      commit('SET_EVENTS_TOTAL', +headers['x-total-count'])
      commit('SET_EVENTS', data)
      const notification = {
        type: 'success',
        message: 'Your event has been created!'
      }
      dispatch('notification/add', notification, { root: true })
    } catch (error) {
      const notification = {
        type: 'error',
        message: 'There was a problem fetching events: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
    }
  },
  async fetchEvent({ commit, getters, dispatch }, id) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return
    }
    try {
      const { data } = await getEvent(id)
      commit('SET_EVENT', data)
    } catch (error) {
      const notification = {
        type: 'error',
        message: 'There was a problem fetching event: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
    }
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
