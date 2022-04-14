<template>
  <a-row v-if="type == 'top'" class="message-pane" :gutter="[12, 12]">
    <a-col :xs="{ span: 24 }" :md="{ span: 8 }" :lg="{ span: 8 }">
      <div class="top-message">
        <message-card :message="'Top #' + messages.slice(0, 1)" />
      </div>
    </a-col>
    <a-col :xs="{ span: 24 }" :md="{ span: 16 }" :lg="{ span: 16 }">
      <a-row :gutter="[12, 12]">
        <a-col
          v-for="message in messages.slice(1, 5)"
          :key="message"
          :xs="{ span: 24 }"
          :md="{ span: 12 }"
          :lg="{ span: 12 }"
        >
          <div class="normal-message rectangle">
            <message-card :message="'Top #' + message" />
          </div>
        </a-col>
      </a-row>
    </a-col>
  </a-row>

  <a-row v-else class="message-pane" :gutter="[12, 12]">
    <a-col
      v-for="message in messages"
      :key="message"
      :xs="{ span: 24 }"
      :md="{ span: 4 }"
      :lg="{ span: 4 }"
    >
      <div class="normal-message">
        <message-card :message="'#' + message" />
      </div>
    </a-col>
  </a-row>
</template>
<script>
import MessageCard from "./MessageCard.vue";
export default {
  components: { MessageCard },
  props: {
    type: {
      type: String,
      default: "normal",
    },
    messages: {
      type: Array,
      default: [],
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
  aspect-ratio: 2 / 1 !important;
}

.normal-message {
  aspect-ratio: 1 / 1;
}

@media screen and (max-width: 768px) {
  .normal-message {
    aspect-ratio: 2 / 1 !important;
  }
}
</style>
