declare global {
    interface CurrentUser {
        access_token: string;
        user: {
            name: string;
            email: string;
            image: string | null;
        };
        type: string;
    }
    type CurrentUserUpdate = Omit<CurrentUser, 'access_token'>;
}
export type AuthResponse<U, T> = {
    access_token: string;
    user: U;
    type: T;
};
export type AuthData = {
    email: string;
    password: string;
    remember: boolean;
};
export { default as AuthComponent } from "./component.svelte";
export * from "./store";
export * from "./user";
