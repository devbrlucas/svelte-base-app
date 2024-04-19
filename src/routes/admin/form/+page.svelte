<script lang="ts">
    import { title } from "$lib";
    import { Input } from "$lib/form";
    title('form');
    function clearCallback(event: Event): void
    {
        const button = event.currentTarget as HTMLButtonElement;
        button.parentElement?.remove();
    }
</script>

<main id="app-main">
    <h1>form</h1>
    <a href="/admin/form/selection-box">SelectionBox</a>
    <br>
    <br>
    <a href="/admin/form/info">Teste do botão de informações adicionais</a>
    <br>
    <br>
    <Input type="file" label="Selecione um arquivo" {clearCallback} />
    <Input type="file" label="Selecione vários arquivos" multiple />
</main>
<aside id="app-aside"></aside>
