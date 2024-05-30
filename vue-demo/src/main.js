import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { createPinia } from "pinia";

import App from "@/App.vue";
import "@/index.css";
import router from "@/router";

library.add(faSearch);

const pinia = createPinia();

createApp(App).use(pinia).use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
