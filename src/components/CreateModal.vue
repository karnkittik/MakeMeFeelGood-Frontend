<template>
  <div class="float-button">
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
  <a-modal v-model:visible="visible" :footer="null">
    <div class="modal-body">
      <a-typography>
        <a-typography-title :level="3" content="How to write" />
        <a-typography-paragraph content="1. English only" />
        <a-typography-paragraph content="2. Within 100 letters" />
        <a-typography-paragraph content="3. Positive" />
      </a-typography>
      <a-divider class="divider divider-horizontal" type="horizontal" />
      <a-divider class="divider divider-vertical" type="vertical" />
      <span class="post-bottom-block">
        <a-textarea
          class="body-text-input"
          v-model:value="text"
          show-count
          size="large"
          :auto-size="{ minRows: 9, maxRows: 9 }"
          :maxlength="100"
        />
        <a-button class="post-button" type="primary" shape="round"
          >Post</a-button
        >
      </span>
    </div>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
import { EditOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  setup() {
    const visible = ref(false);
    const text = ref("");

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    return {
      visible,
      text,
      showModal,
      handleOk,
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
  bottom: 30px;
  right: 30px;
  /* background-color: red; */
}
.modal-body {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.divider {
  background-color: #3cb51b;
}
.divider-vertical {
  border-left: 2px solid rgba(0, 0, 0, 0.06) !important;
  min-height: 300px !important;
  margin: 0px 8px !important;
}
.divider-horizontal {
  border-top: 2px solid rgba(0, 0, 0, 0.06) !important;
  min-width: 0px !important;
  margin: 8px 0px !important;
  display: none !important;
}
.post-bottom-block {
  display: flex;
  flex-direction: column;
  align-items: end;
}
.body-description {
  width: 30%;
}
.body-text-input {
  height: 250px;
  width: 250px;
}
.post-button {
  width: 64px;
}
.write-button {
  width: 64px !important;
  height: 64px !important;
}
.ant-input-textarea-show-count::after {
  float: left !important;
  padding: 16px 0;
}
.ant-modal-close-x {
  width: 40px !important;
  height: 40px !important;
  line-height: 40px !important;
}
.ant-modal-content {
  border-radius: 10px !important;
}
@media screen and (max-width: 768px) {
  .divider-vertical {
    display: none !important;
  }
  .divider-horizontal {
    display: inline-block !important;
    width: 100% !important;
  }
  .modal-body {
    flex-direction: column;
    width: 100%;
  }
  .body-text-input {
    width: 100%;
  }
  .post-bottom-block {
    display: flex;
    flex-direction: column;
    align-items: end;
    width: 100%;
  }
  .ant-input-textarea-show-count::after {
    float: left !important;
    margin: 0 !important;
    padding: 16px 0;
    width: auto;
  }
}
</style>
