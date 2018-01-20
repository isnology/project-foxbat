import api from './init'

export function loadInstruments() {
  return api.get('/instruments')
  .then((res) => res.data)
}

export function updateIntrument(id, data) {
  return api.put(`/instruments/${id}`, data)
  .then((res) => res.data)
}

export function createNewIntrument(id, data) {
  return api.post(`/instruments`, data)
  .then((res) => res.data)
}
