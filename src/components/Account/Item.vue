<template>
    <div class="account-item flex items-end gap-4 p-6 bg-white rounded-lg shadow-lg">
        <Input
            v-model="accountValues.mark"
            label="Метка"
            type="text"
            placeholder="Введите метку"
            :error="v$.mark.$error"
            @blur="update('mark')"
        />
        <Select
            v-model="accountValues.type"
            label="Тип записи"
            :options="['LDAP', 'Local']"
            @update:modelValue="update('type')"
        />
        <Input
            v-model="accountValues.login"
            label="Логин"
            type="text"
            placeholder="Введите логин"
            :error="v$.login.$error"
            @blur="update('login')"
        />
        <Input
            v-if="accountValues.type === 'Local'"
            v-model="accountValues.password"
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            :error="v$.password.$error"
            @blur="update('password')"
        />
        <button class="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 ml-auto" @click="removeAccount">
            Удалить
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
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

const accountValues = reactive({
    id: account.id,
    login: account.login,
    password: account.password || "",
    mark: account.mark ? account.mark.map((item) => item.text).join(";") : "",
    type: account.type
});

const markFormatter = (mark: string): { text: string }[] => mark.split(";").map((item) => ({ text: item }));

const rules = computed(() => ({
    password: accountValues.type === "Local" ? { required, maxLength: maxLength(50) } : {},
    login: { required, maxLength: maxLength(50) },
    mark: { maxLength: maxLength(50) },
    type: { required }
}));

const v$ = useVuelidate(rules, accountValues);

const update = (property: string) => {
    v$.value[property].$touch();
    if (!v$.value.$invalid) {
        const newAccount = {
            ...accountValues,
            password: accountValues.type === "Local" ? accountValues.password : null,
            mark: markFormatter(accountValues.mark)
        };
        accountsStore.updateAccount(newAccount);
    }
};

const removeAccount = () => {
    accountsStore.deleteAccount(account.id);
};
</script>
