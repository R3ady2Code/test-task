export interface IAccount {
    id: number;
    type: "LDAP" | "Local";
    login: string;
    password: string | null;
    mark?: string;
}
