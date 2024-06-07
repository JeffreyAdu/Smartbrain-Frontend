<template>
  <div class="view chat">
    <header>
      <button class="logout" @click="handleLogout">Logout</button>
      <p class="welcome-message">Welcome, {{ username }}</p>
    </header>
    <section class="chat-box">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message current-user"
      >
        <div class="message-inner">
          <div class="username">{{ username }}</div>
          <div class="content">{{ message }}</div>
        </div>
      </div>
      <div
        v-for="(replyMessage, index) in replyMessages"
        :key="index"
        class="message reply-message"
      >
        <div style="position: relative">
          <img
            :src="replyMessage.imageLink"
            class="content"
            :id="'inputImage' + index"
            @load="() => calculateBox(index)"
            :style="{ width: '500px' }"
          />
          <div
            v-if="replyMessage.box"
            class="bounding-box"
            :style="{
              left: replyMessage.box.left + 'px',
              top: replyMessage.box.top + 'px',
              width: replyMessage.box.width + 'px',
              height: replyMessage.box.height + 'px',
            }"
          ></div>
        </div>
        <div class="message-inner">
          <!-- <p class="content">{{ replyMessage.content }}</p> -->
        </div>
      </div>
    </section>
    <footer>
      <form @submit.prevent="sendMessage">
        <input
          type="url"
          v-model="inputMessage"
          placeholder="Please enter your picture link"
        />
        <input type="submit" value="Send" />
      </form>
    </footer>
  </div>
</template>
<script>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import router from "../router";

export default {
  props: ["username"],
  setup() {
    const inputMessage = ref("");
    const messages = ref([]);
    const replyMessages = ref([]);
    const sendMessage = () => {
      playChatSound();
      if (inputMessage.value) {
        messages.value.push(inputMessage.value);

        replyMessages.value.push({
          imageLink: inputMessage.value,
          content: "",
          box: null,
        });
        inputMessage.value = "";
      }
    };
    const playChatSound = () => {
      const audio = new Audio();
      audio.src = "/src/audio/chat-sound.mp3";
      audio.play();
    };
    const calculateBox = (index) => {
      const imageElement = document.getElementById("inputImage" + index);
      if (!imageElement) {
        console.error("Image element not found");
        return;
      }

      const width = imageElement.clientWidth;
      const height = imageElement.clientHeight;

      fetch("https://smartbrain-serverside.onrender.com/imageurl", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: replyMessages.value[index].imageLink }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.outputs[0].data.regions[0].region_info) {
            const boundingBox =
              result.outputs[0].data.regions[0].region_info.bounding_box;
            const box = {
              left: boundingBox.left_col * width,
              top: boundingBox.top_row * height,
              width: (boundingBox.right_col - boundingBox.left_col) * width,
              height: (boundingBox.bottom_row - boundingBox.top_row) * height,
            };
            replyMessages.value[index].box = box;
          } else {
            console.error("Unexpected result structure", result);
          }
        })
        .catch((error) =>
          console.error("Error fetching bounding box data:", error)
        );
    };

    const handleLogout = () => {
      const auth = getAuth();
      signOut(auth).then(() => {
        router.push("/login");
      });
    };

    return {
      inputMessage,
      messages,
      sendMessage,
      replyMessages,
      calculateBox,
      handleLogout,
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
.view.chat {
  flex-direction: column;
}

.view.chat header {
  position: relative;
  display: block;
  width: 100%;
  padding: 50px 30px 10px;
}
.view.chat header .logout:hover {
  color: rgba(100, 100, 100, 0.2);
}
.view.chat header .logout {
  position: absolute;
  top: 15px;
  right: 15px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
  text-align: right;
  cursor: pointer;
}

.view.chat header h1 {
  color: #fff;
}

.view.chat .chat-box {
  border-radius: 24px 24px 0px 0px;
  background-color: #fff;
  box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
  flex: 1 1 100%;
  padding: 30px;
}

.view.chat .chat-box .message {
  display: flex;
  margin-bottom: 15px;
}

.view.chat .chat-box .message .message-inner .username {
  color: #888;
  font-size: 16px;
  margin-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
}
.reply-message {
  display: flex;
  flex-direction: column;
}

.view.chat .chat-box .message .message-inner .content {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  background-color: #f3f3f3;
  border-radius: 999px;
  color: #333;
  font-size: 18px;
  line-height: 1.2em;
  text-align: left;
}

.view.chat .chat-box .message.current-user {
  margin-top: 30px;
  justify-content: flex-end;
  text-align: right;
}

.view.chat .chat-box .message.current-user .message-inner {
  max-width: 75%;
}

.view.chat .chat-box .message.current-user .message-inner .content {
  color: #fff;
  font-weight: 600;
  background-color: #ea526f;
}

.view.chat footer {
  position: sticky;
  bottom: 0px;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
}

.view.chat footer form {
  display: flex;
}

.view.chat footer form input[type="url"] {
  flex: 1 1 100%;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px 0px 0px 8px;
  color: #333;
  font-size: 18px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  background-color: #f3f3f3;
  transition: 0.4s;
}

.view.chat footer form input[type="url"]::placeholder {
  color: #888;
  transition: 0.4s;
}

.view.chat footer form input[type="submit"] {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  padding: 10px 15px;
  border-radius: 0px 8px 8px 0px;
  background-color: #ea526f;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
.image-content {
  width: 500px;
}
.bounding-box {
  position: absolute;
  border: 2px solid blue;
  box-shadow: 0 0 0 3px blue inset;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
}

.welcome-message {
  color: #f3f3f3;
  font-size: 25px;
}
</style>
