import { createApp } from "vue";
import store from "./store";
import router from "./router";

import "@/styles/style.scss";
import App from "@/App.vue";
import { FontAwesomeIcon } from "@/plugins/font-awesome";
import axios from "@/plugins/axios";
import Particles from "particles.vue3";

const app = createApp(App);

app.use(store);
app.use(axios);
app.use(router);
app.use(Particles);

app.component("FaIcon", FontAwesomeIcon);

app.mount("#app");
