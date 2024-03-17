import type { RequestHandler } from "./$types";
export const GET: RequestHandler = async () => {
    const errors = {
        file: [
            'Erro número um',
            'Erro número dois',
        ],
    }
    return new Response(
        JSON.stringify({ errors }),
        {
            status: 422,
        },
    );
}