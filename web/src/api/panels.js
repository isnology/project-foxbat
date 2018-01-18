import api from './init'

export function savePanel(data) {
  return api.post('/panels', data)
  .then((res) => res.data)
}

export function updatePanel(id, data) {
  return api.put(`/products/${id}`, data)
  .then((res) => res.data)
}
