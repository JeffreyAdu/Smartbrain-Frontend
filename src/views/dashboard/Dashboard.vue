<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-7xl mx-auto">
      <!-- Dashboard header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-2 text-gray-600">Welcome back, {{ userStore.displayName }}</p>
      </div>

      <!-- Stats section -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-primary rounded-md p-3">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Images Processed</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ faceDetectionStore.history.length }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <router-link to="/face-detection" class="font-medium text-primary hover:text-primary-dark">Process more images</router-link>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-primary rounded-md p-3">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Faces Detected</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ totalFacesDetected }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <router-link to="/profile" class="font-medium text-primary hover:text-primary-dark">View your profile</router-link>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-primary rounded-md p-3">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Account Created</dt>
                  <dd class="flex items-baseline">
                    <div class="text-sm font-semibold text-gray-900">{{ accountCreationDate }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <a href="#" class="font-medium text-primary hover:text-primary-dark">View details</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent activity section -->
      <div class="bg-white shadow rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
          <p class="mt-1 text-sm text-gray-500">Your most recent face detection activities</p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div v-if="faceDetectionStore.history.length === 0" class="text-center py-4">
            <p class="text-gray-500">No recent activity found</p>
            <router-link to="/face-detection" class="mt-2 inline-block text-primary hover:text-primary-dark">
              Try detecting faces now
            </router-link>
          </div>
          <ul v-else role="list" class="divide-y divide-gray-200">
            <li v-for="(item, index) in faceDetectionStore.history.slice(0, 5)" :key="index" class="py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img class="h-12 w-12 rounded-md object-cover" :src="item.url" alt="Image thumbnail" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ formatUrl(item.url) }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ item.faces }} {{ item.faces === 1 ? 'face' : 'faces' }} detected
                  </p>
                </div>
                <div class="flex-shrink-0 text-sm text-gray-500">
                  {{ formatDate(item.timestamp) }}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="faceDetectionStore.history.length > 0" class="border-t border-gray-200 px-4 py-4 sm:px-6">
          <router-link to="/face-detection" class="text-sm font-medium text-primary hover:text-primary-dark">
            View all activity
            <span aria-hidden="true"> &rarr;</span>
          </router-link>
        </div>
      </div>

      <!-- Quick actions section -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
          <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div class="bg-gray-50 overflow-hidden rounded-lg shadow-sm">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-base font-medium text-gray-900">Detect Faces</h3>
                <div class="mt-2 text-sm text-gray-500">
                  <p>Upload an image URL to detect faces in the image.</p>
                </div>
                <div class="mt-3">
                  <router-link
                    to="/face-detection"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Go to Face Detection
                  </router-link>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 overflow-hidden rounded-lg shadow-sm">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-base font-medium text-gray-900">Update Profile</h3>
                <div class="mt-2 text-sm text-gray-500">
                  <p>Manage your account settings and preferences.</p>
                </div>
                <div class="mt-3">
                  <router-link
                    to="/profile"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Go to Profile
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '../../stores/userStore';
import { useFaceDetectionStore } from '../../stores/faceDetectionStore';

const userStore = useUserStore();
const faceDetectionStore = useFaceDetectionStore();

// Compute total faces detected
const totalFacesDetected = computed(() => {
  return faceDetectionStore.history.reduce((total, item) => total + item.faces, 0);
});

// Get account creation date
const accountCreationDate = computed(() => {
  return userStore.user?.metadata?.creationTime 
    ? formatDate(userStore.user.metadata.creationTime) 
    : 'N/A';
});

// Format URL for display
const formatUrl = (url) => {
  if (!url) return '';
  // Truncate URL if too long
  return url.length > 40 ? url.substring(0, 40) + '...' : url;
};

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
};
</script> 