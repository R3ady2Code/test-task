<script setup lang="ts">
import AccountItem from "./Item.vue";
import { storeToRefs } from "pinia";
import { useAccountsStore } from "../../stores/accounts.ts";

const accountsStore = useAccountsStore();

const { accounts } = storeToRefs(accountsStore);
</script>

<template>
    <AccountItem v-for="account in accounts" :key="account.id" :account="account" />
</template>
