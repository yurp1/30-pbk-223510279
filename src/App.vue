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
  background-image: url("./assets/background.png");
  background-size: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
  color: white;
  background-repeat: no-repeat;
  max-width: 600px;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  
 
}

.todo-item {
  background-color: #f9f9f9;
  padding: 10px;
  color: black;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
 
  
}

.completed {
  text-decoration: line-through;
  color: grey;
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