import type { PaginatedResponse } from "$lib/pagination";
import type { PageLoad } from "./$types";
export const load: PageLoad = ({ url }) => {
    const page = Number(url.searchParams.get('page') ?? '1');
    const items = Number(url.searchParams.get('items') ?? '20');
    const meta: PaginatedResponse['meta'] = {
        current_page: page,
        from: page === 1 ? 1 : page * items - items,
        last_page: 80 / items,
        per_page: items,
        to: page * items,
        total: 80,
    }
    return {
        meta,
    }
}