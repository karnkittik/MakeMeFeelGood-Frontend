<template>
  <a-layout class="my-element">
    <NavigationBar class="nav-bar" :changeDate="changeDate" />
    <div style="height: 80px"></div>
    <a-layout-content class="my-pane">
      <a-spin v-if="loading" class="my-loading" />
      <MessagePane
        v-if="!loading && messages.length != 0"
        :messages="messages"
        :total-messages="totalMessages"
        :update-number-message="updateNumberMessage"
      />
      <a-empty v-if="!loading && messages.length == 0" class="my-loading" />
    </a-layout-content>
    <CreateModal :add-new-message="addNewMessage" />
    <a-layout-footer style="text-align: center">
      MakeMeFeelGood ©2022
    </a-layout-footer>
  </a-layout>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import MessagePane from "./components/MessagePane.vue";
import MessageCard from "./components/MessageCard.vue";
import CreateModal from "./components/CreateModal.vue";
import config from "./config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export default {
  components: { NavigationBar, MessagePane, MessageCard, CreateModal },
  data() {
    return {
      messages: [],
      loading: true,
      date: dayjs(),
      totalMessages: 0,
    };
  },
  methods: {
    getMessages(tm = 1652109817000) {
      this.loading = true;
      this.axios
        .get(config.API + "/" + tm.toString())
        .then((response) => {
          this.messages = response.data;
          this.loading = false;
        })
        .catch((error) => console.log(error));
    },
    getFakeMessages() {
      this.loading = true;
      setTimeout(() => {
        this.messages = [
          {
            upvote: 9,
            text: "Feel the light, shining in the dark of night",
            voice_id: "",
            id: "ee0337b6",
            url: "",
          },
          {
            upvote: 7,
            text: "Shine bright like a diamond",
            voice_id: "",
            id: "dde316f4",
            url: "",
          },
          {
            upvote: 5,
            text: "Turn your face towards the sun, let the shadows fall behind you",
            voice_id: "",
            id: "3a58a3bd",
            url: "",
          },
          {
            upvote: 4,
            text: "Step into the daylight and let it go",
            voice_id: "",
            id: "27722d5e",
            url: "",
          },
          {
            upvote: 4,
            text: "Clear blue water, high tide came and brought you in",
            voice_id: "",
            id: "47e88853",
            url: "",
          },
          {
            upvote: 3,
            text: "These hands had to let it go free, and this love came back to me",
            voice_id: "",
            id: "5e795379",
            url: "",
          },
          {
            upvote: 3,
            text: "You're my my my my Lover.",
            voice_id: "",
            id: "451b441d",
            url: "",
          },
          {
            upvote: 2,
            text: "When you're young, they assume you knew nothing",
            voice_id: "",
            id: "4b6882da",
            url: "",
          },
          {
            upvote: 2,
            text: "You could be the one that I love",
            voice_id: "",
            id: "5a55723a",
            url: "",
          },
        ];
        this.loading = false;
      }, 2000);
    },
    changeDate(date) {
      this.date = date;
    },
    addNewMessage(message) {
      this.messages.push(message);
    },
    updateNumberMessage() {
      this.totalMessages = this.messages.length;
    },
  },
  mounted() {
    let tm = this.date.utc().startOf("day").valueOf();
    this.getFakeMessages();
    // this.getMessages(tm);
  },
  watch: {
    date(newDate, oldDate) {
      if (!oldDate.isSame(newDate, "day")) {
        // console.log("Hey: ", this.date.toString());
        let tm = newDate.utc().startOf("day").valueOf();
        // this.getMessages(tm);
        this.getFakeMessages();
      }
    },
  },
};
</script>

<style>
.nav-bar {
  position: fixed;
  z-index: 1;
  width: 100vw;
  padding: 0 min(10vw, 20px) !important;
}
.my-element {
  min-height: 100vh !important;
  min-height: calc(var(--vh, 1vh) * 100 - 1px) !important;
}
.my-pane {
  width: 100%;
  padding: 0px min(10vw, 30px);
  text-align: center;
  overflow: hidden;
  max-width: 1260px;
  margin: auto;
}
.my-loading {
  margin: 20vh 0 !important;
  margin: calc(var(--vh, 1vh) * 20) 0 !important;
}

body {
  overflow-x: hidden;
  width: calc(var(--vw, 1vw) * 100) !important;
}

/* width */
body::-webkit-scrollbar {
  width: 8px;
  position: fixed !important;
}

/* Track */
body::-webkit-scrollbar-track {
  border-radius: 8px;
  background: #f0f2f5;
}

/* Handle */
body::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 8px;
}

.html {
  overflow-y: auto;
}
</style>
