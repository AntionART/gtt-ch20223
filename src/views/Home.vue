<template>
  <div class="home">
    <header class="hero-section">
      <div class="container">
        <h1 class="hero-title">Rick and Morty</h1>
        <p class="hero-subtitle">Explora el multiverso de personajes</p>
      </div>
    </header>

    <main class="container">
      <LoadingSpinner v-if="loading" message="Cargando personajes..." />
      
      <div v-else-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
      
      <div v-else>
        <div class="characters-grid">
          <CharacterCard 
            v-for="character in characters" 
            :key="character.id"
            :character="character"
          />
        </div>
        
        <Pagination 
          :current-page="pagination.currentPage"
          :total-pages="pagination.totalPages"
          @page-changed="handlePageChange"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CharacterCard from '@/components/CharacterCard.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'Home',
  components: {
    CharacterCard,
    Pagination,
    LoadingSpinner
  },
  computed: {
    ...mapGetters('characters', ['characters', 'pagination', 'loading', 'error'])
  },
  methods: {
    ...mapActions('characters', ['fetchCharacters']),
    
    handlePageChange(page) {
      this.fetchCharacters(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  created() {
    this.fetchCharacters(1)
  }
}
</script>

<style lang="scss" scoped>
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  margin-bottom: 3rem;
  
  .hero-title {
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .hero-subtitle {
    font-size: 1.3rem;
    text-align: center;
    margin: 0;
    opacity: 0.9;
  }
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 0;
    
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.1rem;
    }
  }
  
  .characters-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
}
</style>