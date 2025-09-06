<template>
  <div class="loading-container">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Cargando...</span>
    </div>
    <p class="loading-text">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    message: {
      type: String,
      default: 'Cargando...'
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  
  .spinner-border {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
  }
  
  .loading-text {
    font-size: 1.1rem;
    color: #666;
    margin: 0;
  }
}
</style>