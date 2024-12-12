import { reactive } from 'vue';

export const eventBus = reactive({
  cartOpen: false,
  menuOpen: false,
  loginOpen: false,
  registerOpen: false
});