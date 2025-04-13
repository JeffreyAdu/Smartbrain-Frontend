<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <!-- Page header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Profile</h1>
        <p class="mt-2 text-gray-600">Manage your account information and settings</p>
      </div>

      <!-- Profile card -->
      <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div class="px-4 py-5 sm:px-6 bg-gray-50">
          <h2 class="text-lg font-medium text-gray-900">Account Information</h2>
          <p class="mt-1 text-sm text-gray-500">Personal details for your account</p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div class="flex items-center space-x-5">
            <div class="flex-shrink-0">
              <div class="relative">
                <div class="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-semibold">
                  {{ userInitials }}
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-medium text-gray-900">{{ userStore.displayName }}</h3>
              <p class="text-sm text-gray-500">{{ userStore.email }}</p>
              <p class="text-xs text-gray-500 mt-1">
                Account created: {{ accountCreated }}
              </p>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Update Display Name</h3>
              <form @submit.prevent="updateUserProfile" class="mt-3">
                <div class="flex-1">
                  <input
                    v-model="displayName"
                    type="text"
                    class="form-input"
                    placeholder="Enter new display name"
                    :disabled="isUpdating"
                  />
                </div>
                <div class="mt-4">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :class="{ 'opacity-70 cursor-not-allowed': isUpdating }"
                    :disabled="isUpdating || !displayName.trim() || displayName === userStore.displayName"
                  >
                    <svg v-if="isUpdating" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ isUpdating ? 'Updating...' : 'Update Profile' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Security section -->
      <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div class="px-4 py-5 sm:px-6 bg-gray-50">
          <h2 class="text-lg font-medium text-gray-900">Security</h2>
          <p class="mt-1 text-sm text-gray-500">Manage your account security</p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Password</h3>
              <p class="mt-1 text-sm text-gray-500">Update your password or reset it if you've forgotten it.</p>
              <div class="mt-4">
                <button
                  @click="resetPassword"
                  type="button"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  :disabled="isPasswordResetting"
                >
                  <svg v-if="isPasswordResetting" class="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isPasswordResetting ? 'Sending...' : 'Reset Password' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Danger Zone -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:px-6 bg-red-50">
          <h2 class="text-lg font-medium text-red-800">Danger Zone</h2>
          <p class="mt-1 text-sm text-red-700">Irreversible actions for your account</p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Delete Account</h3>
            <p class="text-sm text-gray-500">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <div class="mt-4">
              <button
                @click="confirmDeleteAccount"
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../../stores/userStore';
import { useToast } from 'vue-toast-notification';
import { updateProfile, getAuth, sendPasswordResetEmail } from 'firebase/auth';

const userStore = useUserStore();
const $toast = useToast();

const displayName = ref('');
const isUpdating = ref(false);
const isPasswordResetting = ref(false);

const userInitials = computed(() => {
  if (!userStore.displayName) return '?';
  return userStore.displayName.charAt(0).toUpperCase();
});

const accountCreated = computed(() => {
  if (!userStore.user?.metadata?.creationTime) return 'Unknown';
  
  const date = new Date(userStore.user.metadata.creationTime);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
});

onMounted(() => {
  displayName.value = userStore.displayName;
});

const updateUserProfile = async () => {
  if (!displayName.value.trim() || displayName.value === userStore.displayName) return;
  
  try {
    isUpdating.value = true;
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      await updateProfile(user, {
        displayName: displayName.value.trim()
      });
      
      // Update local store
      userStore.user = auth.currentUser;
      $toast.success('Profile updated successfully!');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    $toast.error('Failed to update profile. Please try again.');
  } finally {
    isUpdating.value = false;
  }
};

const resetPassword = async () => {
  try {
    isPasswordResetting.value = true;
    const auth = getAuth();
    await sendPasswordResetEmail(auth, userStore.email);
    $toast.success('Password reset email sent. Please check your inbox.');
  } catch (error) {
    console.error('Error sending password reset:', error);
    $toast.error('Failed to send password reset email. Please try again.');
  } finally {
    isPasswordResetting.value = false;
  }
};

const confirmDeleteAccount = () => {
  // Show confirmation dialog
  if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    // Implementation would use Firebase Auth methods to delete the user account
    $toast.info('Account deletion is not implemented in this demo.');
  }
};
</script> 