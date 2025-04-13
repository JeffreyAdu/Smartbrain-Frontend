<template>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-2xl font-bold text-primary">
              SmartBrain
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              v-if="userStore.isAuthenticated"
              to="/dashboard"
              class="inline-flex items-center px-1 pt-1 border-b-2"
              :class="[
                isActive('dashboard')
                  ? 'border-primary text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              ]"
            >
              Dashboard
            </router-link>
            <router-link
              v-if="userStore.isAuthenticated"
              to="/face-detection"
              class="inline-flex items-center px-1 pt-1 border-b-2"
              :class="[
                isActive('faceDetection')
                  ? 'border-primary text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              ]"
            >
              Face Detection
            </router-link>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <div v-if="userStore.isAuthenticated" class="ml-3 relative">
            <div class="flex items-center space-x-4">
              <router-link
                to="/profile"
                class="text-gray-500 hover:text-primary transition-colors"
                :class="{ 'text-primary': isActive('profile') }"
              >
                <span class="sr-only">User profile</span>
                <span class="font-medium text-gray-700">{{ userStore.displayName }}</span>
              </router-link>
              <button
                @click="logout"
                class="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          <div v-else class="flex items-center space-x-4">
            <router-link
              to="/login"
              class="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="px-3 py-1.5 bg-primary border border-transparent rounded-md text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            >
              Register
            </router-link>
          </div>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="sm:hidden" :class="{ block: mobileMenuOpen, hidden: !mobileMenuOpen }">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          v-if="userStore.isAuthenticated"
          to="/dashboard"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="[
            isActive('dashboard')
              ? 'bg-gray-50 border-primary text-primary'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
          ]"
          @click="mobileMenuOpen = false"
        >
          Dashboard
        </router-link>
        <router-link
          v-if="userStore.isAuthenticated"
          to="/face-detection"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="[
            isActive('faceDetection')
              ? 'bg-gray-50 border-primary text-primary'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
          ]"
          @click="mobileMenuOpen = false"
        >
          Face Detection
        </router-link>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div v-if="userStore.isAuthenticated" class="flex items-center px-4">
          <div class="flex-shrink-0">
            <div class="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
              {{ userStore.displayName.charAt(0) }}
            </div>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ userStore.displayName }}</div>
            <div class="text-sm font-medium text-gray-500">{{ userStore.email }}</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <router-link
            v-if="userStore.isAuthenticated"
            to="/profile"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            @click="mobileMenuOpen = false"
          >
            Your Profile
          </router-link>
          <button
            v-if="userStore.isAuthenticated"
            @click="logout"
            class="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Sign out
          </button>
          <template v-if="!userStore.isAuthenticated">
            <router-link
              to="/login"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              @click="mobileMenuOpen = false"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              @click="mobileMenuOpen = false"
            >
              Register
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../stores/userStore';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();
const mobileMenuOpen = ref(false);

const isActive = (routeName) => {
  return route.name === routeName;
};

const logout = async () => {
  try {
    await userStore.logout();
    mobileMenuOpen.value = false;
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script> 