<!-- @migration-task Error while migrating Svelte code: Cannot use `export let` in runes mode — use `$props()` instead
https://svelte.dev/e/legacy_export_invalid -->
<script lang="ts" generics="T">
    import { createBubbler, preventDefault } from 'svelte/legacy';

    const bubble = createBubbler();
    import { Ajax } from "$lib/ajax";
    import type { PaginatedResponse } from "./index";
    import { goto } from "$app/navigation";
    import previousIcon from "./icons/previous.svg?raw";
    import nextIcon from "./icons/next.svg?raw";
    import firstIcon from "./icons/first.svg?raw";
    import lastIcon from "./icons/last.svg?raw";
    import plusIcon from "./icons/plus.svg?raw";
    import minusIcon from "./icons/minus.svg?raw";
    let {
        meta = {
            current_page: 0,
            from: 0,
            last_page: 0,
            per_page: 0,
            to: 0,
            total: 0
        },
        ajaxUrl = '',
        results = undefined,
        appends = {}
    }: {
        meta?: PaginatedResponse['meta'];
        ajaxUrl?: string;
        results?: T[];
        appends?: Record<string, string>;
    } = $props();

    const INITIAL_ITEMS_PER_PAGE: number = 20;
    const MAX_ITENS_PER_PAGE: number = 300;
    let pages: number[] = $derived.by(() => {
        const p = [];
        for (let i = 1; i <= meta.last_page; i++) {
            p.push(i);
        }
        return p;
    });
    let currentPage = $derived(meta.current_page);
    let perPage = $derived(meta.per_page);
    async function changePage(items: number, page: number): Promise<void>
    {
        const query = new URLSearchParams(location.search);
        query.delete('items');
        query.delete('page');
        if (page > 1) query.set('page', String(page));
        if (items > INITIAL_ITEMS_PER_PAGE) query.set('items', String(items));
        for (const key in appends) {
            query.set(key, appends[key]);
        }
        const url = new URL(location.href);
        url.search = query.toString();
        if (ajaxUrl) {
            const response = await Ajax
                                        .get(`${ajaxUrl}${url.search}`)
                                        .send<T>('paginate');
            if (response.error) return;
            meta = response.body.meta;
            results = response.body.data;
        } else {
            goto(url);
        }
    }
    function validatePageNumber(_meta: PaginatedResponse['meta']): void
    {
        if (_meta.current_page > _meta.last_page) {
            currentPage = 1;
        }
    }

    $effect(() => {
        changePage(perPage, currentPage);
    });

    $effect(() => {
        validatePageNumber(meta);
    });
</script>

<form onsubmit={preventDefault(bubble('submit'))} title="paginação dos registros" class="app-pagination">
    <span>
        Exibindo dos itens {meta.from ?? 0} - {meta.to ?? 0} de um total de {meta.total} registros
    </span>
    <br>
    <div>
        <button type="button" onclick={() => perPage -= 20} disabled={perPage === INITIAL_ITEMS_PER_PAGE} title="mais itens por página">
            {@html minusIcon}
        </button>
        <span>{perPage}</span>
        <button type="button" onclick={() => perPage += 20} disabled={perPage === MAX_ITENS_PER_PAGE} title="mais itens por página">
            {@html plusIcon}
        </button>
    </div>
    <div>
        <button type="button" onclick={() => currentPage = 1} disabled={meta.current_page === 1} title="primeira página">
            {@html firstIcon}    
        </button>
        <button type="button" onclick={() => currentPage--} disabled={meta.current_page === 1} title="página anterior">
            {@html previousIcon}
        </button>
        <select bind:value={meta.current_page}>
            {#each pages as page}
                <option>{page}</option>
            {/each}
        </select>
        <button type="button" onclick={() => currentPage++} disabled={meta.current_page === meta.last_page} title="próxima página">
            {@html nextIcon}
        </button>
        <button type="button" onclick={() => currentPage = meta.last_page} disabled={meta.current_page === meta.last_page} title="última página">
            {@html lastIcon}
        </button>
    </div>
</form>