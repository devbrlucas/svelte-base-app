import { messages } from "../messages";
import { currentUser as store, INITIAL_DATA } from "./store";
const APP_CURRENT_USER_KEY = 'app:current_user';
function getUser(key: 'user'): CurrentUser['user']
function getUser(key: 'access_token'): CurrentUser['access_token']
function getUser(key: 'type'): CurrentUser['type']
function getUser(): CurrentUser
function getUser(key?: keyof CurrentUser): CurrentUser | any
{
    let jsonUser = window.sessionStorage.getItem(APP_CURRENT_USER_KEY);
    if (!jsonUser) jsonUser = window.localStorage.getItem(APP_CURRENT_USER_KEY);
    const user: CurrentUser = jsonUser ? JSON.parse(jsonUser) : INITIAL_DATA;
    return key ? user[key] : user;
}
function setUser(user: CurrentUser, remember: boolean): void
{
    cleanUser();
    if (remember) {
        window.localStorage.setItem(APP_CURRENT_USER_KEY, JSON.stringify(user));
    } else {
        window.sessionStorage.setItem(APP_CURRENT_USER_KEY, JSON.stringify(user));
    }
    store.set(user);
}
function updateUser(user: CurrentUserUpdate): void
{
    let storage: Storage;
    let jsonUser = window.sessionStorage.getItem(APP_CURRENT_USER_KEY);
    if (jsonUser) {
        storage = window.sessionStorage;
    } else {
        jsonUser = window.localStorage.getItem(APP_CURRENT_USER_KEY);
        if (!jsonUser) return;
        storage = window.localStorage;
    }
    const currentUser: CurrentUser = JSON.parse(jsonUser);
    currentUser.type = user.type;
    currentUser.user = user.user;
    storage.setItem(APP_CURRENT_USER_KEY, JSON.stringify(currentUser));
    store.set(currentUser);
}
function cleanUser(): void
{
    window.sessionStorage.removeItem(APP_CURRENT_USER_KEY);
    window.localStorage.removeItem(APP_CURRENT_USER_KEY);
    store.set(INITIAL_DATA);
}
export const user = {
    get: getUser,
    set: setUser,
    clean: cleanUser,
    update: updateUser,
}
