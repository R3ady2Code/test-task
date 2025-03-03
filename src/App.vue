<script setup lang="ts">
import AccountList from "./components/Account/List.vue";
import { useAccountsStore } from "./stores/accounts.ts";

const accountsStore = useAccountsStore();

const { createNewAccount } = useAccountsStore();
</script>

<template>
    <div class="container mx-auto p-6 space-y-4">
        <button
            @click="createNewAccount"
            class="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
            +
        </button>

        <AccountList />
    </div>
</template>

<style scoped>
.container {
    max-width: 1200px;
}
</style>
