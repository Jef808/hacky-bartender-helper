import { createApp } from "vue";
import { registerPlugins } from "@/plugins";

import vuetify from "@/plugins/vuetify";
import App from "@/App.vue";

const app = createApp(App);

app.use(vuetify).mount("#app");
