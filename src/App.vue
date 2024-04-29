<template>
  
  <div class="container">
    <h1>JADWAL BULAN RAMADHAN</h1>
    <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="kegiatan">
    <div v-for="(todo, index) in todos" :key="index" class="todo-item" :class="{ 'completed': todo.completed }">
      <input type="checkbox" v-model="todo.completed"> {{ todo.text }}
      <button @click="cancelTodo(index)">DELETE</button>
    </div>
    <button @click="filterTodos">Filter Belum Selesai</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: []
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = '';
      }
    },
    cancelTodo(index) {
      this.todos.splice(index, 1);
    },
    filterTodos() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  }
}
</script>

<style scoped>

.container {
  max-width: 600px;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
  background-image: url("./assets/background.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.todo-item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: black;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

input

{
text-align: center;
width: 50%;

padding: 12px 10px;

box-sizing: border-box;

font-size: 18px;

}

 

input[type=submit]

{

background-color: crimson;

border-radius:18px;

color: white;
}
</style>