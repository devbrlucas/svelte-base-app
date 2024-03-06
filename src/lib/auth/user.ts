import { UserNotFoundError } from "./user_not_found_error";
import { currentUser as store, INITIAL_DATA } from "./store";
const APP_CURRENT_USER_KEY = 'app:current_user';
function getUser(): SvelteBaseApp.CurrentUser
function getUser<T extends keyof SvelteBaseApp.CurrentUser>(key: T): SvelteBaseApp.CurrentUser[T]
function getUser(key?: keyof SvelteBaseApp.CurrentUser): SvelteBaseApp.CurrentUser | SvelteBaseApp.CurrentUser[keyof SvelteBaseApp.CurrentUser]
{
    const json = window.localStorage.getItem(APP_CURRENT_USER_KEY);
    if (!json) throw new UserNotFoundError;
    const user: SvelteBaseApp.CurrentUser = JSON.parse(json);
    return key ? user[key] : user;
}
function setUser(user: SvelteBaseApp.CurrentUser): void
{
    cleanUser();
    window.localStorage.setItem(APP_CURRENT_USER_KEY, JSON.stringify(user));
    store.set(user);
}
function updateUser(user: Omit<SvelteBaseApp.CurrentUser, 'access_token'>): void
{
    const json = window.localStorage.getItem(APP_CURRENT_USER_KEY);
    if (!json) throw new UserNotFoundError;
    const currentUser: SvelteBaseApp.CurrentUser = JSON.parse(json);
    const data = {
        ...user,
        access_token: currentUser.access_token,
    }
    window.localStorage.setItem(APP_CURRENT_USER_KEY, JSON.stringify(data));
    store.set(data);
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
