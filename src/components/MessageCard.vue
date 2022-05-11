<template>
  <!-- <div :class="`card card-${Math.floor(Math.random() * 4) + 1}`"> -->
  <div :class="`my-card card`">
    <div class="card-top-action-block">
      <span style="color: grey">Report</span>
      <a-button v-if="!reported" type="text" shape="circle" @click="report()">
        <template #icon>
          <exclamation-circle-outlined style="font-size: large; color: grey" />
        </template>
      </a-button>
      <a-button
        v-else
        type="text"
        shape="circle"
        disabled
        style="cursor: default !important"
      >
        <template #icon>
          <exclamation-circle-filled style="font-size: large; color: #be3f5f" />
        </template>
      </a-button>
    </div>
    <a-typography-paragraph
      v-if="type == 'top'"
      :ellipsis="{ rows: 3, expandable: true, symbol: '↩' }"
      :content="message.text"
      v-resize-text="{
        ratio: 1.1,
        minFontSize: '16px',
        maxFontSize: '48px',
        delay: 100,
      }"
      class="card-message"
    />
    <a-typography-paragraph
      v-else
      :ellipsis="{ rows: 3, expandable: true, symbol: '↩' }"
      :content="message.text"
      v-resize-text="{
        ratio: 1.5,
        minFontSize: '16px',
        maxFontSize: '48px',
        delay: 100,
      }"
      class="card-message"
    />
    <div class="card-bottom-action-block">
      <audio ref="player" @ended="playing = false">
        <source :src="message.url" type="audio/mpeg" />
      </audio>
      <div>
        <a-button
          type="text"
          shape="circle"
          @click="playThisMessage"
          style="cursor: default !important"
        >
          <template #icon>
            <play-circle-outlined
              v-if="!playing"
              style="font-size: large; color: grey"
            />
            <play-circle-filled
              v-else
              style="font-size: large; color: #9b54bd"
            />
          </template>
        </a-button>
        <span style="color: grey">Play</span>
      </div>
      <div>
        <span style="color: grey">{{ message.upvote }}</span>
        <a-button v-if="!upvoted" type="text" shape="circle" @click="upvote()">
          <template #icon>
            <arrow-up-outlined style="font-size: large; color: grey" />
          </template>
        </a-button>
        <a-button
          v-else
          title="Upvoted!"
          type="text"
          shape="circle"
          disabled
          style="cursor: default !important"
        >
          <template #icon>
            <up-circle-filled style="font-size: large; color: #3cb51b" />
          </template>
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ExclamationCircleOutlined,
  ArrowUpOutlined,
  UpCircleFilled,
  ExclamationCircleFilled,
  PlayCircleOutlined,
  PlayCircleFilled,
} from "@ant-design/icons-vue";
import config from "../config";
export default {
  props: {
    message: {
      type: Object,
      default() {
        return {
          upvote: 0,
          text: "",
          voice_id: "",
          id: "",
          url: "#",
        };
      },
    },
    type: {
      type: String,
      default: "normal",
    },
    playThisOnly: Function,
    messageIndex: Number,
  },
  components: {
    ExclamationCircleOutlined,
    ArrowUpOutlined,
    UpCircleFilled,
    ExclamationCircleFilled,
    PlayCircleOutlined,
    PlayCircleFilled,
  },
  data() {
    return {
      upvoted: false,
      reported: false,
      playing: false,
    };
  },
  methods: {
    upvote() {
      this.upvoted = true;
      this.message.upvote += 1;
      this.axios
        .patch(config.API + `/upvote/${this.message.id}`)
        .then((response) => {})
        .catch((error) => console.log(error));
    },
    report() {
      this.reported = true;
      this.axios
        .patch(config.API + `/report/${this.message.id}`)
        .then((response) => {
          console.log(this.reported);
        })
        .catch((error) => console.log(error));
    },
    playThisMessage() {
      this.playThisOnly(this.messageIndex);
      this.playing = true;
    },
  },
};
</script>
<style lang="scss">
.my-card {
  padding: 5px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
}

.card:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  transform: scale(0.98);
}

.card-top-action-block {
  display: flex;
  justify-content: end;
  align-items: center;
}

.card-bottom-action-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-message {
  padding: 0 20px;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  color: black !important;
  text-align: center;
  font-family: inherit;
  margin: 0 !important;
}

/* .ant-typography-expand {
  color: #eec050 !important;
  font-weight: bold;
} */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* width */
.card-message::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.card-message::-webkit-scrollbar-track {
  border-radius: 8px;
}

/* Handle */
.card-message::-webkit-scrollbar-thumb {
  border-radius: 8px;
}

/* Handle on hover */
.card-message::-webkit-scrollbar-thumb:hover {
  background: gray;
}

.card-message:hover {
  &::-webkit-scrollbar-thumb {
    background: gray;
  }
}
</style>
