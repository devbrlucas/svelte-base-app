import type { ServerLoad } from "@sveltejs/kit";
export const GET: ServerLoad = async () => {
    const body = {
        message: 'Você não pode carregar esse recurso',
    }
    return new Response(JSON.stringify(body), {
        status: 403,
    });
}
