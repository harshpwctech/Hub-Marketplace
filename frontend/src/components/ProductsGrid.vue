<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl overflow-hidden py-8 sm:px-6 lg:px-8">
      <h2 class="sr-only">Products</h2>
      <div class="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="product in products" :key="product.id" class="group relative border-b border-r border-gray-200 p-4 sm:p-6">
          <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
            <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center" />
          </div>
          <div class="pb-4 pt-10 text-center">
            <h3 class="text-sm font-medium text-gray-900">
              <button @click="navigateToProductInfo(product.name)">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ product.name }}
              </button>
            </h3>
            <div class="mt-3 flex flex-col items-center">
              <p class="mt-1 text-sm text-gray-500">Seller: {{ product.seller }}</p>
              <p class="sr-only">{{ product.rating }} out of 5 stars</p>
              <div class="flex mt-2 items-center">
                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[product.rating > rating ? 'text-yellow-400' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
              </div>
              <p class="mt-1 text-sm text-gray-500">{{ product.reviewCount }} reviews</p>
            </div>
            <p class="mt-4 text-base font-medium text-gray-900">{{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { StarIcon } from '@heroicons/vue/20/solid'
import { useRouter } from 'vue-router'

const props = defineProps({
    products: {
        type: Array,
        required: true
    }
});

const router = useRouter()
function navigateToProductInfo(productName) {
  router.push({ name: 'ProductInfo', params: { productName } });
  open.value = false
}
const products = props.products

</script>