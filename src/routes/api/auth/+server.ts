import type { ServerLoad } from "@sveltejs/kit";
export const POST: ServerLoad = async () => {
    const body: SvelteBaseApp.CurrentUser = {
        access_token: '123456789',
        user: {
            name: 'Administrador',
            email: 'dev@developer',
            image: '/logo.png',
        },
        type: 'user',
    }
    return new Response(
        JSON.stringify({ data: body }),
        {
            status: 200,
        },
    );
}
export const DELETE: ServerLoad = async () => {
    return new Response(undefined, {
        status: 204,
    });
}
