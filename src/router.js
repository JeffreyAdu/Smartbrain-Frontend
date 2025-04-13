import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";

// Lazy-load components for better performance
const Home = () => import('./views/Home.vue');
const Login = () => import('./views/auth/Login.vue');
const Register = () => import('./views/auth/Register.vue');
const ForgotPassword = () => import('./views/auth/ForgotPassword.vue');
const Dashboard = () => import('./views/dashboard/Dashboard.vue');
const FaceDetection = () => import('./views/dashboard/FaceDetection.vue');
const Profile = () => import('./views/dashboard/Profile.vue');
const NotFound = () => import('./views/NotFound.vue');

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: "Home" }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { title: "Login", requiresGuest: true }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { title: "Register", requiresGuest: true }
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
    meta: { title: "Forgot Password", requiresGuest: true }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { title: "Dashboard", requiresAuth: true }
  },
  {
    path: "/face-detection",
    name: "faceDetection",
    component: FaceDetection,
    meta: { title: "Face Detection", requiresAuth: true }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { title: "Profile", requiresAuth: true }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFound,
    meta: { title: "Page Not Found" }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

// Navigation guards
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'Home'} | SmartBrain`;
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (requiresGuest && currentUser) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
