<template>
    <div class="bg-white">
        <div class="mx-auto max-w-7xl overflow-hidden py-8 sm:px-6 lg:px-8">
            <h2 class="sr-only">Sellers</h2>
            <div class="relative mb-2">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <button @click="scrollLeft"
                            class="text-gray-600 hover:text-black bg-white p-2 rounded-full shadow-md">
                            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <!-- Carousel wrapper -->
                    <div class="flex-1 relative overflow-hidden">
                        <div ref="carousel" class="flex overflow-x-auto no-scrollbar space-x-1 scroll-smooth">
                        <div v-for="seller in sellers" :key="seller.name"
                            class="flex-shrink-0 text-center flex flex-col items-center w-1/3 sm:w-1/4 lg:w-1/6">
                            <button @click="navigateToSellerInfo(seller)" class="block">
                                <div class="border border-gray-300 rounded-full overflow-hidden w-24 h-24 bg-white mx-auto">
                                    <img :src="seller.logo" :alt="seller.seller_name" class="object-contain w-full h-full"
                                        loading="lazy" />
                                </div>
                                <div class="w-24 mt-2 font-semibold text-sm">
                                    <span class="block text-black truncate">{{ seller.seller_name }}</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    </div>
                    <div class="flex-shrink-0">
                        <button @click="scrollRight"
                            class="text-gray-600 hover:text-black bg-white p-2 rounded-full shadow-md">
                            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    sellers: {
        type: Array,
        required: true
    }
});

const router = useRouter()
function navigateToSellerInfo(sellerInfo) {
    const seller = sellerInfo.name
    router.push({ name: 'SellerInfo', params: { seller } });
}

const sellers = props.sellers;

const carousel = ref(null);

const scrollLeft = () => {
    if (carousel.value) {
        carousel.value.scrollBy({
            left: -carousel.value.offsetWidth,
            behavior: 'smooth'
        });
    }
};

const scrollRight = () => {
    if (carousel.value) {
        carousel.value.scrollBy({
            left: carousel.value.offsetWidth,
            behavior: 'smooth'
        });
    }
};
</script>

<style scoped>
/* Hide the default scrollbar */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

/* Adjust for smoother UX */
.scroll-smooth {
    scroll-behavior: smooth;
}
</style>
  