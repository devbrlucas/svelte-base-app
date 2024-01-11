<script lang="ts">
    import { page } from "$app/stores";
    import { title } from "../utils";
    title('Error');
</script>

<main id="app-main">
    <h1>ERRO {$page.status}</h1>
    {#if $page.error}
        <h2>{$page.error.message}</h2>
        <p>{$page.error.detailed_message ?? 'Sem informações adicionais'}</p>
    {/if}
</main>
<aside id="app-aside"></aside>
