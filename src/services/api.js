import axios from 'axios'

const API_BASE_URL = 'https://rickandmortyapi.com/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

export default {
  getCharacters(page = 1) {
    return apiClient.get(`/character/?page=${page}`)
  },
  
  getCharacter(id) {
    return apiClient.get(`/character/${id}`)
  }
}