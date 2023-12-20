<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { filterStore } from "./store";
    export let url: string;
    export let form: Record<string, any>;
    function filter(): void
    {
        filterStore.update(filter => {
            filter.active = true;
            return filter;
        });
        const params = new URLSearchParams(
            window.location.search
        );
        for (const key in form) {
            params.set(key, form[key]);
        }
        goto(`${url}?${params.toString()}`);
    }
    function clean(): void
    {
        filterStore.update(filter => {
            filter.active = false;
            return filter;
        });
        const params = new URLSearchParams(
            window.location.search
        );
        for (const key in form) {
            params.delete(key);
            form[key] = '';
        }
        if (params.toString()) {
            goto(`${url}?${params.toString()}`);
        } else {
            goto(url);
        }
    }
    function populate(): void
    {
        const params = new URLSearchParams(
            window.location.search
        );
        for (const key in form) {
            form[key] = params.get(key) ?? '';
        }
    }
    onMount(populate);
</script>

<form on:submit|preventDefault={filter}>
    <fieldset>
        <legend>Pesquisa</legend>
        <slot></slot>
        <br>
        <br>
        <button type="button" class="highlighted" on:click={clean}>
            Limpar
        </button>
        {@html '&emsp;'}
        <button type="submit" class="highlighted">
            Filtrar
        </button>
    </fieldset>
</form>