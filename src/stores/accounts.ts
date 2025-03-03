import { defineStore } from "pinia";
import { ref } from "vue";
import type { IAccount } from "../types";

export const useAccountsStore = defineStore("accounts", () => {
    const accounts = ref<IAccount[]>([]);

    const addAccount = (account: Omit<IAccount, "id">) => {
        const newAccount: IAccount = { id: Date.now(), ...account };
        accounts.value.push(newAccount);
    };

    const getAccountById = (id: number): IAccount | undefined => {
        return accounts.value.find((acc) => acc.id === id);
    };

    const updateAccount = (id: number, updatedData: Partial<IAccount>) => {
        const index = accounts.value.findIndex((acc) => acc.id === id);
        if (index !== -1) {
            accounts.value[index] = { ...accounts.value[index], ...updatedData };
        }
    };

    const deleteAccount = (id: number) => {
        accounts.value = accounts.value.filter((acc) => acc.id !== id);
    };

    const validateAccount = (account: IAccount): Boolean => {
        return true;
    };

    return {
        accounts,
        addAccount,
        getAccountById,
        updateAccount,
        deleteAccount
    };
});
