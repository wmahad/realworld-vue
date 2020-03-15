import { postEvent } from '@/utils/api'

export default {
  async createEvent({ commit }, event) {
    const res = await postEvent(event)
    commit('ADD_EVENT', res.data)
    return res.data
  }
}
