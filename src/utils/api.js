import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export const getEvents = (page, perPage) => {
  return client.get(`/events?_page=${page}&_limit=${perPage}`)
}
export const getEvent = id => client.get(`/events/${id}`)
export const postEvent = event => client.post('/events', event)
