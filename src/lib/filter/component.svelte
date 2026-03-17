<script lang="ts">
    import { preventDefault } from 'svelte/legacy';

    import { goto, invalidateAll } from "$app/navigation";
    import { onDestroy, onMount } from "svelte";
    import { filterStore } from "./store";
    import { slide } from "svelte/transition";
    interface Props {
        url: string;
        form: Record<string, any>;
        callback?: ((action: 'filter' | 'clean') => void | Promise<void>) | undefined;
        appends?: Record<string, string>;
        children?: import('svelte').Snippet;
    }

    let {
        url,
        form = $bindable(),
        callback = undefined,
        appends = {},
        children
    }: Props = $props();
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
        if (callback) await callback('clean');
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
    <form onsubmit={preventDefault(handleSubmit)} transition:slide={{duration: 200}} id="form-filter">
        <fieldset>
            <legend>Pesquisa</legend>
            {@render children?.()}
            <br>
            <br>
            <button type="button" class="clean" onclick={clean}>
                Limpar
            </button>
            <button type="submit" class="filter">
                Filtrar
            </button>
        </fieldset>
    </form>
{/if}