<template>
  <div class="character-detail">
    <div class="container">
      <button class="btn btn-outline-primary mb-4" @click="goBack">
        ← Volver al inicio
      </button>

      <LoadingSpinner v-if="loading" message="Cargando personaje..." />
      
      <div v-else-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
      
      <div v-else-if="currentCharacter" class="character-content">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="character-image-container">
              <img 
                :src="currentCharacter.image" 
                :alt="currentCharacter.name" 
                class="character-image"
              >
              <div class="status-badge" :class="statusClass">
                {{ currentCharacter.status }}
              </div>
            </div>
          </div>
          
          <div class="col-lg-8 col-md-6">
            <div class="character-info">
              <h1 class="character-name">{{ currentCharacter.name }}</h1>
              
              <div class="info-grid">
                <div class="info-item">
                  <h3>Información Personal</h3>
                  <div class="info-details">
                    <p><strong>Especie:</strong> {{ currentCharacter.species }}</p>
                    <p><strong>Tipo:</strong> {{ currentCharacter.type || 'Desconocido' }}</p>
                    <p><strong>Género:</strong> {{ currentCharacter.gender }}</p>
                    <p><strong>Estado:</strong> {{ currentCharacter.status }}</p>
                  </div>
                </div>
                
                <div class="info-item">
                  <h3>Ubicación</h3>
                  <div class="info-details">
                    <p><strong>Origen:</strong> {{ currentCharacter.origin.name }}</p>
                    <p><strong>Última ubicación:</strong> {{ currentCharacter.location.name }}</p>
                  </div>
                </div>
                
                <div class="info-item">
                  <h3>Episodios</h3>
                  <div class="info-details">
                    <p><strong>Apariciones:</strong> {{ currentCharacter.episode.length }} episodios</p>
                    <p><strong>Creado:</strong> {{ formatDate(currentCharacter.created) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'Character',
  components: {
    LoadingSpinner
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('characters', ['currentCharacter', 'loading', 'error']),
    
    statusClass() {
      if (!this.currentCharacter) return ''
      return {
        'status-alive': this.currentCharacter.status === 'Alive',
        'status-dead': this.currentCharacter.status === 'Dead',
        'status-unknown': this.currentCharacter.status === 'unknown'
      }
    }
  },
  methods: {
    ...mapActions('characters', ['fetchCharacter']),
    
    goBack() {
      this.$router.push('/')
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  created() {
    this.fetchCharacter(this.id)
  },
  
  watch: {
    id(newId) {
      this.fetchCharacter(newId)
    }
  }
}
</script>

<style lang="scss" scoped>
.character-detail {
  padding: 2rem 0;
  min-height: 100vh;
}

.character-content {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 2rem;
}

.character-image-container {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  
  .character-image {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .status-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 8px 15px;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: bold;
    text-transform: uppercase;
    
    &.status-alive {
      background-color: #28a745;
      color: white;
    }
    
    &.status-dead {
      background-color: #dc3545;
      color: white;
    }
    
    &.status-unknown {
      background-color: #6c757d;
      color: white;
    }
  }
}

.character-info {
  padding-left: 2rem;
  
  .character-name {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.info-grid {
  display: grid;
  gap: 2rem;
  
  .info-item {
    h3 {
      color: #333;
      font-size: 1.3rem;
      font-weight: bold;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #667eea;
    }
    
    .info-details {
      p {
        margin-bottom: 0.8rem;
        font-size: 1.1rem;
        color: #555;
        
        strong {
          color: #333;
          display: inline-block;
          min-width: 120px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .character-content {
    padding: 1rem;
  }
  
  .character-info {
    padding-left: 0;
    margin-top: 2rem;
    
    .character-name {
      font-size: 2rem;
    }
  }
  
  .info-grid {
    gap: 1.5rem;
  }
}
</style>