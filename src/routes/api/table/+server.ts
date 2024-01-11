import type { ServerLoad } from "@sveltejs/kit";
export const DELETE: ServerLoad = async () => {
    return new Response(undefined, {
        status: 204,
    });
}
