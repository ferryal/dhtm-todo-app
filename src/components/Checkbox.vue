<template>
  <div class="checkbox-wrapper">
    <input
      type="checkbox"
      class="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkmark"></span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
.checkbox-wrapper {
  position: relative;
  display: inline-block;
  width: 26px;
  height: 26px;
}

.checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 26px;
  height: 26px;
  z-index: 1;
  margin: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  transition: all 0.2s ease;
}

/* Light mode checkmark border */
:root.light-mode .checkmark {
  border: 2px solid rgba(0, 0, 0, 0.2);
}

.checkbox:checked ~ .checkmark {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  box-shadow: 0 3px 8px rgba(108, 92, 231, 0.4);
}

.checkbox:checked ~ .checkmark::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  animation: fadeIn 0.2s ease;
}

.checkbox:hover ~ .checkmark {
  border-color: rgba(255, 255, 255, 0.4);
}

/* Light mode hover state */
:root.light-mode .checkbox:hover ~ .checkmark {
  border-color: rgba(0, 0, 0, 0.4);
}

.checkbox:checked:hover ~ .checkmark {
  opacity: 0.9;
}

@media (max-width: 550px) {
  .checkbox-wrapper,
  .checkbox,
  .checkmark {
    width: 22px;
    height: 22px;
  }

  .checkbox:checked ~ .checkmark::after {
    width: 12px;
    height: 12px;
  }
}
</style>
