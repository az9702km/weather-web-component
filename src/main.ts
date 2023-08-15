// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import './style.css'
// import App from './App.vue'

// const pinia = createPinia()
// const app = createApp(App)

// app.use(pinia)
// app.mount('#app')

import { defineCustomElement } from "vue";
import weatherAppElement from "./components/SomeWebC.ce.vue";

const weatherApp = defineCustomElement(weatherAppElement);
customElements.define("weather-app", weatherApp);
