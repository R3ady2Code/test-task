<script setup lang="ts">
import AccountList from "./components/Account/List.vue";
import { useAccountsStore } from "./stores/accounts.ts";

const accountsStore = useAccountsStore();

const { createNewAccount } = useAccountsStore();
</script>

<template>
    <button @click="createNewAccount">+</button>
    <AccountList />
</template>
