<template>
    <div>
      <h1>Album Foto</h1>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="photo in photos" :key="photo.id" class="photo">
          <img :src="photo.thumbnailUrl" :alt="photo.title" />
          <p>{{ photo.title }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PhotoAlbum',
    data() {
      return {
        photos: [],
        loading: true,
      };
    },
    created() {
      this.fetchPhotos();
    },
    methods: {
      async fetchPhotos() {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
          this.photos = response.data.slice(0, 10); // Ambil 10 foto pertama
        } catch (error) {
          console.error('Error fetching photos:', error);
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .photo {
    margin: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }
  
  .photo img {
    max-width: 100%;
    height: auto;
  }
  </style>
  