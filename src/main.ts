import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createI18n } from "vue-i18n";
import messages from "./locale";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const defaultLocale = navigator.language.substring(0, 2) || "en";
const locale = localStorage.getItem("locale");
const i18n = createI18n({
  locale: locale ? locale : defaultLocale,
  fallbackLocale: "en",
  messages,
});
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(store).use(i18n).use(router).use(elementPlus).mount("#app");
