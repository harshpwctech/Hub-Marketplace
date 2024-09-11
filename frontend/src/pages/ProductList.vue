<template>
    <NavBar />
    <div class="mx-auto max-w-7xl overflow-hidden px-4 pt-8 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ categoryName }}</h2>
    </div>
    <ProductFilters :categoryName="categoryName" :subCategoryName="subCategoryName"/>
    <Footer />
</template>
  
<script setup>
import NavBar from '../components/NavBar.vue';
import ProductFilters from '../components/ProductFilters.vue';
import Footer from '../components/Footer.vue';

const props = defineProps({
    categoryName: {
        type: String,
        required: true
    },
    subCategoryName: {
        type: String,
        required: false
    }
});

const categoryName = props.categoryName
const subCategoryName = props.subCategoryName

</script>
  
  