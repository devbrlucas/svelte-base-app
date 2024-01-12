<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { onDestroy, onMount } from "svelte";
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
        const newURL = `${url}?${params.toString()}`;
        if (newURL === `${window.location.pathname}${window.location.search}`) {
            invalidateAll();
        } else {
            goto(newURL);
        }
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
    onDestroy(() => {
        filterStore.update(filter => {
            filter.visible = false;
            return filter;
        });
    });
</script>

<form on:submit|preventDefault={filter} id="form-filter">
    <fieldset>
        <legend>Pesquisa</legend>
        <slot></slot>
        <br>
        <br>
        <button type="button" class="clean" on:click={clean}>
            Limpar
        </button>
        <button type="submit" class="filter">
            Filtrar
        </button>
    </fieldset>
</form>