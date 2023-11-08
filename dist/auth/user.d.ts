declare function getUser(key: 'user'): CurrentUser['user'];
declare function getUser(key: 'access_token'): CurrentUser['access_token'];
declare function getUser(key: 'type'): CurrentUser['type'];
declare function getUser(): CurrentUser;
declare function setUser(user: CurrentUser, remember: boolean): void;
declare function updateUser(user: CurrentUserUpdate): void;
declare function cleanUser(): void;
export declare const user: {
    get: typeof getUser;
    set: typeof setUser;
    clean: typeof cleanUser;
    update: typeof updateUser;
};
export {};
