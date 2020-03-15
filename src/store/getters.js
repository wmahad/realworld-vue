export default {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
