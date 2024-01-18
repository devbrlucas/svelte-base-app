<script lang="ts">
    import { title } from "$lib";
    import { FilterButtonComponent, FilterComponent, filterStore } from "$lib/filter";
    import { Input } from "$lib/form";
    title('filter');
    let form: Record<string, any> = {
        name: '',
        age: 0,
    }
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
</main>
<aside id="app-aside">
    <FilterButtonComponent />
</aside>
