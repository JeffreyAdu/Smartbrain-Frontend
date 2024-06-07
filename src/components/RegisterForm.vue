<template>
  <div class="view login">
    <form class="login-form" @submit.prevent="registerUser">
      <div class="form-inner">
        <h1>Signup with Smart Brains</h1>
        <p v-if="passwordIsWrong" class="wrong-password">
          {{ state.wrongPassword }}
        </p>
        <label for="username">Username</label>
        <input
          type="text"
          v-model="state.username"
          placeholder="Please enter your username"
        />
        <label for="email">Email</label>
        <input
          type="email"
          v-model="state.email"
          placeholder="Enter your email"
        />
        <label for="password">Password</label>
        <input
          type="password"
          v-model="state.password"
          placeholder="Enter your password"
        />
        <label for="password">Confirm Password</label>
        <input
          type="password"
          v-model="state.confirmPassword"
          placeholder="Confrim your password"
        />
        <div class="info">
          <p>
            Already have an account?
            <span><router-link to="/login">Login</router-link> </span>
          </p>
        </div>
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import ChatView from "./ChatView.vue";
export default {
  components: { ChatView },
  setup() {
    const state = reactive({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      wrongPassword: "Password doesn't match",
    });
    const passwordIsWrong = ref(false);
    const router = useRouter();
    const registerUser = () => {
      const username = state.username
      const email = state.email;
      const password = state.password;
      if (state.password == state.confirmPassword) {
        passwordIsWrong.value = false;
        createUserWithEmailAndPassword(getAuth(), email, password)
          .then((data) => {
            console.log("Successfully Registered");
            router.push({ name: "chat", params: { username } });
          })
          .catch((error) => {
            console.log(error.code);
            alert(error.message);
          });
      } else {
        passwordIsWrong.value = true;
      }
    };

    return {
      state,
      registerUser,
      passwordIsWrong,
    };
  },
};
</script>

<style scoped>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #ea526f;
}

.view.login {
  align-items: center;
}

.view.login .login-form {
  display: block;
  width: 40%;
  padding: 15px;
}

.view.login .login-form .form-inner {
  display: block;
  background-color: #fff;
  padding: 50px 15px;
  border-radius: 16px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}

.view.login .login-form .form-inner h1 {
  color: #aaa;
  font-size: 28px;
  margin-bottom: 30px;
}

.view.login .login-form .form-inner label {
  display: block;
  margin-bottom: 5px;
  color: #aaa;
  font-size: 16px;
  transition: 0.4s;
}

.view.login .login-form .form-inner input[type="text"],
input[type="email"],
input[type="password"] {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  color: #333;
  font-size: 18px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  background-color: #f3f3f3;
  transition: 0.4s;
}

.view.login .login-form .form-inner input[type="text"],
input[type="email"],
input[type="password"]::placeholder {
  color: #888;
  transition: 0.4s;
}

.view.login .login-form .form-inner input[type="submit"] {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: #ea526f;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}

.view.login .login-form .form-inner:focus-within label {
  color: #ea526f;
}

.view.login .login-form .form-inner:focus-within input[type="text"],
input[type="email"],
input[type="password"] {
  background-color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}

.view.login .login-form .form-inner:focus-within input[type="text"],
input[type="email"],
input[type="password"] ::placeholder {
  color: #666;
}
.info {
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  margin: 15px;
  color: #666;
}
.info a {
  text-decoration: none;
  color: #666;
}
.info a:hover{
  color: #ea526f;
}
.wrong-password {
  text-align: center;
  width: 70%;
  height: 40px;
  border: 1px solid #ea526f;
  background-color: #ea526f;
  border-radius: 10px;
  color: #fff;
  font-weight: 500;
  font-size: 23px;
  letter-spacing: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
</style>