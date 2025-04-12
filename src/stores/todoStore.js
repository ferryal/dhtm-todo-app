import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todos: useStorage("todos", []),
    filter: "all",
  }),

  getters: {
    filteredTodos() {
      if (this.filter === "active") {
        return this.todos.filter((todo) => !todo.completed);
      } else if (this.filter === "completed") {
        return this.todos.filter((todo) => todo.completed);
      }
      return this.todos;
    },

    completedCount() {
      return this.todos.filter((todo) => todo.completed).length;
    },

    activeCount() {
      return this.todos.filter((todo) => !todo.completed).length;
    },

    allCompleted() {
      return this.todos.length > 0 && this.completedCount === this.todos.length;
    },
  },

  actions: {
    addTodo(text) {
      if (!text.trim()) return;

      this.todos.push({
        id: Date.now(),
        text: text.trim(),
        completed: false,
      });
    },

    removeTodo(id) {
      const index = this.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },

    toggleTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    updateTodo(id, text) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo && text.trim()) {
        todo.text = text.trim();
      }
    },

    toggleAll() {
      const allDone = this.allCompleted;
      this.todos.forEach((todo) => {
        todo.completed = !allDone;
      });
    },

    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
    },

    setFilter(filter) {
      this.filter = filter;
    },

    // Debug helper function to add multiple todos for testing scrolling
    addTestTodos(count = 15) {
      const existingCount = this.todos.length;
      for (let i = 0; i < count; i++) {
        this.addTodo(
          `Test Todo Item #${
            existingCount + i + 1
          } - This is a longer todo to test overflow and scrolling behavior`
        );
      }
    },
  },
});
