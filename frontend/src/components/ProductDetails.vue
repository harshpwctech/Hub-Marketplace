<template>
    <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:py-8">
            <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                <!-- Image gallery -->
                <TabGroup as="div" class="flex flex-col-reverse">
                    <!-- Image selector -->
                    <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                        <TabList class="grid grid-cols-4 gap-6">
                            <Tab v-for="image in product.images" :key="image.id"
                                class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                v-slot="{ selected }">
                                <span class="sr-only">{{ image.name }}</span>
                                <span class="absolute inset-0 overflow-hidden rounded-md">
                                    <img :src="image.src" alt="" class="h-full w-full object-contain object-center" />
                                </span>
                                <span
                                    :class="[selected ? 'ring-indigo-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']"
                                    aria-hidden="true" />
                            </Tab>
                        </TabList>
                    </div>

                    <TabPanels class="relative w-full">
                        <div class="max-w-2xl mx-auto">
                            <TabPanel v-for="image in product.images" :key="image.id">
                                <div class="relative w-full h-80 sm:h-96 lg:h-[500px] overflow-hidden rounded-lg">
                                <img :src="image.src" :alt="image.alt"
                                class="h-full w-full object-contain object-center sm:rounded-lg" />
                                </div>
                        </TabPanel>

                        </div>
                    </TabPanels>
                </TabGroup>

                <!-- Product info -->
                <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>

                    <div class="mt-3">
                        <h2 class="sr-only">Product information</h2>
                        <p class="text-3xl tracking-tight text-gray-900">₹ {{ product.price }}</p>
                    </div>

                    <!-- Reviews -->
                    <div class="mt-3">
                        <h3 class="sr-only">Reviews</h3>
                        <div class="flex items-center">
                            <div class="flex items-center">
                                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                                    :class="[product.rating > rating ? 'text-indigo-500' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']"
                                    aria-hidden="true" />
                            </div>
                            <p class="sr-only">{{ product.rating }} out of 5 stars</p>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3 class="sr-only">Description</h3>

                        <div class="space-y-6 text-base text-gray-700" v-html="product.description" />
                    </div>

                    <form class="mt-6">
                        <div v-if="product.variants">
                            <!-- Colors -->
                            <div>
                                <h3 class="text-sm font-medium text-gray-600">Color</h3>

                                <fieldset aria-label="Choose a color" class="mt-2">
                                    <RadioGroup v-model="selectedColor" class="flex items-center space-x-3">
                                        <RadioGroupOption as="template" v-for="color in product.colors" :key="color.name"
                                            :value="color" :aria-label="color.name" v-slot="{ active, checked }">
                                            <div
                                                :class="[color.selectedColor, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', 'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none']">
                                                <span aria-hidden="true"
                                                    :class="[color.bgColor, 'h-8 w-8 rounded-full border border-black border-opacity-10']" />
                                            </div>
                                        </RadioGroupOption>
                                    </RadioGroup>
                                </fieldset>
                            </div>

                            <div class="mt-10">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-sm font-medium text-gray-900">Size</h3>
                                </div>

                                <fieldset aria-label="Choose a size" class="mt-4">
                                    <RadioGroup v-model="selectedSize"
                                        class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                        <RadioGroupOption as="template" v-for="size in product.sizes" :key="size.name"
                                            :value="size" :disabled="!size.inStock" v-slot="{ active, checked }">
                                            <div
                                                :class="[size.inStock ? 'cursor-pointer bg-white text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200', active ? 'ring-2 ring-indigo-500' : '', 'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6']">
                                                <span>{{ size.name }}</span>
                                                <span v-if="size.inStock"
                                                    :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-md']"
                                                    aria-hidden="true" />
                                                <span v-else aria-hidden="true"
                                                    class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                                    <svg class="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                        viewBox="0 0 100 100" preserveAspectRatio="none"
                                                        stroke="currentColor">
                                                        <line x1="0" y1="100" x2="100" y2="0"
                                                            vector-effect="non-scaling-stroke" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </RadioGroupOption>
                                    </RadioGroup>
                                </fieldset>
                            </div>
                        </div>

                        <div class="mt-10 flex">
                            <button type="submit"
                                class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                :style="{ backgroundColor: 'var(--theme-color)' }">Add to bag</button>

                            <button type="button"
                                class="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                                <HeartIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                <span class="sr-only">Add to favorites</span>
                            </button>
                        </div>
                    </form>

                    <!-- Seller Info -->
                    <div class="mt-10">
                        <h3 class="sr-only">Seller Info</h3>
                        <div class="flex items-center justify-between">
                            <h3 class="text-sm font-medium text-gray-900">Sold by</h3>
                        </div>
                        <div class="flex items-center justify-between space-x-6 mt-10">
                            <div class="border border-gray-300 rounded-full w-20 h-20 bg-white">
                                <img :src="seller.logo" :alt="seller.seller_name" class="object-contain w-full h-full"
                                    loading="lazy" />
                            </div>
                            <div class="flex-grow">
                                <h2 class="text-2xl font-bold">{{ seller.seller_name }}</h2>
                                <p>Mumbai, India</p>
                            </div>
                            <div>
                                <button @click="navigateToSellerInfo(seller)"
                                    class="text-sm font-medium text-indigo-600 hover:text-indigo-500">View All
                                    products</button>
                            </div>
                        </div>

                    </div>

                    <section aria-labelledby="details-heading" class="mt-12">
                        <h2 id="details-heading" class="sr-only">Additional details</h2>

                        <div class="divide-y divide-gray-200 border-t">
                            <Disclosure as="div" v-for="detail in product.details" :key="detail.name" v-slot="{ open }">
                                <h3>
                                    <DisclosureButton
                                        class="group relative flex w-full items-center justify-between py-6 text-left">
                                        <span
                                            :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']">{{
                                                detail.name }}</span>
                                        <span class="ml-6 flex items-center">
                                            <PlusIcon v-if="!open"
                                                class="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true" />
                                            <MinusIcon v-else
                                                class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                                aria-hidden="true" />
                                        </span>
                                    </DisclosureButton>
                                </h3>
                                <DisclosurePanel as="div" class="prose prose-sm pb-6">
                                    <ul role="list">
                                        <li v-for="item in detail.items" :key="item">{{ item }}</li>
                                    </ul>
                                </DisclosurePanel>
                            </Disclosure>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    RadioGroup,
    RadioGroupOption,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/vue'
