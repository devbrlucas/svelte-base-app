<script lang="ts">
    import { filterStore } from "./store";
    function toggle(): void
    {
        filterStore.update(filter => {
            filter.visible = !filter.visible;
            return filter;
        });
    }
</script>
<button type="button" on:click={toggle}>
    {$filterStore.visible ? 'Ocultar' : 'Exibir'} filtros
</button>
