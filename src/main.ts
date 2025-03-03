import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
pinia.use(({ store }) => {
    const data = localStorage.getItem(store.$id);
    if (data) {
        store.$patch(JSON.parse(data));
    }
    store.$subscribe((mutation, state) => {
        localStorage.setItem(store.$id, JSON.stringify(state));
    });
});

app.mount("#app");
