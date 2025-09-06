<template>
  <div class="character-card" @click="goToCharacter">
    <div class="card h-100">
      <div class="card-image-container">
        <img :src="character.image" :alt="character.name" class="card-img-top">
        <div class="status-badge" :class="statusClass">
          {{ character.status }}
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ character.name }}</h5>
        <div class="character-info">
          <p class="card-text">
            <strong>Especie:</strong> {{ character.species }}
          </p>
          <p class="card-text">
            <strong>Género:</strong> {{ character.gender }}
          </p>
          <p class="card-text">
            <strong>Origen:</strong> {{ character.origin.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  computed: {
    statusClass() {
      return {
        'status-alive': this.character.status === 'Alive',
        'status-dead': this.character.status === 'Dead',
        'status-unknown': this.character.status === 'unknown'
      }
    }
  },
  methods: {
    goToCharacter() {
      this.$router.push(`/character/${this.character.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.character-card {
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
}

.card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}

.card-image-container {
  position: relative;
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.character-card:hover .card-img-top {
  transform: scale(1.05);
}

.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
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

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.character-info {
  .card-text {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #666;
    
    strong {
      color: #333;
    }
  }
}
</style>