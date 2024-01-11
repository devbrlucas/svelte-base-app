import type { ServerLoad } from "@sveltejs/kit";
export const POST: ServerLoad = async ({ request }) => {
    const body = await request.formData();
    const data = {
        user: {
            name: body.get('name'),
            email: body.get('email'),
        },
        type: 'user',
        access_token: '123456789',
    };
    return new Response(JSON.stringify({ data }));
}
