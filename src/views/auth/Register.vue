<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Create an Account</h1>
        <p class="text-sm text-gray-500 mb-8">
          Join SmartBrain to access all features
        </p>
      </div>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div v-if="errorMsg" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
          {{ errorMsg }}
        </div>

        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <div class="mt-1">
            <input
              id="username"
              v-model="username"
              name="username"
              type="text"
              required
              class="form-input"
              placeholder="johndoe"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
          <div class="mt-1">
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="form-input"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1">
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="form-input"
              placeholder="••••••••"
            />
          </div>
          <p class="mt-1 text-xs text-gray-500">
            Password must be at least 6 characters long
          </p>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <div class="mt-1">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="form-input"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="btn btn-primary w-full flex justify-center"
            :class="{ 'opacity-70 cursor-not-allowed': isLoading }"
            :disabled="isLoading"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Creating account...' : 'Create account' }}
          </button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Already have an account?</span>
          </div>
        </div>

        <div class="mt-6">
          <router-link
            to="/login"
            class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign in instead
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/userStore';
import { useToast } from 'vue-toast-notification';

const router = useRouter();
const userStore = useUserStore();
const $toast = useToast();

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const errorMsg = ref('');

const validateForm = () => {
  if (password.value.length < 6) {
    errorMsg.value = 'Password must be at least 6 characters long';
    return false;
  }
  
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match';
    return false;
  }
  
  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  try {
    errorMsg.value = '';
    isLoading.value = true;
    
    await userStore.register(email.value, password.value, username.value);
    
    $toast.success('Account created successfully!');
    
    // Redirect to dashboard
    router.push('/dashboard');
  } catch (error) {
    errorMsg.value = userStore.error || 'Failed to register. Please try again.';
    console.error('Register error:', error);
  } finally {
    isLoading.value = false;
  }
};
</script> 