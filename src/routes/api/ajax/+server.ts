import type { RequestHandler } from "./$types";
export const GET: RequestHandler = async () => {
    const body = {
        message: 'Você não pode carregar esse recurso',
    }
    return new Response(JSON.stringify(body), {
        status: 403,
    });
}
