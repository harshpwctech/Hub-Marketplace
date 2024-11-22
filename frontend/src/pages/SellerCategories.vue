<template #node="{ node, hasChildren, isCollapsed, toggleCollapsed }">
    <NavBar />
    <div class="mx-auto max-w-7xl overflow-hidden px-4 pt-8 sm:px-6 lg:px-8">
        <Tree :options="{
            showIndentationGuides: state.showIndentationGuides,
            rowHeight: state.rowHeight,
            indentWidth: state.indentWidth,
        }" nodeKey="name" :node="state.node" />
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Tree } from 'frappe-ui'
import NavBar from '../components/NavBar.vue';

const isCollapsed = ref(false)
const state = reactive({
    showIndentationGuides: true,
    rowHeight: '25px',
    indentWidth: '15px',
    node: {
        name: 'categories',
        label: 'Categories',
        isCollapsed: false,
        children: [
            {
                name: 'downloads',
                label: 'Downloads',
                children: [
                    {
                        name: 'download.zip',
                        label: 'download.zip',
                        children: [
                            {
                                name: 'image.png',
                                label: 'image.png',
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                name: 'documents',
                label: 'Documents',
                children: [
                    {
                        name: 'somefile.txt',
                        label: 'somefile.txt',
                        children: [],
                    },
                    {
                        name: 'somefile.pdf',
                        label: 'somefile.pdf',
                        children: [],
                    },
                ],
            },
        ],
    },
})
</script>