import { api } from "../api"


export const getNotes = async() => {
    return api.get('/note')
}

export const updateNote = async(note) => {
    return api.put('/note', note)
}

export const deleteNote = async(id) => {
    return api.delete(`/note`, { params: { id } })
}

export const createNote = async(note) => {
    return api.post('/note', note)
}