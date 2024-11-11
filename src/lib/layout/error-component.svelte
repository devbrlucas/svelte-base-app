<script lang="ts">
    import { page } from "$app/stores";
    import { title } from "../utils";
    title('Erro');
</script>
<main id="app-main">
    <h1>Erro</h1>
    {#if $page.error}
        <h2>{$page.error.message}</h2>
        {#if $page.error.detailed_message}
            <p>{@html $page.error.detailed_message}</p>
        {/if}
    {/if}
</main>
<aside id="app-aside"></aside>
