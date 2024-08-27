<template>
    <TransitionRoot as="template" :show="eventBus.searchOpen" @close="eventBus.searchOpen = false">
        <Dialog class="relative z-40" @close="eventBus.searchOpen = false">
            <!-- Background Overlay -->
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <!-- Form Control Panel -->
            <div class="fixed inset-0 flex-col items-center p-32">
                <div class="relative rounded-lg">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="translate-y-full" enter-to="translate-y-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-y-0"
                        leave-to="translate-y-full">
                        <DialogPanel
                            class="relative w-full max-w-lg flex-col bg-white shadow-xl z-50">
                            <!-- Search Form -->
                            <TextInput v-model="searchQuery" type="text" size="xl" placeholder="What are you looking for" >
                                <template #suffix>
                                    <FeatherIcon class="w-4" name="search" />
                                </template>
                            </TextInput>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { ref, watch } from 'vue';
import { TextInput, FeatherIcon } from 'frappe-ui';
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { eventBus } from '../eventbus'

const searchQuery = ref('');
watch(() => eventBus.searchOpen, (newValue) => {
    console.log('Search open:', newValue);
});

</script>
  