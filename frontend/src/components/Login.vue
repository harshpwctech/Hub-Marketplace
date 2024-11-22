<template>
    <Dialog v-model="eventBus.loginOpen" :options="{ size: 'md' }">
        <template #body-title>
            <h3 class="text-lg font-medium text-gray-900">Login</h3>
        </template>
        <template #body-content>
            <div class="space-y-4">
                <TextInput v-model="email" type="email" label="Email" size="sm" placeholder="Email" />
                <TextInput v-model="password" type="password" label="Password" size="sm"
                    placeholder="Password" />
                <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
            </div>
        </template>
        <template #actions>
            <Button @click="submitLogin" variant="solid">Login</Button>
            <Button class="ml-2" @click="closeDialog" variant="outline">Cancel</Button>
        </template>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { Button, TextInput, Dialog } from 'frappe-ui';
import { eventBus } from '../eventBus'
import { sessionStore } from '@/services/session'

// Reactive variables for login form
const email = ref('');
const password = ref('');
const errorMessage = ref('');

// Access the login function from session store
const { login } = sessionStore();

// Function to close the dialog
const closeDialog = () => {
    eventBus.loginOpen = false; // Close dialog by setting eventBus state
    email.value = '';
    password.value = '';
    errorMessage.value = '';
};

// Function to handle login
const submitLogin = async () => {
    errorMessage.value = ''; // Reset error message
    if (!email.value || !password.value) {
        errorMessage.value = 'Please fill in all fields.';
        return;
    }

    try {
        await login.fetch({ usr: email.value, pwd: password.value });
        closeDialog(); // Close dialog on success
    } catch (error) {
        errorMessage.value = error.message || 'Login failed. Please try again.';
    }
};
</script>