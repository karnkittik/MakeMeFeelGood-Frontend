<template>
  <div class="card card-1">
    <div class="card-top-action-block">
      <a-tooltip
        title="Report this message"
        v-if="!reported"
        color="purple"
        placement="bottom"
      >
        <a-button type="text" shape="circle" @click="report()">
          <template #icon>
            <warning-outlined style="font-size: large; color: blueviolet" />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip v-else title="Reported" color="purple" placement="bottom">
        <a-button type="text" shape="circle" disabled>
          <template #icon>
            <warning-filled style="font-size: large; color: blueviolet" />
          </template>
        </a-button>
      </a-tooltip>
    </div>
    <a-typography-paragraph
      :ellipsis="{ rows: 4, expandable: true, symbol: 'more' }"
      :content="message.text"
      v-resize-text="{
        ratio: 1.8,
        minFontSize: '20px',
        maxFontSize: '64px',
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
            style="font-size: large; color: blueviolet"
          />
          <play-circle-filled
            v-else
            style="font-size: large; color: blueviolet"
          />
        </template>
      </a-button>
      <slot name="audio"></slot>
      <div>
        <span>{{ message.upvote }}</span>
        <a-tooltip
          title="Upvote this message"
          v-if="!upvoted"
          color="purple"
          placement="bottom"
        >
          <a-button type="text" shape="circle" @click="upvote()">
            <template #icon>
              <arrow-up-outlined style="font-size: large; color: blueviolet" />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip v-else title="Upvoted!" color="purple" placement="bottom">
          <a-button type="text" shape="circle" disabled>
            <template #icon>
              <up-circle-filled
                style="font-size: large; color: blueviolet"
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
      this.upvoted = true;
    },
    report() {
      this.reported = true;
    },
    playThisMessage() {
      this.playThisOnly(this.messageIndex);
      this.playing = true;
    },
  },
};
</script>
<style>
.card {
  padding: 5px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  transform: scale(1.02);
}

.card-top-action-block {
  display: flex;
  justify-content: end;
  align-items: center;
  background: rgb(215, 215, 215);
}

.card-bottom-action-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(215, 215, 215);
}

.card-message {
  background: #b6d0f4;
  padding: 0 30px;
  width: 100%;
  overflow: scroll;
  color: black;
  text-align: center;
  font-family: inherit;
  margin: 0 !important;
}

.card__link,
.card__exit,
.card__icon {
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  right: 0;
}

.card__link::after {
  position: absolute;
  top: 25px;
  left: 0;
  content: "";
  width: 0%;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.6);
  transition: all 0.5s;
}

.card__link:hover::after {
  width: 100%;
}

.card__exit {
  grid-row: 1/2;
  justify-self: end;
}

.card__icon {
  grid-row: 2/3;
  font-size: 30px;
}

.card__apply {
  grid-row: 4/5;
  align-self: center;
}
.card-1 {
  background: #f0f0f0;
  /* background: radial-gradient(#1fe4f5, #3fbafe); */
}

.card-2 {
  background: radial-gradient(#fbc1cc, #fa99b2);
}

.card-3 {
  background: radial-gradient(#76b2fe, #b69efe);
}

.card-4 {
  background: radial-gradient(#60efbc, #58d5c9);
}

.card-5 {
  background: radial-gradient(#f588d8, #c0a3e5);
}
</style>
