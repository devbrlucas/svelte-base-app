<script lang="ts">
    import { title } from "$lib";
    import { FilterButtonComponent, FilterComponent, filterStore, setFilterActive } from "$lib/filter";
    import { Input } from "$lib/form";
    title('filter');
    let form: Record<string, any> = {
        name: '',
        age: 0,
    }
    setFilterActive(form);
</script>

<main id="app-main">
    <h1>
        filter
        {#if $filterStore.active}
            <small>Filtro ativo</small>
        {/if}
    </h1>
    {#if $filterStore.visible}
        <FilterComponent url="/admin/filter" bind:form>
            <Input type="text" label="Nome" bind:value={form.name} />
            <Input type="number" label="Idade" bind:value={form.age} />
        </FilterComponent>
    {:else}
        <p>Clique no botão <i>Exibir filtros</i> para exibir os campos</p>
    {/if}
</main>
<aside id="app-aside">
    <FilterButtonComponent />
</aside>
