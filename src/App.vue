<template>
  <a-layout class="my-element">
    <NavigationBar />
    <a-layout-content>
      <div class="my-pane">
        <MessagePane />
      </div>
    </a-layout-content>
    <CreateModal />
    <a-layout-footer style="text-align: center">
      MakeMeFeelGood ©2022
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import NavigationBar from "./components/NavigationBar.vue";
import MessagePane from "./components/MessagePane.vue";
import MessageCard from "./components/MessageCard.vue";
import CreateModal from "./components/CreateModal.vue";
</script>

<style>
.my-element {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
}
.my-pane {
  width: 100%;
  max-width: 1600px;
  margin: 0px auto;
  padding: 30px min(10vw, 30px);
}
</style>
