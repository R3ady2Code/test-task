<template>
    <div class="account-item">
        <div class="input-group">
            <label>Метка</label>
            <input v-model="account.label" type="text" placeholder="Введите метку" @blur="validateAccount(index)" />
        </div>

        <div class="input-group">
            <label>Тип записи</label>
            <select v-model="account.recordType" @change="validateAccount(index)">
                <option value="LDAP">LDAP</option>
                <option value="Local">Локальная</option>
            </select>
        </div>

        <div class="input-group">
            <label>Логин</label>
            <input
                v-model="account.login"
                type="text"
                placeholder="Введите логин"
                @blur="validateAccount(index)"
                :class="{ invalid: !account.login && account.loginTouched }"
            />
        </div>

        <div v-if="account.recordType === 'Local'" class="input-group">
            <label>Пароль</label>
            <input
                v-model="account.password"
                type="password"
                placeholder="Введите пароль"
                @blur="validateAccount(index)"
                :class="{ invalid: !account.password && account.passwordTouched }"
            />
        </div>

        <button @click="removeAccount(index)">Удалить</button>
    </div>
    ;
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAccountsStore, Account } from "@/stores/useAccountsStore";

export default defineComponent({
    setup() {
        const accountsStore = useAccountsStore();
        const accounts = ref(accountsStore.accounts);

        const removeAccount = (id: number) => {
            accountsStore.removeAccount(index);
        };

        const validateAccount = (id: number) => {
            const account = accounts.value[index];

            account.loginTouched = true;
            account.passwordTouched = true;

            if (account.recordType === "Local" && !account.password) {
                account.passwordTouched = false;
            }

            if (!account.login) {
                account.loginTouched = false;
            }

            if (account.login && (account.recordType === "LDAP" || account.password)) {
                accountsStore.updateAccount(index, { ...account });
            }
        };

        return {
            accounts,
            addAccount,
            removeAccount,
            validateAccount
        };
    }
});
</script>
