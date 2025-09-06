<template>
  <nav aria-label="Character pagination" v-if="totalPages > 1">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage <= 1 }">
        <button 
          class="page-link" 
          @click="changePage(currentPage - 1)"
          :disabled="currentPage <= 1"
        >
          Anterior
        </button>
      </li>
      
      <li 
        v-for="page in visiblePages" 
        :key="page"
        class="page-item" 
        :class="{ active: page === currentPage }"
      >
        <button class="page-link" @click="changePage(page)">
          {{ page }}
        </button>
      </li>
      
      <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
        <button 
          class="page-link" 
          @click="changePage(currentPage + 1)"
          :disabled="currentPage >= totalPages"
        >
          Siguiente
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    visiblePages() {
      const delta = 2
      const range = []
      const rangeWithDots = []

      for (let i = Math.max(2, this.currentPage - delta);
           i <= Math.min(this.totalPages - 1, this.currentPage + delta);
           i++) {
        range.push(i)
      }

      if (this.currentPage - delta > 2) {
        rangeWithDots.push(1, '...')
      } else {
        rangeWithDots.push(1)
      }

      rangeWithDots.push(...range)

      if (this.currentPage + delta < this.totalPages - 1) {
        rangeWithDots.push('...', this.totalPages)
      } else {
        rangeWithDots.push(this.totalPages)
      }

      return rangeWithDots
    }
  },
  methods: {
    changePage(page) {
      if (page !== '...' && page !== this.currentPage && page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin: 2rem 0;
  
  .page-link {
    border-radius: 8px;
    margin: 0 2px;
    border: 1px solid #dee2e6;
    color: #007bff;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #007bff;
      color: white;
      transform: translateY(-2px);
    }
  }
  
  .page-item.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
    font-weight: bold;
  }
  
  .page-item.disabled .page-link {
    color: #6c757d;
    background-color: #f8f9fa;
    border-color: #dee2e6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      background-color: #f8f9fa;
      color: #6c757d;
    }
  }
}
</style>