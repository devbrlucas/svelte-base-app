<script lang="ts">
    import { page } from "$app/stores";
</script>

<main id="app-main">
    <h1>ERRO {$page.status}</h1>
    <h2>{$page.error?.message}</h2>
    <p>{$page.error?.detailed_message}</p>
</main>
<aside id="app-aside"></aside>
