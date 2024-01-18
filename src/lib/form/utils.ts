import { errors as errorsStore, type Errors } from "./errors";
import { get } from "svelte/store";
import { messages } from "../messages";
class FormUtils
{
    public addError(key: string, messages: string[]): FormUtils
    {
        errorsStore.update(current => {
            current[key] = messages;
            return current;
        });
        return this;
    }

    public removeError(key: string): FormUtils
    {
        errorsStore.update(current => {
            delete current[key];
            return current;
        });
        return this;
    }

    public cleanErrors(): FormUtils
    {
        errorsStore.set({});
        return this;
    }

    public setErrors(errors: Errors): FormUtils
    {
        errorsStore.set(errors);
        return this;
    }

    public getError(key: string): string[] | undefined
    {
        const errors = get(errorsStore);
        return errors[key];
    }

    public getAllErrors(): Errors
    {
        return get(errorsStore);
    }

    public message(): void
    {
        messages.error('Você tem um ou mais campos para serem verificados');
    }
}
export const formUtils = new FormUtils;
