<script lang="ts">
    import type { PaginatedResponse } from "./index";
    import { goto } from "$app/navigation";
    import { afterUpdate } from "svelte";
    import previousIcon from "./icons/previous.svg?raw";
    import nextIcon from "./icons/next.svg?raw";
    import firstIcon from "./icons/first.svg?raw";
    import lastIcon from "./icons/last.svg?raw";
    import plusIcon from "./icons/plus.svg?raw";
    import minusIcon from "./icons/minus.svg?raw";
    export let meta: PaginatedResponse['meta'];
    export let links: PaginatedResponse['links'];
    const INITIAL_ITEMS_PER_PAGE: number = 20;
    const MAX_ITENS_PER_PAGE: number = 300;
    let pages: number[] = [];
    $: {
        pages = [];
        for (let i = 1; i <= meta.last_page; i++) {
            pages.push(i);
        }
    }
    $: currentPage = meta.current_page;
    $: perPage = meta.per_page;
    $: {
        changePage(perPage, currentPage);
    }
    function changePage(items: number, page: number): void
    {
        const query = new URLSearchParams(location.search);
        query.delete('items');
        query.delete('page');
        if (page > 1) query.set('page', String(page));
        if (items > INITIAL_ITEMS_PER_PAGE) query.set('items', String(items));
        if (query.toString()) {
            goto(`${location.pathname}?${query.toString()}`);
        } else {
            goto(location.pathname);
        }
    }
    function validatePageNumber(): void
    {
        if (meta.current_page > meta.last_page) {
            currentPage = 1;
        }
    }
    afterUpdate(validatePageNumber);
</script>

<form on:submit|preventDefault title="paginação dos registros" class="app-pagination">
    <span>
        Exibindo dos itens {meta.from ?? 0} - {meta.to ?? 0} de um total de {meta.total} registros
    </span>
    <br>
    <div>
        <button type="button" on:click={() => perPage -= 20} disabled={perPage === INITIAL_ITEMS_PER_PAGE} title="mais itens por página">
            {@html minusIcon}
        </button>
        <span>{perPage}</span>
        <button type="button" on:click={() => perPage += 20} disabled={perPage === MAX_ITENS_PER_PAGE} title="mais itens por página">
            {@html plusIcon}
        </button>
    </div>
    <div>
        <button type="button" on:click={() => currentPage = 1} disabled={meta.current_page === 1} title="primeira página">
            {@html firstIcon}    
        </button>
        <button type="button" on:click={() => currentPage--} disabled={!links.prev} title="página anterior">
            {@html previousIcon}
        </button>
        <select bind:value={meta.current_page}>
            {#each pages as page}
                <option>{page}</option>
            {/each}
        </select>
        <button type="button" on:click={() => currentPage++} disabled={!links.next} title="próxima página">
            {@html nextIcon}
        </button>
        <button type="button" on:click={() => currentPage = meta.last_page} disabled={meta.current_page === meta.last_page} title="última página">
            {@html lastIcon}
        </button>
    </div>
</form>