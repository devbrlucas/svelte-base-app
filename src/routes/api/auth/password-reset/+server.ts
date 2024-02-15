import type { RequestHandler } from "./$types";
export const POST: RequestHandler = async () => {
    return new Response(undefined, {
        status: 204,
    });
}
export const PATCH: RequestHandler = async ({ request }) => {
    const json = await request.json();
    if (json.token !== '123') return new Response(undefined, { status: 401 });
    return new Response;
}