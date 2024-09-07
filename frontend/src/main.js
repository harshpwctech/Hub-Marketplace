import './index.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import TwicPics from "@twicpics/components/vue3";
import "@twicpics/components/style.css";
import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'
import './assets/global.css';
import { internalServices } from '../src/services/internalServices'

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)
app.use(TwicPics, {
    domain: "https://hub-marketplace.twic.pics"
  });

app.component('Button', Button)
const { fetchCategories } = internalServices();

// Multiple APIs that needs to be called before the app opens, currently the master fata of categories are called.
// For Multiple APIs, recommended to use a single function which calls the APIs.
fetchCategories().then(() => {
    app.mount('#app');
});
