<template>
  <a-layout class="my-element">
    <NavigationBar />
    <a-layout-content>
      <div class="my-pane">
        <MessagePane :messages="messages" />
      </div>
    </a-layout-content>
    <CreateModal />
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
export default {
  components: { NavigationBar, MessagePane, MessageCard, CreateModal },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    getMessages() {
      this.axios
        .get(config.API + "/1652109817000")
        .then((response) => {
          this.messages = response.data;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getMessages();
  },
};
</script>

<style>
.my-element {
  min-height: 100vh !important;
  min-height: calc(var(--vh, 1vh) * 100) !important;
}
.my-pane {
  width: 100%;
  max-width: 1600px;
  margin: 0px auto;
  padding: 30px min(10vw, 30px);
}
</style>
