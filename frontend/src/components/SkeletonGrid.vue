<template>
    <div class="bg-white">
        <div class="mx-auto max-w-7xl overflow-hidden py-8 sm:px-6 lg:px-8">
            <h2 class="sr-only">Products</h2>
            <!-- Skeleton Loader -->
            <div class="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                <div v-for="n in 8" :key="n"
                    class="group relative border-b border-r border-gray-200 p-4 sm:p-6 animate-pulse">
                    <div class="flex justify-center items-center">
                        <div
                            class="overflow-hidden rounded-lg bg-gray-200 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64">
                        </div>
                    </div>
                    <div class="pb-4 pt-10 text-center flex flex-col justify-between">
                        <h3 class="text-sm font-medium text-gray-300 flex-1 flex items-center justify-center">
                            <span class="block bg-gray-200 h-4 w-24 rounded"></span>
                        </h3>
                        <div class="mt-3 flex flex-col items-center px-4 flex-1">
                            <span class="block bg-gray-200 h-3 w-32 rounded mt-1"></span>
                            <div class="flex mt-2 items-center">
                                <span class="bg-gray-200 h-5 w-5 rounded-full"></span>
                                <span class="bg-gray-200 h-5 w-5 rounded-full ml-1"></span>
                                <span class="bg-gray-200 h-5 w-5 rounded-full ml-1"></span>
                                <span class="bg-gray-200 h-5 w-5 rounded-full ml-1"></span>
                                <span class="bg-gray-200 h-5 w-5 rounded-full ml-1"></span>
                            </div>
                        </div>
                        <span class="block bg-gray-200 h-4 w-20 mt-4 rounded"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
</script>