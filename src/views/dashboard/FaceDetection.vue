<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container-fluid px-6 py-10 w-full">
      <div class="grid gap-8">
        <!-- Page header -->
        <div class="bg-white shadow-sm rounded-lg p-6">
          <h1 class="text-3xl font-bold text-gray-900">Face Detection</h1>
          <p class="mt-2 text-gray-600">Enter the URL of an image to detect faces</p>
        </div>

        <!-- Input form -->
        <div class="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div class="px-6 py-5">
            <form @submit.prevent="detectFaces">
              <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex-grow">
                  <label for="imageUrl" class="sr-only">Image URL</label>
                  <input
                    id="imageUrl"
                    v-model="imageUrl"
                    type="url"
                    required
                    class="form-input"
                    placeholder="https://example.com/image.jpg"
                    :disabled="isLoading"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    class="btn btn-primary w-full"
                    :class="{ 'opacity-70 cursor-not-allowed': isLoading }"
                    :disabled="isLoading"
                  >
                    <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ isLoading ? 'Detecting...' : 'Detect Faces' }}
                  </button>
                </div>
              </div>
              <div v-if="error" class="mt-3 text-sm text-red-600">
                {{ error }}
              </div>
            </form>
          </div>
        </div>

        <!-- Results section -->
        <div class="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Results</h2>
            
            <div v-if="!imageUrl && !detectionResults" class="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No image processed</h3>
              <p class="mt-1 text-sm text-gray-500">Enter an image URL above to detect faces in the image.</p>
            </div>

            <div v-else-if="isLoading" class="text-center py-12">
              <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-r-2 border-b-2 border-gray-300 mb-4"></div>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Processing image</h3>
              <p class="mt-1 text-sm text-gray-500">Please wait while we analyze the image...</p>
            </div>

            <div v-else-if="detectionResults && detectionResults.length > 0" class="relative">
              <!-- Full-width container for the image with face detection -->
              <div class="w-full mx-auto relative flex justify-center detection-container">
                <img
                  :src="imageUrl"
                  alt="Processed image"
                  ref="imageElement"
                  class="max-h-[80vh] object-contain rounded-lg shadow-md"
                  @load="onImageLoad"
                />
                <!-- Enhanced face detection box with animation and labels -->
                <div
                  v-for="(region, index) in detectionResults"
                  :key="index"
                  class="absolute face-box"
                  :style="getBoundingBoxStyle(region.region_info.bounding_box)"
                >
                  <div class="face-highlight"></div>
                  <div class="face-label">Face {{ index + 1 }}</div>
                </div>
              </div>
              <div class="mt-6 text-center text-gray-600 bg-gray-50 py-3 px-4 rounded-lg">
                <p class="text-lg font-medium">
                  <span class="text-primary font-bold">{{ detectionResults.length }}</span> {{ detectionResults.length === 1 ? 'face' : 'faces' }} detected
                </p>
                <p class="text-sm mt-1">Click on the detected faces to view details</p>
              </div>
            </div>

            <div v-else-if="imageUrl && !error" class="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No faces detected</h3>
              <p class="mt-1 text-sm text-gray-500">
                We couldn't detect any faces in this image. Try another image with clearer faces.
              </p>
            </div>
          </div>
        </div>

        <!-- History section -->
        <div v-if="faceDetectionStore.history.length > 0" class="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div class="px-4 py-5 sm:px-6">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-medium text-gray-900">History</h2>
              <button
                @click="clearHistory"
                class="text-sm text-gray-600 hover:text-primary"
              >
                Clear history
              </button>
            </div>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
            <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <li
                v-for="(item, index) in faceDetectionStore.history"
                :key="index"
                class="col-span-1 bg-gray-50 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
                @click="loadHistoryItem(item)"
              >
                <div class="h-32 bg-gray-200 overflow-hidden relative">
                  <img :src="item.url" alt="History image" class="w-full h-full object-cover" />
                  <div class="absolute bottom-0 right-0 bg-primary text-white px-2 py-1 text-xs font-medium rounded-tl-md">
                    {{ item.faces }} {{ item.faces === 1 ? 'face' : 'faces' }}
                  </div>
                </div>
                <div class="px-3 py-2">
                  <div class="flex justify-between items-center">
                    <div class="text-xs text-gray-500">
                      {{ formatDate(item.timestamp) }}
                    </div>
                    <div class="text-xs text-primary hover:text-primary-dark">
                      View
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useFaceDetectionStore } from '../../stores/faceDetectionStore';
import { useToast } from 'vue-toast-notification';

