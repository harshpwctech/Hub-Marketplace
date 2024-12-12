import './index.css'

import { createApp, createVNode, render } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import TwicPics from "@twicpics/components/vue3";
import "@twicpics/components/style.css";
import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'
import { BuildingStorefrontIcon } from '@heroicons/vue/24/solid';
import './assets/global.css';
import { internalServices } from '../src/services/internalServices'

let pinia = createPinia()

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

const injectIconToHead = () => {
  // Create a container div to render the icon temporarily
  const container = document.createElement('div');
  
  // Create the Vue vnode for the icon
  const vnode = createVNode(BuildingStorefrontIcon);
  
  // Render the vnode into the container
  render(vnode, container);

  // Extract the SVG element
  const svgElement = container.innerHTML; // This will contain the SVG string

  // Create a <link> element to insert into the <head>
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';

  // Assign the SVG as a data URI
  const blob = new Blob([svgElement], { type: 'image/svg+xml' });
  link.href = URL.createObjectURL(blob);

  // Append the link to the <head>
  document.head.appendChild(link);

  // Cleanup
  render(null, container); // Destroy the vnode
};

injectIconToHead();

app.use(router)
app.use(pinia)
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
