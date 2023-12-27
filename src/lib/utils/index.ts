import { titleStore } from "./title_store";
export * from "./formatter";
export function title(value: string): void
{
    titleStore.set(value);
}
