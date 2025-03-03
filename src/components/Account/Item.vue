<template>
    <div class="account-item">
        <Input
            v-model="account.mark"
            label="Метка"
            placeholder="Введите метку"
            @update:modelValue="update"
            type="text"
        />
        <Select v-model="account.type" label="Тип записи" :options="['LDAP', 'Local']" @update:modelValue="update" />
        <Input
            v-model="account.login"
            label="Логин"
            type="text"
            placeholder="Введите логин"
            :touched="touched.login"
            @update:modelValue="update"
        />
        <Input
            v-if="account.type === 'Local'"
            v-model="account.password"
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            :touched="touched.password"
            @update:modelValue="update"
        />
        <button @click="removeAccount">Удалить</button>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { useAccountsStore } from "../../stores/accounts";
import Input from "../UI/Input.vue";
import Select from "../UI/Select.vue";
import type { IAccount } from "../../types.ts";

const props = defineProps<{
    account: IAccount;
}>();

const accountsStore = useAccountsStore();

const touched: boolean = ref({ login: false, password: false });

const update = () => {
    accountsStore.updateAccount(props.account);
};

const removeAccount = () => {
    accountsStore.deleteAccount(props.account.id);
};

watch(
    () => props.account,
    () => {
        accountsStore.updateAccount(props.account);
    },
    { deep: true }
);
</script>
