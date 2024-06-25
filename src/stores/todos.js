import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [
      { text: 'Membaca Al-Quran', completed: false },
      { text: 'Sholat Tarawih', completed: false },
    ],
    showCompleted: false,
  }),
  getters: {
    todosToShow(state) {
      return state.showCompleted ? state.todos.filter(todo => !todo.completed) : state.todos;
    },
    filterButtonLabel(state) {
      return state.showCompleted ? 'Filter Belum Selesai' : 'Tampilkan Semua';
    },
  },
  actions: {
    addTodo(newTodo) {
      if (newTodo.trim() !== '') {
        this.todos.push({ text: newTodo, completed: false });
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Kegiatan berhasil ditambahkan!',
        });
      }
    },
    deleteTodoConfirm(index) {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda tidak akan dapat mengembalikan ini!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.todos.splice(index, 1);
          Swal.fire('Terhapus!', 'Kegiatan berhasil dihapus.', 'success');
        }
      });
    },
    toggleFilter() {
      this.showCompleted = !this.showCompleted;
    },
  },
});
