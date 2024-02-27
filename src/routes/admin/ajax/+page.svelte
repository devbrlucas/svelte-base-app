<script lang="ts">
    import { Ajax, title } from "$lib";
    title('ajax');
    async function forbiddenTest(): Promise<void>
    {
        Ajax.get('/ajax').send('none');
    }
    async function headerTest(): Promise<void>
    {
        Ajax.post('/ajax').send('none');
    }
</script>

<main id="app-main">
    <h1>ajax</h1>

    <button type="button" on:click={headerTest}>
        Teste header <i>App-Current-User</i>
    </button>
    <hr>
    <button type="button" on:click={forbiddenTest}>
        Testar resposta 403 (Ajax)
    </button>
    <hr>
    <a href="/admin/ajax/nav">
        Testar resposta 403 (navigation)
    </a>
</main>
<aside id="app-aside"></aside>
