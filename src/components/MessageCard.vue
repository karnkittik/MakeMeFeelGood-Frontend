<template>
  <!-- <div :class="`card card-${Math.floor(Math.random() * 4) + 1}`"> -->
  <div :class="`my-card card`">
    <div class="card-top-action-block">
      <a-tooltip
        title="Report this message"
        v-if="!reported"
        color="grey"
        placement="bottom"
      >
        <a-button type="text" shape="circle" @click="report()">
          <template #icon>
            <warning-outlined style="font-size: large; color: grey" />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip v-else title="Reported" color="grey" placement="bottom">
        <a-button type="text" shape="circle" disabled>
          <template #icon>
            <warning-filled style="font-size: large; color: #be3f5f" />
          </template>
        </a-button>
      </a-tooltip>
    </div>
    <a-typography-paragraph
      :ellipsis="{ rows: 4, expandable: true, symbol: '↩' }"
      :content="message.text"
      v-resize-text="{
        ratio: 20,
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
      <a-button type="text" shape="circle" @click="playThisMessage">
        <template #icon>
          <play-circle-outlined
            v-if="!playing"
            style="font-size: large; color: grey"
          />
          <play-circle-filled v-else style="font-size: large; color: #9b54bd" />
        </template>
      </a-button>
      <slot name="audio"></slot>
      <div>
        <span style="color: grey">{{ message.upvote }}</span>
        <a-tooltip
          title="Upvote this message"
          v-if="!upvoted"
          color="grey"
          placement="bottom"
        >
          <a-button type="text" shape="circle" @click="upvote()">
            <template #icon>
              <arrow-up-outlined style="font-size: large; color: grey" />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip v-else title="Upvoted!" color="grey" placement="bottom">
          <a-button type="text" shape="circle" disabled>
            <template #icon>
              <up-circle-filled
                style="font-size: large; color: #3cb51b"
              /> </template
          ></a-button>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
import {
  WarningOutlined,
  ArrowUpOutlined,
  UpCircleFilled,
  WarningFilled,
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
    WarningOutlined,
    ArrowUpOutlined,
    UpCircleFilled,
    WarningFilled,
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
      this.axios
        .patch(config.API + `/upvote/${this.message.id}`)
        .then((response) => {
          this.upvoted = true;
          this.message.upvote += 1;
        })
        .catch((error) => console.log(error));
    },
    report() {
      this.axios
        .patch(config.API + `/report/${this.message.id}`)
        .then((response) => {
          this.reported = true;
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
<style>
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
  transform: scale(1.02);
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
  overflow: scroll;
  color: black !important;
  text-align: center;
  font-family: inherit;
  margin: 0 !important;
}

/* .ant-typography-expand {
  color: #eec050 !important;
  font-weight: bold;
} */
</style>
