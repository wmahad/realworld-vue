import { postEvent, getEvents, getEvent } from '@/utils/api'

export const namespaced = true

export const state = {
  events: [],
  event: {},
  total: 0,
  perPage: 3
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, count) {
    state.total = count
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
      const notification = {
        type: 'success',
        message: 'Your event has been created!'
      }
      dispatch('notification/add', notification, { root: true })
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
  async fetchEvents({ commit, dispatch, state }, { page }) {
    try {
      const { data, headers } = await getEvents(page, state.perPage)
      commit('SET_EVENTS_TOTAL', +headers['x-total-count'])
      commit('SET_EVENTS', data)
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
      return event
    }
    try {
      const { data } = await getEvent(id)
      commit('SET_EVENT', data)
      return data
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
