import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import VueResizeText from "vue3-resize-text";
import axios from "axios";
import VueAxios from "vue-axios";

// viewport height manager
let vh = window.innerHeight * 0.01;
let vw = window.innerWidth * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
document.documentElement.style.setProperty("--vw", `${vw}px`);
window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  document.documentElement.style.setProperty("--vw", `${vw}px`);
});

const app = createApp(App).use(Antd);
app.use(VueAxios, axios);
app.directive("ResizeText", VueResizeText.ResizeText);
app.mount("#app");
