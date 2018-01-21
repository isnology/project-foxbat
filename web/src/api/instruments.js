import api from './init'

export function loadInstruments() {
  return api.get('/instruments')
  .then((res) => res.data)
}

export function updateInstrument(id, data) {
  return api.put(`/instruments/${id}`, data)
  .then((res) => res.data)
}

export function createInstrument(data) {
  return api.post(`/instruments`, data)
  .then((res) => res.data)
}
