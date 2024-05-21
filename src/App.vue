<template>
  <div class="container1">
    <nav class="navbar">
      <button @click="toggleTodos" :class="{ 'active': todosActive }" class="navbar-brand btn btn-primary" style="color: white;">Todos</button>
      <button @click="togglePosts" :class="{ 'active': postsActive }" class="navbar-brand btn btn-primary" style="color: white;">Posts</button>
    </nav>
  </div>

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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';

const todosActive = ref(true);
const postsActive = ref(false);

const toggleTodos = () => {
  todosActive.value = true;
  postsActive.value = false;
};

const togglePosts = () => {
  todosActive.value = false;
  postsActive.value = true;
};

// Data for Todos
const todos = ref([
  { text: 'Membaca Al-Quran', completed: false },
  { text: 'Sholat Tarawih', completed: false },
]);

const showCompleted = ref(false);

// Data for Posts
const users = ref([]);

const fetchUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    users.value = await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');

.navbar {
  position: fixed;
  top: 10%;
  left: 35%;
}

.navbar button {
  margin-left: 100px;
}

.container1 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
