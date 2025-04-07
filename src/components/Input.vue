<template>
  <div class="input-wrapper" :class="{ 'with-icon': hasSlot }">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :class="{ 'has-border-radius': borderRadius }"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup.enter="$emit('enter')"
    />
    <slot></slot>
  </div>
</template>

<script setup>
import { useSlots } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  borderRadius: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "enter"]);
const slots = useSlots();
const hasSlot = !!slots.default;
</script>

<style scoped>
.input-wrapper {
  position: relative;
  width: 100%;
}

input {
  width: 100%;
  padding: 16px 20px;
  font-size: 18px;
  border: none;
  background: var(--input-bg);
  color: var(--text-color);
  transition: all 0.3s ease;
  box-sizing: border-box;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

input:focus {
  outline: none;
  background: rgba(28, 30, 60, 0.95);
}

/* Dark mode placeholders */
:root:not(.light-mode) input::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
}

:root:not(.light-mode) input::-moz-placeholder {
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
}

/* Light mode placeholders */
:root.light-mode input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.4);
  font-weight: 300;
}

:root.light-mode input::-moz-placeholder {
  color: rgba(0, 0, 0, 0.4);
  font-weight: 300;
}

/* Light mode focus state */
:root.light-mode input:focus {
  background: rgba(240, 240, 240, 0.95);
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
}

.has-border-radius {
  border-radius: 12px;
}

.with-icon input {
  padding-right: 50px;
}

@media (max-width: 550px) {
  input {
    font-size: 16px;
    padding: 14px 16px;
  }
}
</style>
