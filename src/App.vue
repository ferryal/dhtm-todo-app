<script setup>
import Todo from "@/components/Todo.vue";
import DarkModeToggle from "@/components/Toggle.vue";
</script>

<template>
  <div class="app-container">
    <div class="theme-toggle-container">
      <DarkModeToggle />
    </div>

    <div class="container">
      <Todo />
    </div>

    <footer class="app-footer glass">
      <div class="footer-content">
        <p>Double-click to edit a todo</p>
        <p>Created with Vue 3, Vite, and Pinia</p>
      </div>
    </footer>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

body {
  font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: var(--bg-color);
  color: var(--text-color);
  min-width: 280px;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
  min-height: 100vh;
  background-image: linear-gradient(
    140deg,
    var(--bg-color) 0%,
    var(--bg-dark) 100%
  );
  background-attachment: fixed;
  overflow-y: auto;
  padding-bottom: 80px; /* Increased space for footer */
  position: relative;
  box-sizing: border-box;
}

button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  transition: all 0.2s ease;
}

:focus {
  outline: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 60px 0 0 0;
  overflow-x: hidden;
  width: 100%;
  min-height: calc(100vh - 70px);
  position: relative;
}

.theme-toggle-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px 0;
  text-align: center;
  background-color: var(--footer-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transition: all 0.3s ease;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  color: var(--text-muted);
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.footer-content p {
  line-height: 1.4;
  margin: 4px 0;
}

.footer-content a {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}

.footer-content a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .app-container {
    padding-top: 50px;
  }

  .container {
    max-width: 650px;
    padding: 0 15px;
  }

  .theme-toggle-container {
    top: 15px;
    right: 15px;
  }
}

@media (max-width: 550px) {
  .app-container {
    padding-top: 40px;
  }

  .container {
    padding: 0 10px;
  }

  .theme-toggle-container {
    top: 10px;
    right: 10px;
  }

  body {
    padding-bottom: 70px;
  }

  .app-footer {
    padding: 10px 0;
  }

  .footer-content {
    padding: 0 15px;
    font-size: 11px;
  }
}

/* Light mode footer border */
:root.light-mode .app-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
