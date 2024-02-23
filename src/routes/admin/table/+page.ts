import type { PaginatedResponse } from "$lib/pagination";
import type { PageLoad } from "./$types";
export const load: PageLoad = ({ url }) => {
    const meta: PaginatedResponse['meta'] = {
        current_page: 1,
        from: 1,
        last_page: 4,
        per_page: Number(url.searchParams.get('items') ?? 20),
        to: 1,
        total: 0,
    }
    const links: PaginatedResponse['links'] = {
        first: 'http://localhost:5500',
        last: null,
        next: null,
        prev: null,
    }
    return {
        meta,
        links,
    }
}