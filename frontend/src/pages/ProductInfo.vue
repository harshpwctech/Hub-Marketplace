<template>
    <NavBar />
    <ProductDetails :productName="productName"/>
    <section aria-labelledby="reviews-heading" class="mx-auto max-w-7xl overflow-hidden">
        <h2 id="reviews-heading" class="text-lg font-medium text-gray-900 sm:px-6 lg:px-8">Recent reviews</h2>
        <ProductReview />
    </section>
    <section aria-labelledby="related-heading" class="mx-auto max-w-7xl overflow-hidden">
        <h2 id="related-heading" class="text-lg font-medium text-gray-900 sm:px-6 lg:px-8">Customers also purchased</h2>
        <ProductsGrid :products="relatedProducts"/>
    </section>
    <Footer />
</template>
  
<script setup>
import NavBar from '../components/NavBar.vue';
import ProductDetails from '../components/ProductDetails.vue';
import ProductReview from '../components/ProductReview.vue';
import ProductsGrid from '../components/ProductsGrid.vue';
import Footer from '../components/Footer.vue';

const props = defineProps({
    productName: {
        type: String,
        required: true
    }
});
const productName = props.productName
//TODO: API to get related products
//TODO: API to get product review and send the same to ProductReview component
const relatedProducts = [
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

</script>
  
  