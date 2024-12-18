<template>
    <NavBar />
    <ProductDetails :productName="productName"/>
    <section aria-labelledby="reviews-heading" class="mx-auto max-w-7xl overflow-hidden">
        <!-- <h2 id="reviews-heading" class="text-lg font-medium text-gray-900 sm:px-6 lg:px-8">Recent reviews</h2> -->
        <ProductReview :productName="productName"/>
    </section>
    <div v-if="relatedItems.length">
      <section aria-labelledby="related-heading" class="mx-auto max-w-7xl overflow-hidden">
          <h2 id="related-heading" class="text-lg font-medium text-gray-900 sm:px-6 lg:px-8">Customers also purchased</h2>
          <ProductsGrid :products="relatedItems"/>
      </section>
    </div>
    <Footer />
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue';
import ProductDetails from '../components/ProductDetails.vue';
import ProductReview from '../components/ProductReview.vue';
import ProductsGrid from '../components/ProductsGrid.vue';
import Footer from '../components/Footer.vue';
import { internalServices } from '../services/internalServices'

const props = defineProps({
    productName: {
        type: String,
        required: true
    }
});
onMounted(() => {
    fetchRelatedItems()
});
const useInternalServices = internalServices();
const productName = props.productName;
const relatedItems = ref([]);
const fetchRelatedItems = async () => {
  try {
    const data = await useInternalServices.getRelatedItems.fetch({
      "item_name": props.productName
    });
    relatedItems.value = data
    console.log("-------------", relatedItems.value)
    // isLoading.value = false
  } catch (error) {
    console.error(`Failed to fetch related products for ${props.productName}:`, error);
  }

};


</script>
  
  