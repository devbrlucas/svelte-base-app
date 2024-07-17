import { currentUser as store, type UserData, INITIAL_DATA, proxyUser } from "./store";
const APP_CURRENT_USER_KEY = 'app:current_user';
function getUser(): SvelteBaseApp.CurrentUser
function getUser<T extends keyof SvelteBaseApp.CurrentUser>(key: T): SvelteBaseApp.CurrentUser[T]
function getUser(key?: keyof SvelteBaseApp.CurrentUser): SvelteBaseApp.CurrentUser | SvelteBaseApp.CurrentUser[keyof SvelteBaseApp.CurrentUser]
{
    const json = window.localStorage.getItem(APP_CURRENT_USER_KEY);
    const user: UserData = json ? proxyUser(JSON.parse(json)) : proxyUser(INITIAL_DATA);
    return key ? user[key] : user;
}
function setUser(user: UserData): void
{
    cleanUser();
    window.localStorage.setItem(APP_CURRENT_USER_KEY, JSON.stringify(user));
    store.set(proxyUser(user));
}
function updateUser(user: Omit<UserData, 'access_token'>): void
{
    const json = window.localStorage.getItem(APP_CURRENT_USER_KEY);
    const currentUser: UserData = json ? JSON.parse(json) : proxyUser(INITIAL_DATA);
    const data = {
        ...user,
        access_token: currentUser.access_token,
    }
    window.localStorage.setItem(APP_CURRENT_USER_KEY, JSON.stringify(data));
    store.set(proxyUser(data));
}
function cleanUser(): void
{
    window.localStorage.removeItem(APP_CURRENT_USER_KEY);
    store.set(INITIAL_DATA);
}
export const user = {
    get: getUser,
    set: setUser,
    clean: cleanUser,
    update: updateUser,
}
