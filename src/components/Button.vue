<template>
  <button
    :class="[`btn-${variant}`, { 'btn-icon': icon, 'btn-rounded': rounded }]"
    :type="type"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "danger", "ghost"].includes(value),
  },
  type: {
    type: String,
    default: "button",
  },
  icon: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);
</script>

<style scoped>
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.6em 1.2em;
  border-radius: 8px;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-secondary {
  background: rgba(108, 92, 231, 0.1);
  color: var(--primary-color);
}

.btn-danger {
  background: rgba(255, 107, 107, 0.1);
  color: var(--accent-color);
}

.btn-ghost {
  background: transparent;
  color: var(--text-color);
}

.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  font-size: 1.3rem;
}

.btn-rounded {
  border-radius: 100px;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

.btn-primary:hover {
  box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3);
}

.btn-danger:hover {
  background: rgba(255, 107, 107, 0.2);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>
