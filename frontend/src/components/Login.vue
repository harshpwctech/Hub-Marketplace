<!-- Not used -->
<template>
    <Dialog v-model="eventBus.loginOpen" :options="{ size: 'md' }" :disableOutsideClickToClose="true"
        :initialFocus="emailInputRef" @close="closeDialog()">
        <template #body-title>
            <div v-if="registerUser">
                <h3 class="text-lg font-medium text-gray-900">Register</h3>
            </div>
            <div v-else-if="forgotPassword">
                <h3 class="text-lg font-medium text-gray-900">Reset Password</h3>
            </div>
            <div v-else>
                <h3 class="text-lg font-medium text-gray-900">Login</h3>
            </div>
        </template>
        <template #body-content>
            <div class="space-y-4" ref="emailInputRef">
                <div v-if="showEmailLogin">
                    <div>
                        <FormControl v-model="email" variant="subtle" size="md" :type="(email || '').toLowerCase() === 'administrator'
                            ? 'text'
                            : 'email'
                            " label="Email" placeholder="john.doe@example.com"
                            :disabled="login.loading" />
                    </div>
                    <div class="mt-4">
                        <FormControl v-model="password" variant="subtle" size="md" label="Password" placeholder="••••••"
                            type="password" :disabled="login.loading" />
                            <button class="text-sm text-gray-600 ml-auto block mt-2"
                                @click="() => { forgotPassword = true; showEmailLogin = false }">
                                Forgot Password ?
                            </button>
                    </div>
                    <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
                    <div class="mt-8">
                        <Button @click="submitLogin" variant="solid" class="w-full" :loading="login.loading">Login</Button>
                    </div>
                    <button class="mt-2 w-full py-2 text-base text-gray-700"
                            @click=" () => {{ registerUser = true; showEmailLogin = false; errorMessage = '' }}">
                            Don't have and account? Signup
                    </button>
                    <div v-if="authProviders.length" class="mt-2">
                        <p class="text-center text-base text-gray-500">or</p>
                        <Button variant="outline" class="mt-4 w-full py-2 text-base text-gray-700"
                            @click="showEmailLogin = false">
                            Login using other methods
                        </Button>
                    </div>
                </div>
                <div v-if="!showEmailLogin && !forgotPassword && !registerUser" class="mx-auto space-y-4">
                    <Button v-for="provider in authProviders" :key="provider.name"
                        variant="solid" class="w-full"
                        :link="provider.auth_url">
                        Login via {{ provider.provider_name }}
                    </Button>
                    <p class="text-center text-base text-gray-500">or</p>
                    <Button variant="outline" class="w-full" @click="showEmailLogin = true">
                        Login via email
                    </Button>
                </div>
                <div v-if="forgotPassword">
                    <div>
                        <FormControl v-model="email" variant="subtle" size="md" :type="(email || '').toLowerCase() === 'administrator'
                            ? 'text'
                            : 'email'
                            " label="Email" placeholder="john.doe@example.com"
                            :disabled="login.loading" />
                    </div>
                    <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
                    <div class="mt-8">
                        <Button @click="submitLogin" variant="solid" class="w-full" :loading="login.loading">Reset Password</Button>
                    </div>
                    <button class="mt-4 w-full py-2 text-base text-gray-600"
                    @click="() => { forgotPassword = false; showEmailLogin = true; errorMessage = '' }">
                        Back to Login
                    </button>
                </div>
                <div v-if="registerUser">
                    <div>
                        <FormControl v-model="email" variant="subtle" size="md" :type="(email || '').toLowerCase() === 'administrator'
                            ? 'text'
                            : 'email'
                            " label="Email" placeholder="john.doe@example.com"
                            :disabled="login.loading" />
                    </div>
                    <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
                    <div class="mt-8">
                        <Button @click="submitLogin" variant="solid" class="w-full" :loading="login.loading">Register</Button>
                    </div>
                    <button class="mt-4 w-full py-2 text-base text-gray-600"
                    @click=" () => {{ registerUser = false; showEmailLogin = true; errorMessage = '' }}">
                        Have an account? Login
                    </button>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Button, FormControl, Dialog } from 'frappe-ui';
import { eventBus } from '../eventBus';
import { sessionStore } from '@/services/session';
import { internalServices } from '../services/internalServices'

// Reactive variables for login form
const emailInputRef = ref(null);
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const forgotPassword = ref(false)
const registerUser = ref(false)
const useInternalServices = internalServices();
const { login } = sessionStore();
const authProviders = ref([
{ name: 'google', provider_name: 'Google', auth_url: 'https://google.com' },
// { name: 'facebook', provider_name: 'Facebook', auth_url: '/auth/facebook' }
])
const showEmailLogin = ref(authProviders.value.length === 0);

// onMounted(() => {
//   fetchOAuthProviders();
// });

// Function to close the dialog
const closeDialog = () => {
    eventBus.loginOpen = false;
    email.value = '';
    password.value = '';
    errorMessage.value = '';
    if (authProviders.value.length === 0) {
        showEmailLogin.value = true;
    } else {
        showEmailLogin.value = false;
    }
    forgotPassword.value = false;
    registerUser.value = false;
};
const fetchOAuthProviders = async () => {
    const data = await useInternalServices.oAuthProviders.fetch()
    authProviders.value = data
} 
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