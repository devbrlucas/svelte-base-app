import type { RequestHandler } from "./$types";
export const POST: RequestHandler = async () => {
    const body: SvelteBaseApp.CurrentUser = {
        access_token: '123456789',
        user: {
            name: 'Administrador',
            email: 'dev@developer',
            phone: '85996524785',
            image: '/logo.png',
        },
        type: 'user',
    }
    return new Response(
        JSON.stringify({ data: body }),
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
            },
        },
    );
}
export const DELETE: RequestHandler = async () => {
    return new Response(undefined, {
        status: 204,
    });
}
export const OPTIONS: RequestHandler = async() => {
    return new Response('OK', {
        status: 200,
    });
}