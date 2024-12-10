<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-16">
      <div class="lg:col-span-4">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customer Reviews</h2>
        <div v-if="!isLoading">
          <div v-if="hasReviews">
            <div class="mt-3 flex items-center">
              <div>
                <div class="flex items-center">
                  <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[reviews.average > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
                </div>
                <p class="sr-only">{{ reviews.average }} out of 5 stars</p>
              </div>
              <p class="ml-2 text-sm text-gray-900">Based on {{ reviews.totalCount }} ratings</p>
            </div>

            <div class="mt-6">
              <h3 class="sr-only">Review data</h3>

              <dl class="space-y-3">
                <div v-for="count in reviews.counts" :key="count.rating" class="flex items-center text-sm">
                  <dt class="flex flex-1 items-center">
                    <p class="w-3 font-medium text-gray-900">{{ count.rating }}<span class="sr-only"> star reviews</span></p>
                    <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                      <StarIcon :class="[count.count > 0 ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />

                      <div class="relative ml-3 flex-1">
                        <div class="h-3 rounded-full border border-gray-200 bg-gray-100" />
                        <div v-if="count.count > 0" class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400" :style="{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }" />
                      </div>
                    </div>
                  </dt>
                  <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">{{ Math.round((count.count / reviews.totalCount) * 100) }}%</dd>
                </div>
              </dl>
            </div>
          </div>
          <div v-else>
            <div class="mt-3 flex items-center">
              <div>
                <div class="flex items-center">
                  <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="`empty-rating-${rating}`"
                    class="text-gray-300 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                </div>
                <p class="sr-only">0 out of 5 stars</p>
              </div>
              <p class="ml-2 text-sm text-gray-900">Based on 0 ratings</p>
            </div>
            <p class="mt-3 text-md text-gray-600">No reviews available for this product yet.</p>
          </div>
        </div>

        <div class="mt-10">
          <h3 class="text-lg font-medium text-gray-900">Share your thoughts</h3>
          <p class="mt-1 text-sm text-gray-600">If you’ve used this product, share your thoughts with other customers</p>
          <button @click="handleWriteReview" class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full">Write a review</button>
        </div>
      </div>
      <div class="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
        <h3 class="sr-only">Recent reviews</h3>
        <div v-if="hasFeaturedReviews">

          <div class="flow-root">
            <div class="-my-12 divide-y divide-gray-200">
              <div v-for="review in reviews.featured" :key="review.id" class="py-12">
                <div class="flex items-center">
                  <div class="ml-0">
                    <h4 class="text-sm font-bold text-gray-900">{{ review.author }}</h4>
                    <div class="mt-1 flex items-center">
                      <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[review.rating > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
                    </div>
                    <p class="sr-only">{{ review.rating }} out of 5 stars</p>
                  </div>
                </div>

                <div class="mt-4 space-y-6 text-base italic text-gray-600" v-html="review.content" />
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-md text-gray-600">No recent review written by customers.</p>
        </div>

      </div>
    </div>
  </div>
  <Dialog v-model="isDialogVisible" :options="{size: 'xl'}" @close="closeDialog()">
    <template #body-title>
      <h3 class="text-lg font-medium text-gray-900">Write Your Review</h3>
    </template>
    <template #body-content>
      <div class="mb-8">
        <Rating
          v-model="userReviewRating"
          :rating_from="5" 
          size="lg"
        />
      </div>  
        <Textarea
          v-model="userReviewContent"
          size="md"
          placeholder="Write your review here..."
          class="w-full"
          :rows="8"
        ></Textarea>
    </template>
    <template #actions>
      <Button @click="submitReview" variant="solid">Submit Review</Button>
      <Button class="ml-2" @click="closeDialog" variant="outline">Cancel</Button>
    </template>
  </Dialog>
  <Login />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Dialog, Textarea, Rating } from 'frappe-ui';
import { StarIcon } from '@heroicons/vue/20/solid';
import { internalServices } from '../services/internalServices'
import { sessionStore } from '@/services/session'
import { eventBus } from '../eventBus'
import Login from '../components/Login.vue';

const props = defineProps({
  productName: {
    type: String,
    required: true
  }
});
const isDialogVisible = ref(false);
const isLoading = ref(true);
const hasReviews = ref(false);
const hasFeaturedReviews = ref(false);
const hasUserReview = ref(false);
const userReviewDoc = ref(false);
const userReviewContent = ref('');
const userReviewRating = ref(0);
const reviews = ref({});
const useInternalServices = internalServices();
const session = sessionStore();

const fetchReviews = async () => {
  try {
    const itemReviews = await useInternalServices.getReviews.fetch({
      "item_name": props.productName
    });
    reviews.value = itemReviews;
    hasReviews.value = itemReviews.totalCount > 0;
    hasFeaturedReviews.value = itemReviews.featured && itemReviews.featured.length > 0;
    isLoading.value = false
  } catch (error) {
    console.error(`Failed to fetch reviews:`, error);
  }
};

const fetchUserReview = async () => {
  if (!session.isLoggedIn) {
    return
  }
  try {
    const { user } = sessionStore();
    let data = {
      "doctype": "Hub Item Review",
      "filters": {
        "hub_item": props.productName,
        "user": user,
      }
    }
    const userReview = await useInternalServices.getDoc.fetch(data);
    if (userReview) {
      hasUserReview.value = true;
      userReviewDoc.value = userReview.name;
      userReviewContent.value = userReview.review;
      userReviewRating.value = userReview.rating

    }
  } catch (error) {
    return
  }

}

const handleWriteReview = () => {
  if (!session.isLoggedIn) {
    eventBus.loginOpen = true;
    return
  }
  if (!hasUserReview.value) {
    userReviewContent.value = '';
    userReviewRating.value = 0;
  }

  isDialogVisible.value = true;
};

const closeDialog = () => {
  isDialogVisible.value = false;
};

const submitReview = async () => {
  if (!userReviewContent.value.trim()) {
    alert('Please write something in your review.');
    return;
  }

  try {
    const { user } = sessionStore();
    if (!hasUserReview.value){
      let data = {
        "doctype": "Hub Item Review",
        "hub_item": props.productName,
        "user": user,
        "rating": userReviewRating.value,
        "review": userReviewContent.value
      }
      await useInternalServices.addDoc.fetch({doc: data});
      hasUserReview.value = true
    } else {
      let userReview = useInternalServices.documentResource({"doctype": "Hub Item Review", "name": userReviewDoc.value})
      await userReview.update({"rating": userReviewRating.value, "review": userReviewContent.value})
    }
    alert('Review submitted successfully!');
    closeDialog();
  } catch (error) {
    console.error('Failed to submit review:', error);
    alert('There was an error submitting your review. Please try again.');
  }
};
onMounted(() => {
  fetchReviews();
  fetchUserReview();
});
watch(
    () => session.isLoggedIn,
    (newValue) => {
        if (newValue) {
          fetchUserReview();
        } else {
            hasUserReview.value = false;
        }
    }
);

</script>