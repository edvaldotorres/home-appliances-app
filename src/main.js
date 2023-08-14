import { createApp } from "vue";
import App from "./App.vue";
import { installPlugins } from "./plugins";

const app = createApp(App);

app.config.devtools = process.env.NODE_ENV !== "production";

installPlugins(app).mount("#app");
