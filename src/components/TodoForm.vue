<template>
  <div class="todo-form">
    <Input
      v-model="todoText"
      placeholder="What needs to be done?"
      :borderRadius="false"
      @enter="addTodo"
    >
      <Button
        variant="primary"
        icon
        rounded
        @click="addTodo"
        class="add-button"
      >
        +
      </Button>
    </Input>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";

const emit = defineEmits(["add"]);
const todoText = ref("");

function addTodo() {
  if (todoText.value.trim()) {
    emit("add", todoText.value);
    todoText.value = "";
  }
}
</script>

<style scoped>
.todo-form {
  width: 100%;
  position: relative;
}

.add-button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  font-size: 20px;
  z-index: 5;
  box-shadow: 0 2px 8px rgba(108, 92, 231, 0.3);
}

:deep(input) {
  border-radius: 20px 20px 0 0;
}

@media (max-width: 550px) {
  .add-button {
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
}
</style>
