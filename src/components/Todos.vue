<template>
    <div class="todos-container">
      <h1>JADWAL BULAN RAMADHAN</h1>
      <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="Kegiatan">
      <div class="todo-list">
        <div v-for="(todo, index) in todosToShow" :key="index" class="todo-item" :class="{ 'completed': todo.completed }">
          <input type="checkbox" v-model="todo.completed"> {{ todo.text }}
          <button @click="deleteTodoConfirm(index)">DELETE</button>
        </div>
      </div>
      <button class="filter" @click="toggleFilter">{{ filterButtonLabel }}</button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import Swal from 'sweetalert2';
  
  const props = defineProps({
    initialTodos: {
      type: Array,
      required: true,
    },
    showCompleted: {
      type: Boolean,
      required: true,
    },
  });
  
  const newTodo = ref('');
  const todos = ref([...props.initialTodos]);
  const showCompleted = ref(props.showCompleted);
  
  const todosToShow = computed(() => {
    return showCompleted.value ? todos.value.filter(todo => !todo.completed) : todos.value;
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
    todos.value.splice(index, 1);
  };
  
  const toggleFilter = () => {
    showCompleted.value = !showCompleted.value;
  };
  
  const filterButtonLabel = computed(() => {
    return showCompleted.value ? 'Filter Belum Selesai' : 'Tampilkan Semua';
  });
  </script>
  
  <style scoped>
  .todos-container {
    display: grid;
    background-image: url("https://raw.githubusercontent.com/yurp1/30-pbk-223510279/master/src/assets/background.png");
    background-size: cover;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    height: 50%;
    overflow-y: auto;
  }
  
  .todo-list {
    max-height: 300px;
    overflow-y: auto;
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
    margin-left: 14px;
  }
  </style>
  