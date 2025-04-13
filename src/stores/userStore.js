import { defineStore } from 'pinia';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { ref, computed } from 'vue';
import router from '../router';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const isAuthenticated = computed(() => !!user.value);
  const displayName = computed(() => user.value?.displayName || 'User');
  const email = computed(() => user.value?.email || '');
  const userId = computed(() => user.value?.uid || '');

  // Initialize auth listener
  function init() {
    const auth = getAuth();
    onAuthStateChanged(auth, (userData) => {
      user.value = userData;
      loading.value = false;
    });
  }

  async function login(email, password) {
    try {
      error.value = null;
      loading.value = true;
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      return userCredential;
    } catch (err) {
      error.value = getErrorMessage(err.code);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function register(email, password, username) {
    try {
      error.value = null;
      loading.value = true;
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with username
      await updateProfile(userCredential.user, {
        displayName: username
      });
      
      user.value = userCredential.user;
      return userCredential;
    } catch (err) {
      error.value = getErrorMessage(err.code);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function resetPassword(email) {
    try {
      error.value = null;
      loading.value = true;
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      error.value = getErrorMessage(err.code);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      error.value = null;
      loading.value = true;
      const auth = getAuth();
      await signOut(auth);
      user.value = null;
      router.push({ name: 'login' });
    } catch (err) {
      error.value = getErrorMessage(err.code);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function getErrorMessage(code) {
    switch (code) {
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/invalid-email':
        return 'Invalid email';
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/weak-password':
        return 'Password is too weak';
      case 'auth/network-request-failed':
        return 'Network error. Please try again.';
      default:
        return 'An error occurred. Please try again.';
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    displayName,
    email,
    userId,
    init,
    login,
    register,
    logout,
    resetPassword
  };
}); 