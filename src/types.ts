export interface IAccount {
    id: number;
    type: "LDAP" | "local";
    login: string;
    password: string | null;
    mark?: string;
}
