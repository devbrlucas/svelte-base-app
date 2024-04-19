export { default as Pagination } from "./component.svelte";
export type PaginatedResponse<T = object, U = object> = U & {
    data: T[];
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        per_page: number;
        to: number | null;
        total: number;
    }
}