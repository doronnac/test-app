import { api } from "../api"

export const getTemplates = async() => {
    return api.get('/template')
}

export const updateTemplate = async(template) => {
    return api.put('/template', template)
}

export const deleteTemplate = async(id) => {
    return api.delete(`/template`, { params: { id } })
}

export const createTemplate = async(template) => {
    return api.post('/template', template)
}