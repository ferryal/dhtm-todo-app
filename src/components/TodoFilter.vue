<template>
  <ul class="filters">
    <li v-for="option in options" :key="option.value">
      <Button
        variant="ghost"
        :class="{ selected: modelValue === option.value }"
        rounded
        @click="$emit('update:modelValue', option.value)"
      >
        {{ option.label }}
      </Button>
    </li>
  </ul>
</template>

<script setup>
import Button from "@/components/Button.vue";

defineProps({
  modelValue: {
    type: String,
    default: "all",
  },
  options: {
    type: Array,
    default: () => [
      { value: "all", label: "All" },
      { value: "active", label: "Active" },
      { value: "completed", label: "Completed" },
    ],
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.filters li {
  margin: 0 2px;
}

.selected {
  background: var(--filter-selected-bg) !important;
  color: var(--primary-color) !important;
  font-weight: 500;
}

@media (max-width: 550px) {
  .filters {
    width: 100%;
    margin: 8px 0;
  }
}
</style>
