<template>
    <NavBar />
    <div class="mx-auto max-w-7xl overflow-hidden px-4 pt-10 sm:px-6 lg:px-8">
        <div class="flex items-center space-x-6">
            <!-- Seller Logo -->
            <div class="border border-gray-300 rounded-full w-20 h-20 bg-white">
                <img :src="seller.logo" :alt="seller.name" class="object-contain w-full h-full" loading="lazy" />
            </div>
            <!-- Seller Name -->
            <div>
                <h2 class="text-2xl font-bold">{{ seller.name }}</h2>
                <p>Mumbai, India</p>
            </div>
        </div>
    </div>
    <ProductFilters :products="products" :sort-options="sortOptions" :subCategories="subCategories" :filters="filters" />
    <Footer />
</template>
  
<script setup>
import NavBar from '../components/NavBar.vue';
import ProductFilters from '../components/ProductFilters.vue';
import Footer from '../components/Footer.vue';

const props = defineProps({
    seller: {
        type: String,
        required: true
    }
});
const seller = { id: 1, name: "Croma", logo: "https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/65afa4d2b198629decb56db8/croma-tata-product_logo_1-01-150x150.jpg" }
const products = [
    {
        id: 1,
        name: 'Organize Basic Set (Walnut)',
        seller: 'Emporio Interiors',
        price: '$149',
        rating: 5,
        reviewCount: 38,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 2,
        name: 'Organize Pen Holder',
        seller: 'Emporio Interiors',
        price: '$15',
        rating: 5,
        reviewCount: 18,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 3,
        name: 'Organize Sticky Note Holder',
        seller: 'Emporio Interiors',
        price: '$15',
        rating: 5,
        reviewCount: 14,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 4,
        name: 'Organize Phone Holder',
        seller: 'Emporio Interiors',
        price: '$15',
        rating: 4,
        reviewCount: 21,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg',
        imageAlt: 'TODO',
        href: '#',
    }
]
const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'New Arrivals', checked: false },
            { value: 'sale', label: 'Sale', checked: false },
            { value: 'travel', label: 'Travel', checked: true },
            { value: 'organization', label: 'Organization', checked: false },
            { value: 'accessories', label: 'Accessories', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
]

</script>
  
  