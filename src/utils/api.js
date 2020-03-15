import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const getEvents = () => client.get('/events')
export const getEvent = id => client.get(`/events/${id}`)
export const postEvent = event => client.post('/events', event)
