<template>
    <Dialog :options="{ size: 'xl', position: 'top' }" :model-value="modelValue" @update:model-value="handleDialogClose"
        @after-leave="resetDialogState">
        <template #body>
            <div>
                <Combobox nullable v-model="selectedValue" @update:model-value="onSelection">
                    <div class="relative">
                        <div class="pl-4.5 absolute inset-y-0 left-0 flex items-center">
                            <FeatherIcon name="search" class="w-4" />
                        </div>
                        <ComboboxInput placeholder="Search Items"
                            class="pl-11.5 pr-4.5 w-full border-none bg-transparent py-3 text-base text-gray-800 placeholder:text-gray-500 focus:ring-0"
                            autocomplete="off" @input="onInput" />
                    </div>
                    <ComboboxOptions class="max-h-96 overflow-auto border-t border-gray-100 text-base" :class="{
                        'py-2.5': items.length,
                    }" static hold>
                        <ComboboxOption v-for="item in items" :key="item.name" v-slot="{ active }" :value="item"
                            class="px-2.5">
                            <div class="flex w-full min-w-0 items-center gap-1 rounded p-2 text-base font-medium text-gray-800"
                                :class="{ 'bg-gray-200': active }">
                                <span class="overflow-hidden text-ellipsis whitespace-nowrap text-gray-700">
                                    {{ item.item_name }}
                                </span>
                            </div>
                        </ComboboxOption>
                    </ComboboxOptions>
                </Combobox>
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { Dialog, FeatherIcon } from "frappe-ui";
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
} from "@headlessui/vue";
import { internalServices } from '../services/internalServices';
import { useRouter } from 'vue-router';

const props = defineProps({
    modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const useInternalServices = internalServices();
const fetchItemsFilters = ref({ item_name: '' });
const items = ref([]);
const selectedValue = ref(null);
const router = useRouter();

const fetchItems = async () => {
    try {
        const data = await useInternalServices.getItems.fetch({
            filters: fetchItemsFilters.value
        });
        items.value = data;
    } catch (error) {
        console.error(`Failed to fetch items:`, error);
    }
};

function onInput(e) {
    const inputValue = e.target.value?.trim();
    fetchItemsFilters.value.item_name = inputValue;
    if (inputValue && inputValue.length > 2) {
        fetchItems();
    }
}

function onSelection(val) {
    if (val) {
        emit("update:modelValue", false);
        router.push({ name: 'ProductInfo', params: { productName: val.name } });
    }
}

function handleDialogClose(value) {
    emit("update:modelValue", value);
}

function resetDialogState() {
    items.value = [];
    selectedValue.value = null;
}
</script>
