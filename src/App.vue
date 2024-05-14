<template>
  <div class="container1">
    <nav class="navbar ">
      <button @click="toggleTodos" :class="{ 'active': todosActive }" class="navbar-brand btn btn-primary" style="color: white;">Todos</button>
      <button @click="togglePosts" :class="{ 'active': postsActive }" class="navbar-brand btn btn-primary" style="color: white;">Posts</button>
    </nav>
  </div>

  <div v-if="todosActive">
    <div class="container">
    <h1>JADWAL BULAN RAMADHAN</h1>
    <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="kegiatan">
    <div v-for="(todo, index) in todosToShow" :key="index" class="todo-item btn btn-danger" :class="{ 'completed': todo.completed }">
      <input type="checkbox" v-model="todo.completed"> {{ todo.text }}
      <button @click="deleteTodoConfirm(index)">DELETE</button>
    </div>
    <button class="filter" @click="toggleFilter">{{ filterButtonLabel }}</button>
  </div>
  </div>
  
  <div v-if="postsActive">
    <div class="contain">
    <h2>Postingan User</h2>
    <select v-model="selectedUser">
      <option value="" selected>Pilih Username</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.username }}</option>
    </select>
    <div v-if="selectedUser !== ''">
      <div v-if="posts.length > 0">
        <h3>{{ selectedUsername }}</h3>
        <ul>
          <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
        </ul>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Swal from 'sweetalert2';


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

const newTodo = ref('');
const todos = ref([]);
const deletedTodos = ref([]);
const showCompleted = ref(false);

const todosToShow = computed(() => {
  return showCompleted.value ? todos.value.filter(todo => !todo.completed) : todos.value.concat(deletedTodos.value);
});

const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    todos.value.push({ text: newTodo.value, completed: false });
    newTodo.value = '';
    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Kegiatan berhasil ditambahkan!'
    });
  }
};

const deleteTodoConfirm = (index) => {
  Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Anda tidak akan dapat mengembalikan ini!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteTodo(index);
      Swal.fire(
        'Terhapus!',
        'Kegiatan berhasil dihapus.',
        'success'
      );
    }
  });
};

const deleteTodo = (index) => {
  const [deletedTodo] = todos.value.splice(index, 1);
  deletedTodos.value.push(deletedTodo);
};

const toggleFilter = () => {
  showCompleted.value = !showCompleted.value;
};

const filterButtonLabel = computed(() => {
  return showCompleted.value ? 'Filter Belum Selesai' : 'Tampilkan Semua';
});

const users = ref([]);
const posts = ref([]);
const selectedUser = ref('');

const selectedUsername = computed(() => {
  const user = users.value.find(user => user.id === parseInt(selectedUser.value));
  return user ? user.username : '';
});

const fetchUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    users.value = await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const fetchPosts = async () => {
  if (selectedUser.value === '') {
    posts.value = [];
    return;
  }
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
    posts.value = await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

onMounted(fetchUsers);

watch(selectedUser, fetchPosts);
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 10%;
  left: 35%;
}

.navbar button {
  margin-left: 100px;
}

.container {
  display: grid;
  background-image: url("https://raw.githubusercontent.com/yurp1/30-pbk-223510279/master/src/assets/background.png");
  background-size: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
  color: white;
  background-repeat: no-repeat;
  max-width: 600px;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  position: fixed;
  top: 30%;
  left: 30%;
}

.contain{
  left: 40%;
  top: 30%;
}

.container input {
  background-color: transparent;
  backdrop-filter: blur(5px);
}
.container input::placeholder{
  color: white;
}

.todo-item {
  background-color: transparent;
  backdrop-filter: blur(10px);
  padding: 10px;
  color: black;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.completed {
  text-decoration: line-through;
  color: grey;
}

input {
  text-align: center;
  width: 50%;
  padding: 12px 10px;
  box-sizing: border-box;
  font-size: 18px;
}

input[type=submit] {
  background-color: crimson;
  border-radius: 18px;
  color: white;
}

.filter {
  margin-left: 5px;
}

</style>
