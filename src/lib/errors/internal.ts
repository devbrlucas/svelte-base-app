export class InternalError extends Error
{
    public name: string = 'InternalError';
    constructor(message: string)
    {
        super(`ERRO INTERNO: ${message}`);
    }
}