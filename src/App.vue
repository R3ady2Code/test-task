<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useAccountsStore, Account } from '@/stores/useAccountsStore';

import Form from "./components/Form.vue";
import AccountItem from './components.AccountItem'


export default defineComponent({
  setup() {
    const accountsStore = useAccountsStore();
    const accounts = ref(accountsStore.accounts);

    const addAccount = () => {
      accountsStore.addAccount();
    };

    const removeAccount = (index: number) => {
      accountsStore.removeAccount(index);
    };

    const validateAccount = (index: number) => {
      const account = accounts.value[index];

      account.loginTouched = true;
      account.passwordTouched = true;

      if (account.recordType === 'Local' && !account.password) {
        account.passwordTouched = false;
      }

      if (!account.login) {
        account.loginTouched = false;
      }

      if (account.login && (account.recordType === 'LDAP' || account.password)) {
        accountsStore.updateAccount(index, { ...account });
      }
    };

    return {
      accounts,
      addAccount,
      removeAccount,
      validateAccount,
    };
  },
});
</script>
</script>

<template>
    <Form />
    <AccountItem />
</template>
