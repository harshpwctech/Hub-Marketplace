<template>
    <div class="bg-gray-50">
        <div class="mx-auto max-w-7xl py-8 sm:px-2 sm:py-32 lg:px-4">
            <div class="max-w-3xl">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">We connect buyers with right sellers</h2>
            </div>
            <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-12 lg:max-w-none lg:grid-cols-3">
                <div v-for="incentive in incentives" :key="incentive.name"
                    class="text-center sm:flex sm:text-left lg:block lg:text-center">
                    <div class="sm:flex-shrink-0">
                        <div class="flow-root">
                            <img class="mx-auto h-24 w-28" :src="incentive.imageSrc" alt="" />
                        </div>
                    </div>
                    <div class="mt-3 sm:ml-3 sm:mt-0 lg:ml-0 lg:mt-3">
                        <h3 class="text-sm font-medium text-gray-900">{{ incentive.name }}</h3>
                        <p class="mt-2 text-sm text-gray-500">{{ incentive.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import delivery from '../assets/Icons/delivery.svg'
import connect from '../assets/Icons/connect.svg'
import cart from '../assets/Icons/cart.svg'

const incentives = [
    {
        name: 'Products as per your needs',
        description: "One stop marketplace for 1000s of products. Just let us know your needs and get your products delivered.",
        imageSrc: delivery,
    },
    {
        name: 'Connect to 1000+ Sellers',
        description: 'A marketplace where you can connect with 1000s of sellers across different categories for your business and personal needs.',
        imageSrc: connect,
    },
    {
        name: 'Get your products',
        description: "Get quotes from multiple sellers, seal your deal and vola!. Get your products delivered at your doorsteps.",
        imageSrc: cart,
    },
]
</script>