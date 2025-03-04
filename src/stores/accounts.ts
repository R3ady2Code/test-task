import { defineStore } from "pinia";
import { ref } from "vue";
import type { IAccount } from "../types";

export const useAccountsStore = defineStore("accounts", () => {
    const accounts = ref<IAccount[]>([
        { id: 1, login: "login", password: "2312312", type: "Local", mark: [{ text: "mark" }] }
    ]);

    const createNewAccount = () => {
        const newAccount: IAccount = {
            id: Date.now(),
            login: "",
            password: "",
            type: "Local",
            mark: [{ text: "" }]
        };
        accounts.value.push(newAccount);
    };

    const updateAccount = (updatedData: Partial<IAccount>) => {
        const index = accounts.value.findIndex((acc) => acc.id === updatedData.id);
        if (index !== -1) {
            accounts.value[index] = { ...accounts.value[index], ...updatedData };
        }
    };

    const deleteAccount = (id: number) => {
        accounts.value = accounts.value.filter((acc) => acc.id !== id);
    };

    return {
        accounts,
        createNewAccount,
        updateAccount,
        deleteAccount
    };
});