import { StarIcon } from '@heroicons/vue/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { internalServices } from '../services/internalServices'
import { useRouter } from 'vue-router';

const props = defineProps({
    productName: {
        type: String,
        required: true
    }
});
const isLoading = ref(true)
const product = ref({})
const seller = ref({})
const useInternalServices = internalServices();
onMounted(() => {
    fetchData()
})

const fetchData = async () => {
    try {
        const itemData = await useInternalServices.getItem.fetch({
            "name": props.productName
        });
        createProductData(itemData)
        const sellerData = await useInternalServices.getSeller.fetch({
            "hub_seller": itemData.hub_seller
        });
        seller.value = sellerData
        isLoading.value = false
    } catch (error) {
        console.error(`Failed to fetch item or seller:`, error);
    }

};
function createProductData(itemData) {
    let data = {
        name: itemData.item_name,
        price: itemData.offered_price,
        rating: itemData.rating,
        images: [],
        variants: [],
        description: itemData.item_name,
        details: []
    }
    if (itemData.image){
        data.images.push({src: itemData.image})
    }
    return product.value = data
};
const router = useRouter();
function navigateToSellerInfo(sellerInfo) {
    const seller = sellerInfo.name
    router.push({ name: 'SellerInfo', params: { seller } });
};

// const product = {
//     name: 'Zip Tote Basket',
//     price: '$140',
//     rating: 4,
//     images: [
//         {
//             id: 1,
//             name: 'Angled view',
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
//             alt: 'Angled front view with bag zipped and handles upright.',
//         },
//         {
//             id: 1,
//             name: 'Angled view',
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
//             alt: 'Angled front view with bag zipped and handles upright.',
//         },
//         {
//             id: 1,
//             name: 'Angled view',
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
//             alt: 'Angled front view with bag zipped and handles upright.',
//         },
//         {
//             id: 1,
//             name: 'Angled view',
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
//             alt: 'Angled front view with bag zipped and handles upright.',
//         },
//         // More images...
//     ],
//     colors: [
//         { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
//         { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
//         { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
//     ],
//     sizes: [
//         { name: 'XXS', inStock: false },
//         { name: 'XS', inStock: true },
//         { name: 'S', inStock: true },
//         { name: 'M', inStock: true },
//         { name: 'L', inStock: true },
//         { name: 'XL', inStock: true },
//         { name: '2XL', inStock: true },
//         { name: '3XL', inStock: true },
//     ],
//     description: `
//       <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
//     `,
//     details: [
//         {
//             name: 'Features',
//             items: [
//                 'Multiple strap configurations',
//                 'Spacious interior with top zip',
//                 'Leather handle and tabs',
//                 'Interior dividers',
//                 'Stainless strap loops',
//                 'Double stitched construction',
//                 'Water-resistant',
//             ],
//         },
//         {
//             name: 'Shipping',
//             items: [
//                 'Multiple strap configurations',
//                 'Spacious interior with top zip',
//                 'Leather handle and tabs',
//                 'Interior dividers',
//                 'Stainless strap loops',
//                 'Double stitched construction',
//                 'Water-resistant',
//             ],
//         },
//         {
//             name: 'Return Policy',
//             items: [
//                 'Multiple strap configurations',
//                 'Spacious interior with top zip',
//                 'Leather handle and tabs',
//                 'Interior dividers',
//                 'Stainless strap loops',
//                 'Double stitched construction',
//                 'Water-resistant',
//             ],
//         },
//         {
//             name: 'Seller Info',
//             items: [
//                 'Multiple strap configurations',
//                 'Spacious interior with top zip',
//                 'Leather handle and tabs',
//                 'Interior dividers',
//                 'Stainless strap loops',
//                 'Double stitched construction',
//                 'Water-resistant',
//             ],
//         }
//         // More sections...
//     ],
// }
</script>