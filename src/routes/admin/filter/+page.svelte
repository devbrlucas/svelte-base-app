<script lang="ts">
    import { Pagination, title } from "$lib";
    import { FilterButtonComponent, FilterComponent, filterStore } from "$lib/filter";
    import { Input } from "$lib/form";
    import type { PageData } from "./$types";
    export let data: PageData;
    title('filter');
    let form: Record<string, any> = {
        name: '',
        age: 0,
    }
    let pagination: Pagination<any>;
</script>

<main id="app-main">
    <h1>
        filter
        {#if $filterStore.active}
            <small>Filtro ativo</small>
        {/if}
    </h1>
    <FilterComponent url="/admin/filter" bind:form>
        <Input type="text" label="Nome" bind:value={form.name} />
        <Input type="number" label="Idade" bind:value={form.age} />
    </FilterComponent>
    {#if !$filterStore.visible}
        <p>Clique no botão <i>Exibir filtros</i> para exibir os campos</p>
    {/if}
    <!-- <Pagination meta={data.meta} /> -->
    <Pagination bind:this={pagination} meta={data.meta} ajaxUrl=/pagination />
</main>
<aside id="app-aside">
    <FilterButtonComponent />
    <button type="button" on:click={() => pagination.refresh()}>
        Atualizar paginação
    </button>
</aside>
