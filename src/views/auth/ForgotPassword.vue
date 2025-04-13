<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Reset Password</h1>
        <p class="text-sm text-gray-500 mb-8">
          {{ emailSent ? 'Check your email for a password reset link.' : 'Enter your email address to receive a password reset link.' }}
        </p>
      </div>

      <form v-if="!emailSent" class="space-y-6" @submit.prevent="handleSubmit">
        <div v-if="errorMsg" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
          {{ errorMsg }}
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
            {{ isLoading ? 'Sending...' : 'Send reset link' }}
          </button>
        </div>
      </form>

      <div v-if="emailSent" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
        Password reset email sent. Please check your inbox.
      </div>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Remember your password?</span>
          </div>
        </div>

        <div class="mt-6">
          <router-link
            to="/login"
            class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Back to login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../stores/userStore';
import { useToast } from 'vue-toast-notification';

const userStore = useUserStore();
const $toast = useToast();

const email = ref('');
const isLoading = ref(false);
const errorMsg = ref('');
const emailSent = ref(false);

const handleSubmit = async () => {
  try {
    errorMsg.value = '';
    isLoading.value = true;
    
    await userStore.resetPassword(email.value);
    
    $toast.success('Password reset email sent!');
    emailSent.value = true;
  } catch (error) {
    errorMsg.value = userStore.error || 'Failed to send password reset email. Please try again.';
    console.error('Password reset error:', error);
  } finally {
    isLoading.value = false;
  }
};
</script> 