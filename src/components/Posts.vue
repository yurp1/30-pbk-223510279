<template>
    <div class="posts-container">
      <h2>Postingan User</h2>
      <select v-model="selectedUser" class="select-box">
        <option value="" selected>Pilih Username</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.username }}</option>
      </select>
      <div v-if="selectedUser !== ''">
        <div v-if="posts.length > 0" class="post-list">
          <h3>{{ selectedUsername }}</h3>
          <div class="post-card" v-for="post in posts" :key="post.id">
            <h4>{{ post.title }}</h4>
            <p>{{ post.body }}</p>
          </div>
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const props = defineProps({
    initialUsers: {
      type: Array,
      required: true,
    },
  });
  
  const users = ref([...props.initialUsers]);
  const posts = ref([]);
  const selectedUser = ref('');
  
  const selectedUsername = computed(() => {
    const user = users.value.find(user => user.id === parseInt(selectedUser.value));
    return user ? user.username : '';
  });
  
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
  
  watch(selectedUser, fetchPosts);
  </script>
  
  <style scoped>
  .posts-container {
    position: fixed;
    top: 15%;
    left: 25%;
    width: 50%;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    height: 70%;
    overflow-y: auto;
  }
  
  .posts-container h2 {
    color: black;
    font-weight: bold;
    font-family: "Poetsen One", sans-serif;
  }
  
  .post-list {
    max-height: 300px;
    overflow-y: auto;
  }
  
  .select-box {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .post-card {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
    height: 50px;
  }
  
  .post-card h4 {
    margin: 0 0 10px;
    color: black;
    font-weight: bold;
    font-size: 14px;
  }
  
  .post-card p {
    font-size: 11px;
    margin:
  }
  </style>