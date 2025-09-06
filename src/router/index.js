import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Character from '../views/Character.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/character/:id',
    name: 'Character',
    component: Character,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router