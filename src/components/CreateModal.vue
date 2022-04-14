<template>
  <div class="my-float">
    <a-button type="primary" @click="showModal" size="large"
      >Click me!</a-button
    >
  </div>
  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };
    return {
      visible,
      showModal,
      handleOk,
    };
  },
});
</script>
<style>
.my-float {
  position: fixed;
  width: 100px;
  height: 50px;
  bottom: 30px;
  right: 30px;
  background-color: red;
}
</style>
