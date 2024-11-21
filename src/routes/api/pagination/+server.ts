import type { PaginatedResponse } from "$lib";
import type { RequestHandler } from "./$types";
export const GET: RequestHandler = ({ url }) => {
    const page = Number(url.searchParams.get('page') ?? '1');
    const items = Number(url.searchParams.get('items') ?? '20');
    const meta: PaginatedResponse['meta'] = {
        current_page: page,
        from: page === 1 ? 1 : page * items - items,
        last_page: 160 / items,
        per_page: items,
        to: page * items,
        total: 160,
    }
    const body = [1, 2, 3];
    return new Response(JSON.stringify({ meta, body }), {
        status: 200,
    });
}