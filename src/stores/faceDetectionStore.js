import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useFaceDetectionStore = defineStore('faceDetection', () => {
  const imageUrl = ref('');
  const detectionResults = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const history = ref([]);
  
  const API_URL = import.meta.env.VITE_API_URL || 'https://smartbrain-serverside.onrender.com';

  async function detectFace(url) {
    if (!url) {
      error.value = 'Please enter a valid image URL';
      return;
    }
    
    try {
      loading.value = true;
      error.value = null;
      
      imageUrl.value = url;
      
      const response = await axios.post(`${API_URL}/imageurl`, {
        input: url
      });
      
      if (response.data && response.data.outputs && 
          response.data.outputs[0].data && 
          response.data.outputs[0].data.regions) {
        detectionResults.value = response.data.outputs[0].data.regions;
        
        // Add to history
        const historyItem = {
          id: Date.now(),
          url,
          timestamp: new Date().toISOString(),
          faces: detectionResults.value.length
        };
        
        history.value.unshift(historyItem);
        
        // Keep only last 10 items in history
        if (history.value.length > 10) {
          history.value = history.value.slice(0, 10);
        }
        
        return detectionResults.value;
      } else {
        throw new Error('No faces detected in the image');
      }
    } catch (err) {
      error.value = err.message || 'Error processing the image';
      detectionResults.value = null;
      throw err;
    } finally {
      loading.value = false;
    }
  }
  
  function clearDetection() {
    imageUrl.value = '';
    detectionResults.value = null;
    error.value = null;
  }
  
  function clearHistory() {
    history.value = [];
  }
  
  return {
    imageUrl,
    detectionResults,
    loading,
    error,
    history,
    detectFace,
    clearDetection,
    clearHistory
  };
}); 