const faceDetectionStore = useFaceDetectionStore();
const $toast = useToast();

const imageUrl = ref('');
const isLoading = ref(false);
const imageElement = ref(null);
const error = computed(() => faceDetectionStore.error);
const detectionResults = computed(() => faceDetectionStore.detectionResults);

// Load from store on component mount
onMounted(() => {
  if (faceDetectionStore.imageUrl) {
    imageUrl.value = faceDetectionStore.imageUrl;
    if (faceDetectionStore.detectionResults && faceDetectionStore.detectionResults.length > 0) {
      // If there's already detection results, no need to re-detect
      return;
    }
    detectFaces();
  }
  
  // Add resize event listener to update bounding boxes when window is resized
  window.addEventListener('resize', handleResize);
});

// Remove event listener on component unmount
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// Force update of bounding boxes on resize
const handleResize = () => {
  // Force Vue to reactively update by creating a new timestamp
  // This will trigger a re-render of the bounding boxes
  forceUpdate.value = Date.now();
};

const forceUpdate = ref(Date.now());

const detectFaces = async () => {
  if (!imageUrl.value) return;
  
  try {
    isLoading.value = true;
    await faceDetectionStore.detectFace(imageUrl.value);
    if (detectionResults.value && detectionResults.value.length > 0) {
      $toast.success(`Detected ${detectionResults.value.length} ${detectionResults.value.length === 1 ? 'face' : 'faces'}!`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const onImageLoad = () => {
  // Reset any existing error after successful image load
  if (faceDetectionStore.error) {
    faceDetectionStore.error = null;
  }
  
  // Force update of bounding boxes when image loads
  setTimeout(() => {
    forceUpdate.value = Date.now();
  }, 100); // Small delay to ensure image is fully rendered
};

const getBoundingBoxStyle = (boundingBox) => {
  // Use forceUpdate to trigger reactivity on resize
  forceUpdate.value;
  
  if (!imageElement.value) return {};
  
  // Get the rendered dimensions instead of intrinsic dimensions
  const width = imageElement.value.clientWidth;
  const height = imageElement.value.clientHeight;
  
  // Calculate the position relative to the parent container
  const imgRect = imageElement.value.getBoundingClientRect();
  const containerRect = imageElement.value.parentElement.getBoundingClientRect();
  
  const offsetLeft = imgRect.left - containerRect.left;
  const offsetTop = imgRect.top - containerRect.top;
  
  return {
    left: (boundingBox.left_col * width + offsetLeft) + 'px',
    top: (boundingBox.top_row * height + offsetTop) + 'px',
    width: (boundingBox.right_col - boundingBox.left_col) * width + 'px',
    height: (boundingBox.bottom_row - boundingBox.top_row) * height + 'px'
  };
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date);
};

const loadHistoryItem = (item) => {
  imageUrl.value = item.url;
  detectFaces();
};

const clearHistory = () => {
  if (confirm('Are you sure you want to clear your history?')) {
    faceDetectionStore.clearHistory();
    $toast.info('History has been cleared');
  }
};
</script>

<style scoped>
.detection-container {
  min-height: 300px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.face-box {
  border: 3px solid #ea526f;
  border-radius: 4px;
  box-shadow: 0 0 0 2px rgba(255,255,255,0.5);
  pointer-events: all;
  cursor: pointer;
  transition: transform 0.2s ease;
  overflow: visible;
  animation: pulse 2s infinite;
}

.face-box:hover {
  transform: scale(1.02);
  animation: none;
  border-color: #c02e4b;
}

.face-highlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(234, 82, 111, 0.2);
}

.face-label {
  position: absolute;
  top: -25px;
  left: 0;
  background-color: #ea526f;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.face-box:hover .face-label {
  opacity: 1;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(234, 82, 111, 0.7);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(234, 82, 111, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(234, 82, 111, 0);
  }
}
</style> 