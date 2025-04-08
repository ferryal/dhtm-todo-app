<template>
  <div
    class="todo-item"
    :class="{ completed: todo.completed, editing: isEditing }"
  >
    <div class="view" v-show="!isEditing">
      <div class="checkbox-container">
        <Checkbox v-model="isCompleted" />
      </div>
      <label @dblclick="startEdit">{{ todo.text }}</label>
      <Button variant="ghost" icon class="destroy" @click="removeTodo">
        ×
      </Button>
    </div>
    <Input
      v-if="isEditing"
      v-model="editedText"
      :borderRadius="false"
      class="edit-input"
      @enter="doneEdit"
      @blur="doneEdit"
    />
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import Checkbox from "@/components/Checkbox.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const store = useTodoStore();
const isEditing = ref(false);
const editedText = ref("");

const isCompleted = computed({
  get: () => props.todo.completed,
  set: (value) => store.toggleTodo(props.todo.id),
});

function removeTodo() {
  store.removeTodo(props.todo.id);
}

function startEdit() {
  isEditing.value = true;
  editedText.value = props.todo.text;
  nextTick(() => {
    const input = document.querySelector(".edit-input input");
    if (input) input.focus();
  });
}

function doneEdit() {
  if (!isEditing.value) return;
  const text = editedText.value.trim();
  if (text) {
    store.updateTodo(props.todo.id, text);
  } else {
    removeTodo();
  }
  isEditing.value = false;
}

function cancelEdit() {
  isEditing.value = false;
}

// Listen for escape key to cancel edit
watch(isEditing, (value) => {
  if (value) {
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        cancelEdit();
        document.removeEventListener("keydown", handleKeydown);
      }
    };
    document.addEventListener("keydown", handleKeydown);
  }
});
</script>

<style scoped>
.todo-item {
  position: relative;
  font-size: 18px;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.2s ease;
  user-select: none;
}

.todo-item:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

:root.light-mode .todo-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item.completed label {
  color: rgba(255, 255, 255, 0.4);
  text-decoration: line-through;
  transition: color 0.3s ease;
}

:root.light-mode .todo-item.completed label {
  color: rgba(0, 0, 0, 0.4);
  text-decoration: line-through;
}

.view {
  display: flex;
  align-items: center;
  position: relative;
  min-height: 56px;
}

.checkbox-container {
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

label {
  flex-grow: 1;
  word-break: break-all;
  padding: 16px 45px 16px 0;
  display: block;
  line-height: 1.3;
  transition: all 0.3s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.8);
}

:root.light-mode label {
  color: rgba(0, 0, 0, 0.8);
}

.destroy {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: all 0.2s ease;
  font-size: 22px !important;
}

.todo-item:hover .destroy {
  opacity: 0.8;
}

.destroy:hover {
  color: var(--accent-color) !important;
  transform: translateY(-50%) scale(1.1);
}

.edit-input {
  font-size: 18px;
}

:deep(.edit-input input) {
  border-radius: 0;
  background: rgba(28, 30, 60, 0.95);
  padding-left: 60px;
}

:root.light-mode :deep(.edit-input input) {
  background: rgba(240, 240, 240, 0.95);
  color: rgba(0, 0, 0, 0.8);
}

@media (max-width: 550px) {
  .todo-item {
    font-size: 16px;
  }

  label {
    padding: 14px 45px 14px 0;
  }

  .checkbox-container {
    padding: 0 12px;
  }

  :deep(.edit-input input) {
    padding-left: 52px;
    font-size: 16px;
  }
}

@media (max-width: 360px) {
  .todo-item {
    font-size: 15px;
  }

  label {
    padding: 12px 40px 12px 0;
  }

  .checkbox-container {
    padding: 0 10px;
  }
}
</style>
