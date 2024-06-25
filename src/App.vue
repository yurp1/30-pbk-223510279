<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat @click="toggleTodos" :class="{ 'active': todosActive }" icon="assignment" label="Todos" />
        <q-btn flat @click="togglePosts" :class="{ 'active': postsActive }" icon="article" label="Posts" />
        <q-btn flat @click="togglePhotos" :class="{ 'active': photosActive }" icon="photo" label="Photos" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <Todos v-if="todosActive" :initialTodos="todos" :showCompleted="showCompleted">
          <template v-slot:header>
            <h1>JADWAL BULAN RAMADHAN</h1>
          </template>
          <template v-slot:footer>
            <p>KEGIATAN UNTUK BULAN RAMADHAN</p>
          </template>
        </Todos>

        <Posts v-if="postsActive" :initialUsers="users">
          <template v-slot:header>
            <h2>POSTINGAN USER</h2>
          </template>
          <template v-slot:footer>
            <p>Posts</p>
          </template>
        </Posts>

        <PhotoAlbum v-if="photosActive">
          <template v-slot:header>
            <h1>ALBUM FOTO</h1>
          </template>
          <template v-slot:footer>
            <p>Foto dari JSONPlaceholder</p>
          </template>
        </PhotoAlbum>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Quasar, QLayout, QHeader, QToolbar, QBtn, QPageContainer, QPage } from 'quasar'

import Todos from './components/Todos.vue'
import Posts from './components/Posts.vue'
import PhotoAlbum from './components/PhotoAlbum.vue'

const todosActive = ref(true)
const postsActive = ref(false)
const photosActive = ref(false)

const toggleTodos = () => {
  todosActive.value = true
  postsActive.value = false
  photosActive.value = false
}

const togglePosts = () => {
  todosActive.value = false
  postsActive.value = true
  photosActive.value = false
}

const togglePhotos = () => {
  todosActive.value = false
  postsActive.value = false
  photosActive.value = true
}

// Data for Todos
const todos = ref([
  { text: 'Membaca Al-Quran', completed: false },
  { text: 'Sholat Tarawih', completed: false },
])

const showCompleted = ref(false)

// Data for Posts
const users = ref([])

const fetchUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    users.value = await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

onMounted(fetchUsers)
</script>

<style scoped>
@import 'quasar/dist/quasar.sass';

.active {
  background-color: #027be3;
  color: white;
}
</style>
