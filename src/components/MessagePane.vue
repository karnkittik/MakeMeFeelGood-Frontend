<template>
  <a-row class="message-pane" :gutter="[12, 12]">
    <a-col :xs="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 8 }">
      <div
        class="top-message"
        v-for="(message, messageIndex) in messages.slice(0, 1)"
        :key="messageIndex"
      >
        <message-card
          :message="message"
          :ref="`message-${messageIndex}`"
          :play-this-only="playThisOnly"
          :message-index="messageIndex"
          type="top"
        />
      </div>
    </a-col>
    <a-col :xs="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 16 }">
      <a-row :gutter="[12, 12]">
        <a-col
          v-for="(message, messageIndex) in messages.slice(1, 5)"
          :key="messageIndex + 1"
          :xs="{ span: 24 }"
          :md="{ span: 12 }"
          :lg="{ span: 12 }"
        >
          <div class="rectangle">
            <message-card
              :message="message"
              :ref="`message-${messageIndex + 1}`"
              :play-this-only="playThisOnly"
              :message-index="messageIndex + 1"
              type="top"
            />
          </div>
        </a-col>
      </a-row>
    </a-col>
  </a-row>

  <a-row class="message-pane" :gutter="[12, 12]">
    <a-col
      v-for="(message, messageIndex) in messages.slice(6)"
      :key="messageIndex + 6"
      :xs="{ span: 24 }"
      :md="{ span: 8 }"
      :lg="{ span: 4 }"
    >
      <div class="normal-message">
        <message-card
          :message="message"
          :ref="`message-${messageIndex + 6}`"
          :play-this-only="playThisOnly"
          :message-index="messageIndex + 6"
        />
      </div>
    </a-col>
  </a-row>
</template>
<script>
import MessageCard from "./MessageCard.vue";
export default {
  components: { MessageCard },
  data() {
    return {
      messages: [],
      currentTrack: null,
    };
  },
  methods: {
    playThisOnly(newTrack) {
      if (this.currentTrack != null) {
        let refName = `message-${this.currentTrack}`;
        let player = this.$refs[refName][0].$refs.player;
        this.$refs[refName][0].playing = false;
        player.pause();
        player.currentTime = 0;
      }
      let newRefName = `message-${newTrack}`;
      let newPlayer = this.$refs[newRefName][0].$refs.player;
      this.currentTrack = newTrack;
      newPlayer.play();
    },
  },
};
</script>
<style>
.message-pane {
  padding: 10px calc(10px - 6px);
}
.top-message {
  height: 100%;
  width: 100%;
  aspect-ratio: 1 / 1;
}

.rectangle {
  aspect-ratio: 2 / 1;
}

.normal-message {
  aspect-ratio: 8 / 9;
}

@media screen and (max-width: 768px) {
  .normal-message {
    aspect-ratio: 2 / 1 !important;
  }
}

@media screen and (max-width: 992px) {
  .rectangle {
    aspect-ratio: 1 / 1 !important;
  }
}
</style>
