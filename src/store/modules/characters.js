import api from '@/services/api'

const state = {
  characters: [],
  currentCharacter: null,
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalCharacters: 0
  },
  loading: false,
  error: null
}

const mutations = {
  SET_CHARACTERS(state, characters) {
    state.characters = characters
  },
  
  SET_CURRENT_CHARACTER(state, character) {
    state.currentCharacter = character
  },
  
  SET_PAGINATION(state, info) {
    state.pagination = {
      currentPage: info.currentPage || 1,
      totalPages: info.pages || 0,
      totalCharacters: info.count || 0
    }
  },
  
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchCharacters({ commit }, page = 1) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const response = await api.getCharacters(page)
      commit('SET_CHARACTERS', response.data.results)
      commit('SET_PAGINATION', {
        currentPage: page,
        pages: response.data.info.pages,
        count: response.data.info.count
      })
    } catch (error) {
      commit('SET_ERROR', 'Error al cargar los personajes')
      console.error('Error fetching characters:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async fetchCharacter({ commit }, id) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const response = await api.getCharacter(id)
      commit('SET_CURRENT_CHARACTER', response.data)
    } catch (error) {
      commit('SET_ERROR', 'Error al cargar el personaje')
      console.error('Error fetching character:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const getters = {
  characters: state => state.characters,
  currentCharacter: state => state.currentCharacter,
  pagination: state => state.pagination,
  loading: state => state.loading,
  error: state => state.error
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}