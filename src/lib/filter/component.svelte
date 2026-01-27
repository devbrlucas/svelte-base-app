<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { onDestroy, onMount } from "svelte";
    import { filterStore } from "./store";
    import { slide } from "svelte/transition";
    export let url: string;
    export let form: Record<string, any>;
    export let callback: ((action: 'filter' | 'clean') => void | Promise<void>) | undefined = undefined;
    export let appends: Record<string, string> = {};
    async function filter(): Promise<void>
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
        for (const key in appends) {
            params.set(key, appends[key]);
        }
        const newURL = `${url}?${params.toString()}`;
        if (newURL === `${window.location.pathname}${window.location.search}`) {
            await invalidateAll();
        } else {
            await goto(newURL);
        }
    }
    async function clean(): Promise<void>
    {
        if (callback) await callback('clean');
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
            await goto(`${url}?${params.toString()}`);
        } else {
            await goto(url);
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
    function setFilterActive(): void
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
    onMount(() => {
        populate();
        setFilterActive();
    });
    onDestroy(() => {
        filterStore.update(filter => {
            filter.visible = false;
            return filter;
        });
    });
    async function handleSubmit(): Promise<void>
    {
        await filter();
        if (callback) await callback('filter');
    }
</script>

{#if $filterStore.visible}
    <form on:submit|preventDefault={handleSubmit} transition:slide={{duration: 200}} id="form-filter">
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
{/if}