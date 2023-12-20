export { default as FilterComponent } from "./component.svelte";
export { default as FilterButtonComponent } from "./button.svelte";
import { filterStore } from "./store";
export function setFilterActive(form: Record<string, string>): void
{
    const params = new URLSearchParams(
        window.location.search
    );
    let filterActive: boolean = false;
    for (const key in form) {
        if (params.has(key)) {
            filterActive = true;
            break;
        }
    }
    filterStore.update(filter => {
        filter.active = filterActive;
        return filter;
    });
}
