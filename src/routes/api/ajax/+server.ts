import type { ServerLoad } from "@sveltejs/kit";
export const GET: ServerLoad = async () => {
    return new Response(undefined, {
        status: 403,
    });
}
