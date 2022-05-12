<template>
  <div class="float-button" v-if="!visible">
    <a-button
      class="write-button"
      type="primary"
      shape="circle"
      @click="showModal"
    >
      <template #icon>
        <edit-outlined style="font-size: 20px" />
      </template>
    </a-button>
  </div>
  <a-modal
    v-model:visible="visible"
    :footer="null"
    :destroyOnClose="true"
    :afterClose="() => (text = '')"
  >
    <div class="modal-body">
      <div class="modal-guide">
        <a-typography-title
          :level="3"
          content="How to write"
          style="color: white; text-align: center"
        />
        <a-typography-paragraph
          content="Write an English inspirational positive message for making people feel good"
          style="
            color: white;
            font-size: 16px;
            text-align: center;
            padding: 5px;
          "
          strong
        />

        <div class="my-card example-card">
          <div class="typewriter">
            <h4>Make me feel good...</h4>
          </div>
        </div>
      </div>
      <div class="modal-write">
        <a-textarea
          class="body-text-input"
          v-model:value="text"
          show-count
          size="large"
          :maxlength="80"
          placeholder="Write here..."
        />
        <div class="post-bottom-block">
          <a-button
            class="post-button"
            type="primary"
            shape="round"
            @click="createMessage()"
            :loading="sending"
            >{{ sending ? "" : "Post" }}</a-button
          >
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
import { EditOutlined } from "@ant-design/icons-vue";
import axios from "axios";
import config from "../config";
export default defineComponent({
  setup() {
    const visible = ref(false);
    const text = ref("");
    const sending = ref(false);
    const image = "@/assets/background1.jpg";
    const showModal = () => {
      visible.value = true;
    };
    const createMessage = () => {
      sending.value = true;
      axios
        .post(config.API, {
          message: text.value,
        })
        .then((response) => {
          console.log(response);
          sending.value = false;
        })
        .catch((error) => console.log(error));
    };
    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    return {
      visible,
      text,
      image,
      sending,
      showModal,
      handleOk,
      createMessage,
    };
  },
  components: {
    EditOutlined,
  },
});
</script>
<style>
.float-button {
  position: fixed;
  width: 64px;
  height: 64px;
  bottom: 24px;
  right: 24px;
}
.modal-body {
  display: flex;
  /* background: pink; */
  border-radius: 8px;
  height: 100%;
}
.modal-guide {
  width: 100%;
  min-height: 24vh;
  height: 100%;
  /* background: yellow; */
  border-radius: 8px;
  padding: 20px !important;
  background-image: url(https://www.img.in.th/images/bcf7688121d8d0a88f950d0d695c1db8.jpg);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.modal-write {
  width: 100%;
  min-height: 24vh;
  height: 100%;
  /* background: red; */
  border-radius: 8px;
  padding: 20px !important;
  padding-top: 40px !important;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.body-text-input {
  width: 100%;
  height: calc(100% - 4px);
}
.body-text-input > .ant-input {
  resize: none !important;
}
.post-button {
  width: 64px;
  min-width: 64px;
  float: right;
  margin-top: 14px;
  font-weight: bold !important;
  letter-spacing: 0.05em;
}
.write-button {
  width: 54px !important;
  height: 54px !important;
}
.example-card {
  height: 120px;
  justify-content: center !important;
  align-items: center !important;
}
.ant-input-textarea-show-count::after {
  float: left !important;
  padding-top: 20px;
}
.ant-modal-close-x {
  width: 40px !important;
  height: 40px !important;
  line-height: 40px !important;
}
.ant-modal-content {
  border-radius: 10px !important;
  height: 54vh;
}
.ant-modal-body {
  padding: 0 !important;
  height: 100%;
}

@media screen and (max-width: 768px) {
  .modal-body {
    flex-direction: column;
    width: 100%;
  }
  .modal-guide {
    height: 40%;
  }
  .modal-write {
    padding-top: 20px !important;
  }
  .body-text-input {
    width: 100%;
  }
  .example-card {
    display: none;
  }
}
.typewriter h4 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}
</style>
