declare global {
    namespace SvelteBaseApp {
        interface CurrentUser {
            access_token: string;
            current?: any;
        }
    }
} 
export type AuthResponse<U, T> = {
    access_token: string;
    user: U;
    type: T;
}
export type AuthData = {
    email: string;
    password: string;
    remember: boolean;
}
export { default as AuthComponent } from "./component.svelte";
export { default as PasswordResetComponent } from "./password-reset.svelte";
export * from "./store";
export * from "./user";
