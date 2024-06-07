import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBFA6fqAK90BNfha8tgPXo4Qla70hFN0es",
  authDomain: "smartbrains-6b54b.firebaseapp.com",
  databaseURL: "https://smartbrains-6b54b-default-rtdb.firebaseio.com",
  projectId: "smartbrains-6b54b",
  storageBucket: "smartbrains-6b54b.appspot.com",
  messagingSenderId: "532046064190",
  appId: "1:532046064190:web:992c585455a9e61939bf6f",
};

initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.mount("#app");
