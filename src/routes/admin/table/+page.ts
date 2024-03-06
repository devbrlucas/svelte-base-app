import type { PaginatedResponse } from "$lib/pagination";
import type { PageLoad } from "./$types";
export const load: PageLoad = ({ url }) => {
    const page = Number(url.searchParams.get('page') ?? '1');
    const items = Number(url.searchParams.get('items') ?? '20');
    const meta: PaginatedResponse['meta'] = {
        current_page: page,
        from: 1,
        last_page: 80 / items,
        per_page: items,
        to: 20,
        total: 80,
    }
    const links: PaginatedResponse['links'] = {
        first: 'http://localhost:5500/admin/table',
        last: 'http://localhost:5500/admin/table?page=4',
        next: `http://localhost:5500/admin/table?page=${page + 1}`,
        prev: `http://localhost:5500/admin/table?page=${page - 1}`,
    }
    return {
        meta,
        links,
    }
}