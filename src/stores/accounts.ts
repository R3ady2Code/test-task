import { defineStore } from "pinia";
import { ref } from "vue";
import type { IAccount } from "../types";

export const useAccountsStore = defineStore("accounts", () => {
    const accounts = ref<IAccount[]>([{ id: 1, login: "login", password: "2312312", type: "Local", mark: "mark" }]);

    const createNewAccount = () => {
        const newAccount: IAccount = {
            id: Date.now(),
            login: "",
            password: "",
            type: "Local",
            mark: ""
        };
        accounts.value.push(newAccount);
    };

    const updateAccount = (id: number, updatedData: Partial<IAccount>) => {
        const index = accounts.value.findIndex((acc) => acc.id === id);
        if (index !== -1) {
            accounts.value[index] = { ...accounts.value[index], ...updatedData };
        }
    };

    const deleteAccount = (id: number) => {
        accounts.value = accounts.value.filter((acc) => acc.id !== id);
        console.log(accounts.value);
    };

    return {
        accounts,
        createNewAccount,
        updateAccount,
        deleteAccount
    };
});
