export class UserNotFoundError extends Error
{
    public name: string = 'UserNotFoundError';

    constructor()
    {
        super('svelte-base-app/auth: Dados do usuário não encontrados');
    }
}