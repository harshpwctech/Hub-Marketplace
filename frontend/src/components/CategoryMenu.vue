<template>
    <TransitionRoot as="template" :show="eventBus.menuOpen" @close="eventBus.menuOpen = false">
        <Dialog class="relative z-40" @close="eventBus.menuOpen = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 z-40 flex">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full" enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                    leave-to="-translate-x-full">
                    <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                        <div class="flex px-4 pb-2 pt-5">
                            <button type="button"
                                class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                @click="eventBus.menuOpen = false">
                                <span class="absolute -inset-0.5" />
                                <span class="sr-only">Close menu</span>
                                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <form class="mt-2">
                            <div class="border-b border-gray-200">
                                <h3 class="sr-only">Categories</h3>
                                <p class="block px-4 py-8 font-bold">Categories</p>
                            </div>
                            <Disclosure as="div" v-for="category in hubCategories" :key="category.name"
                                class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                                <h3 class="-mx-2 -my-3 flow-root">
                                    <DisclosureButton
                                        class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                        <span class="font-medium text-gray-900">{{ category.name }}</span>
                                        <span class="ml-6 flex items-center">
                                            <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                                            <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    </DisclosureButton>
                                </h3>
                                <DisclosurePanel class="space-y-10 px-4 py-4">
                                    <ul role="list" :aria-labelledby="`${category.name}-heading-mobile`"
                                        class="mt-6 flex flex-col space-y-6">
                                        <li v-if="!category.sub_category || category.sub_category.length === 0"
                                            class="flow-root">
                                            <button @click.prevent="navigateToProductList(category.name)"
                                                class="-m-2 block p-2 text-gray-500">{{ category.name }}</button>
                                        </li>
                                        <li v-else v-for="subCategory in category.sub_category"
                                            :key="subCategory.sub_category" class="flow-root">
                                            <button @click.prevent="navigateToProductList(category.name, subCategory.sub_category)"
                                                class="-m-2 block p-2 text-gray-500">{{ subCategory.sub_category }}</button>
                                        </li>
                                    </ul>
                                </DisclosurePanel>
                            </Disclosure>
                        </form>
                        <div class="space-y-6 border-t border-gray-200 px-4 py-20">
                            <div class="flow-root">
                                <a href="#" class="-m-2 block p-2 font-normal text-gray-900">Sign in</a>
                            </div>
                            <div class="flow-root">
                                <a href="#" class="-m-2 block p-2 font-normal text-gray-900">Create account</a>
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid'
import { eventBus } from '../eventbus'
import { internalServices } from '../services/internalServices'

const router = useRouter()
const { hubCategories } = internalServices();

function navigateToProductList(categoryName, subCategoryName = null) {
    const params = { categoryName };
    
    if (subCategoryName) {
        params.subCategoryName = subCategoryName;
    }
    
    router.push({ name: 'ProductList', params });
    eventBus.menuOpen = false;
}

</script>