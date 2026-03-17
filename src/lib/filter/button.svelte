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
<button type="button" onclick={toggle}>
    {$filterStore.visible ? 'Ocultar' : 'Exibir'} filtros
</button>
