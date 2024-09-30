<script lang="ts">
    import { messages, title } from "$lib";
    import { Input } from "$lib/form";
    title('form');
    function clearCallback(event: Event): void
    {
        const button = event.currentTarget as HTMLButtonElement;
        button.parentElement?.remove();
    }
    let form: {file: File | null} = {
        file: null
    }
    let hidden = false;
</script>

<main id="app-main">
    <h1>form</h1>
    <a href="/admin/form/selection-box">SelectionBox</a>
    <br>
    <br>
    <a href="/admin/form/info">Teste do botão de informações adicionais</a>
    <br>
    <br>
    <form on:submit|preventDefault={() => {messages.success('Submit'); console.log(form)}}>
        <Input type="file" label="Selecione um arquivo" {clearCallback} />
        {#if !hidden}
            <Input type=file label="Selecione um arquivo com bind" bind:file={form.file} error=file required />
        {/if}
        <Input type="file" label="Selecione vários arquivos" multiple />
        <br>
        <br>
        <button type="submit">Submit</button>
    </form>
</main>
<aside id="app-aside">
    <button type="button" on:click={() => hidden = !hidden}>Hidden file com bind</button>
</aside>
