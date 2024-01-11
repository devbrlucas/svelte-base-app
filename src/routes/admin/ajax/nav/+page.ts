import { Ajax } from "$lib";
import type { PageLoad } from "./$types";
export const load: PageLoad = async () => {
    const response = await Ajax.get('/ajax').send('none');
    if (response.error) response.throwHttpError();
}
