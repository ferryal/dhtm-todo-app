<template>
  <div
    class="dark-mode-toggle"
    @click="toggleDarkMode"
    :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <div class="toggle-switch" :class="{ dark: isDarkMode }">
      <div class="toggle-icon">
        <svg
          v-if="isDarkMode"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const isDarkMode = ref(true); // Default to dark mode

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  updateTheme();
}

function updateTheme() {
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark-mode");
    document.documentElement.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.add("light-mode");
    document.documentElement.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
}

onMounted(() => {
  // Check if user has previously set theme preference
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    isDarkMode.value = savedTheme === "dark";
  } else {
    // Check system preference if no saved preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      isDarkMode.value = false;
    }
  }

  updateTheme();
});
</script>

<style scoped>
.dark-mode-toggle {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.toggle-switch {
  position: relative;
  width: 44px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 3px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.toggle-switch.dark {
  background-color: var(--primary-color);
  justify-content: flex-start;
}

.toggle-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: var(--primary-dark);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.dark .toggle-icon {
  color: var(--primary-color);
}
</style>
