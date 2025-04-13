<template>
  <h1 class="app-title">todos</h1>
  <section class="todoapp">
    <header class="header">
      <TodoForm @add="addTodo" />
    </header>

    <div class="todo-content">
      <TodoList :todos="store.filteredTodos" />
    </div>

    <footer class="footer" v-show="store.todos.length">
      <div class="footer-content">
        <div class="todo-info">
          <span class="todo-count">
            <strong>{{ store.activeCount }}</strong>
            {{ store.activeCount === 1 ? "item" : "items" }} left
          </span>

          <Button
            v-if="store.completedCount > 0"
            variant="ghost"
            rounded
            class="clear-completed"
            @click="clearCompleted"
          >
            Clear completed
          </Button>
        </div>

        <TodoFilter v-model="filter" />
      </div>
    </footer>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import TodoForm from "@/components/TodoForm.vue";
import TodoList from "@/components/TodoList.vue";
import TodoFilter from "@/components/TodoFilter.vue";
import Button from "@/components/Button.vue";

const store = useTodoStore();
const filter = computed({
  get: () => store.filter,
  set: (value) => store.setFilter(value),
});

const addTodo = (text) => {
  store.addTodo(text);
};

const clearCompleted = () => {
  store.clearCompleted();
};
</script>

<style scoped>
.app-title {
  position: relative;
  font-size: 90px;
  font-weight: 100;
  text-align: center;
  color: var(--primary-light);
  text-rendering: optimizeLegibility;
  text-shadow: 0 2px 15px rgba(108, 92, 231, 0.4);
  transition: color 0.3s ease;
  opacity: 0.8;
  margin: 0 0 50px 0;
}

.app-title:hover {
  color: var(--primary-color);
}

.todoapp {
  background: var(--card-bg);
  margin: 30px 0;
  position: relative;
  box-shadow: var(--card-shadow);
  border-radius: 20px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* Use height constraints that allow the component to grow but maintain reasonable proportions */
  min-height: 400px;
  max-height: calc(100vh - 330px);
}

.todoapp:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
}

.header {
  padding: 0;
  position: relative;
  flex-shrink: 0;
}

.footer {
  position: sticky;
  bottom: 0;
  border-top: 1px solid var(--border-color);
  background-color: var(--card-bg);
  z-index: 10;
  flex-shrink: 0;
  width: 100%;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
}

.footer-content {
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.todo-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.todo-count {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.todo-count strong {
  font-weight: 600;
  color: var(--primary-color);
}

.clear-completed {
  font-size: 14px !important;
  opacity: 0.7;
}

.clear-completed:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .todoapp {
    max-width: 550px;
    min-height: 350px;
    max-height: calc(100vh - 180px);
  }

  .app-title {
    font-size: 70px;
    margin-bottom: 40px;
  }
}

@media (max-width: 550px) {
  .todoapp {
    border-radius: 15px;
    margin: 20px 0 30px 0;
    min-height: 300px;
    max-height: calc(100vh - 160px);
  }

  .app-title {
    font-size: 60px;
    margin-bottom: 30px;
  }

  .footer-content {
    padding: 10px 15px;
  }
}

.todo-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0; /* Important for nested flex containers with overflow */
}

/* Add a subtle gradient overlay at the bottom of the list */
.todo-content::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 15px;
  background: linear-gradient(to bottom, transparent, var(--card-bg));
  pointer-events: none;
  opacity: 0.7;
  z-index: 5;
}
</style>
