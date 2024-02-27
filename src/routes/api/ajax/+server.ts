import type { RequestHandler } from "./$types";
export const GET: RequestHandler = async () => {
    const body = {
        message: 'Você não pode carregar esse recurso',
    }
    return new Response(JSON.stringify(body), {
        status: 403,
    });
}
export const POST: RequestHandler = async () => {
    const headers = new Headers;
    const currentUser = {
        user: {
            name: 'Meu Novo Nome',
            email: 'meunovoemail@developer',
            phone: '65214526985',
        },
        type: 'user',
    }
    headers.set('App-Current-User', JSON.stringify(currentUser));
    return new Response(undefined, {
        headers,
    });
}