<template>
  <transition name="bounce" appear>
    <a-row class="message-pane top-10-pane" :gutter="[12, 12]">
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
          <transition-group appear @before-enter="beforeEnter" @enter="enter">
            <a-col
              v-for="(message, messageIndex) in messages.slice(1, 5)"
              :key="messageIndex + 1"
              :xs="{ span: 24 }"
              :md="{ span: 12 }"
              :lg="{ span: 12 }"
              :data-index="messageIndex + 1"
            >
              <div class="rectangle">
                <message-card
                  :message="message"
                  :ref="`message-${messageIndex + 1}`"
                  :play-this-only="playThisOnly"
                  :message-index="messageIndex + 1"
                />
              </div>
            </a-col>
          </transition-group>
        </a-row>
      </a-col>
    </a-row>
  </transition>
  <a-row class="message-pane" :gutter="[12, 12]">
    <transition-group appear @before-enter="beforeEnter" @enter="enter">
      <a-col
        v-for="(message, messageIndex) in messages.slice(6)"
        :key="messageIndex + 6"
        :xs="{ span: 24 }"
        :md="{ span: 8 }"
        :lg="{ span: 4 }"
        :data-index="messageIndex + 6"
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
    </transition-group>
  </a-row>
</template>
<script>
import MessageCard from "./MessageCard.vue";
import gsap from "gsap";
export default {
  components: { MessageCard },
  props: {
    messages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
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
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = "translateY(100px)";
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        onComplete: done,
        delay: el.dataset.index * 0.2,
      });
    },
  },
};
</script>
<style>
.message-pane {
  padding: 10px calc(10px - 6px);
}

.top-10-pane {
  background: blue;
  border-radius: 10px;
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
  aspect-ratio: 1 / 1;
}

@media screen and (max-width: 768px) {
  .normal-message {
    aspect-ratio: 17 / 10 !important;
  }
  .rectangle {
    aspect-ratio: 17 / 10 !important;
  }
  .top-message {
    aspect-ratio: 4 / 3 !important;
  }
}
@media screen and (max-width: 992px) {
  .rectangle {
    aspect-ratio: 1 / 1;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.8s;
}
.bounce-leave-active {
  animation: bounce-in 0.8s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}
</style>
