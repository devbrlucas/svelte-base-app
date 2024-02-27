declare global {
    namespace SvelteBaseApp {
        interface CurrentUser {
            access_token: string;
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
export { UserNotFoundError } from "./user_not_found_error";
export { default as PasswordResetComponent } from "./password-reset.svelte";
export * from "./store";
export * from "./user";
