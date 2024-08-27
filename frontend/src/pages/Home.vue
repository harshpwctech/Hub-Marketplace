<template>
  <NavBar />
  <div v-for="(products, category, index) in productList" :key="category">
    <div class="mx-auto max-w-7xl overflow-hidden py-8 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ category }}</h2>
        <button @click="navigateToProductList(category)"
          class="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
          View All
          <span aria-hidden="true"> &rarr;</span>
        </button>
      </div>
    </div>
    <ProductsGrid :products="products" />
    <div class="mx-auto max-w-7xl overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-bold tracking-tight text-gray-900">Top {{ category }} Sellers</h2>
    </div>
    <SellersGrid />
    <HubPromo v-if="index === 3" />
  </div>
  <Footer />
</template>

<script setup>
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue';
import ProductsGrid from '../components/ProductsGrid.vue';
import SellersGrid from '../components/SellersGrid.vue';
import HubPromo from '../components/HubPromo.vue';
import Footer from '../components/Footer.vue';

const router = useRouter()
function navigateToProductList(categoryName) {
  router.push({ name: 'ProductList', params: { categoryName } });
}

const productList = {
  "Home Decor": [
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
  ],
  "Kitchen Applicances": [
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
  ],
  "Electronics": [
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
  ],
  "Fashion": [
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
}
</script>

