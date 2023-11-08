export class InternalError extends Error {
    name = 'InternalError';
    constructor(message) {
        super(`ERRO INTERNO: ${message}`);
    }
}
