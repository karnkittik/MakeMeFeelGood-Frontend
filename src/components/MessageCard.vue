<template>
  <div class="message-card">{{ message }}</div>
</template>
<script>
export default {
  props: {
    message: String,
  },
};
</script>
<style>
.message-card {
  background: #f0f0f0;
  font-size: 13px;
  height: 100%;
  border: 2px solid grey;
}
</style>
