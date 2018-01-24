import api from './init'

export function emailPanelDesign(email, slotData, templateID) {
  return api.post(`/submitpanel`, email, slotData, templateID)
    .then((res) => res.email)
}