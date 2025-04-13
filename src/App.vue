<template>
  <div class="app">
    <Navbar v-if="showNavbar" />
    <main class="min-h-screen bg-gray-50">
      <LoadingScreen v-if="userStore.loading" />
      <router-view v-else />
    </main>
    <AppFooter v-if="showFooter" />
  </div>
</template>

<script setup>
import { useUserStore } from './stores/userStore';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/layout/Navbar.vue';
import AppFooter from './components/layout/Footer.vue';
import LoadingScreen from './components/ui/LoadingScreen.vue';

const userStore = useUserStore();
const route = useRoute();

// Initialize auth listener on app load
onMounted(() => {
  userStore.init();
});

// Only show navbar and footer on certain routes
const showNavbar = computed(() => {
  // Hide navbar on auth pages
  return !route.meta.hideNavbar;
});

const showFooter = computed(() => {
  // Hide footer on auth pages
  return !route.meta.hideFooter;
});
</script>

<style >
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}



.view.chat {
  flex-direction: column;
}

.view.chat header {
  position: relative;
  display: block;
  width: 100%;
  padding: 50px 30px 10px;
}

.view.chat header .logout {
  position: absolute;
  top: 15px;
  right: 15px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
  text-align: right;
}

.view.chat header h1 {
  color: #fff;
}

.view.chat .chat-box {
  border-radius: 24px 24px 0px 0px;
  background-color: #fff;
  box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
  flex: 1 1 100%;
  padding: 30px;
}

.view.chat .chat-box .message {
  display: flex;
  margin-bottom: 15px;
}

.view.chat .chat-box .message .message-inner .username {
  color: #888;
  font-size: 16px;
  margin-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
}

.view.chat .chat-box .message .message-inner .content {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f3f3f3;
  border-radius: 999px;
  color: #333;
  font-size: 18px;
  line-height: 1.2em;
  text-align: left;
}

.view.chat .chat-box .message.current-user {
  margin-top: 30px;
  justify-content: flex-end;
  text-align: right;
}

.view.chat .chat-box .message.current-user .message-inner {
  max-width: 75%;
}

.view.chat .chat-box .message.current-user .message-inner .content {
  color: #fff;
  font-weight: 600;
  background-color: #ea526f;
}

.view.chat footer {
  position: sticky;
  bottom: 0px;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
}

.view.chat footer form {
  display: flex;
}

.view.chat footer form input[type="text"] {
  flex: 1 1 100%;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px 0px 0px 8px;
  color: #333;
  font-size: 18px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  background-color: #f3f3f3;
  transition: 0.4s;
}

.view.chat footer form input[type="text"]::placeholder {
  color: #888;
  transition: 0.4s;
}

.view.chat footer form input[type="submit"] {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  padding: 10px 15px;
  border-radius: 0px 8px 8px 0px;
  background-color: #ea526f;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
</style>