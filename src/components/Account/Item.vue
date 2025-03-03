<template>
    <div class="account-item flex items-end gap-4 p-6 bg-white rounded-lg shadow-lg">
        <Input
            v-model="account.mark"
            label="Метка"
            type="text"
            placeholder="Введите метку"
            :error="v$.mark.$error"
            @update:modelValue="update"
            @blur="v$.mark.$touch()"
        />
        <Select v-model="account.type" label="Тип записи" :options="['LDAP', 'Local']" @update:modelValue="update" />
        <Input
            v-model="account.login"
            label="Логин"
            type="text"
            placeholder="Введите логин"
            :error="v$.login.$error"
            @update:modelValue="update"
            @blur="v$.login.$touch()"
        />
        <Input
            v-if="account.type === 'Local'"
            v-model="account.password"
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            :error="v$.password.$error"
            @update:modelValue="update"
            @blur="v$.password.$touch()"
        />
        <button class="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 ml-auto" @click="removeAccount">
            Удалить
        </button>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from "vue";
import { useAccountsStore } from "../../stores/accounts";
import useVuelidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";

import Input from "../UI/Input.vue";
import Select from "../UI/Select.vue";
import type { IAccount } from "../../types.ts";

const { account } = defineProps<{
    account: IAccount;
}>();

const accountsStore = useAccountsStore();

const rules = computed(() => ({
    password: account.type === "Local" ? { required, maxLength: maxLength(50) } : {},
    login: { required, maxLength: maxLength(50) },
    mark: { maxLength: maxLength(50) }
}));

const v$ = useVuelidate(rules, account);

const update = () => {
    if (!v$.$error) accountsStore.updateAccount(account);
};

const removeAccount = () => {
    accountsStore.deleteAccount(account.id);
};

const handleBlur = () => {};

watch(
    () => account,
    () => {
        update;
    },
    { deep: true }
);
</script>
