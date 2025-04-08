<template>
  <section class="todo-list-container">
    <div v-if="todos.length === 0" class="empty-state">
      <p>No todos yet. Add one to get started!</p>
    </div>
    <transition-group v-else name="list" tag="ul" class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="fade-in">
        <TodoItem :todo="todo" />
      </li>
    </transition-group>
  </section>
</template>

<script setup>
import TodoItem from "@/components/TodoItem.vue";

defineProps({
  todos: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.todo-list-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: auto;
  max-height: 100%;
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) transparent;
  flex: 1;
  padding-bottom: 10px;
}

.empty-state {
  text-align: center;
  padding: 30px 20px;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  animation: fadeIn 0.5s ease;
}

:root.light-mode .empty-state {
  color: rgba(0, 0, 0, 0.5);
}

/* Animation for list items */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@media (max-width: 768px) {
  .todo-list-container {
    max-height: none;
  }
}

@media (max-width: 550px) {
  .todo-list-container {
    max-height: none;
  }

  .empty-state {
    padding: 25px 15px;
    font-size: 15px;
  }
}
</style>
