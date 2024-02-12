<script lang="ts">
    import { title } from "$lib";
    import { Input } from "$lib/form";
    title('form Input');
    let file: File;
</script>

<main id="app-main">
    <h1>form Input</h1>
    <Input type="file" label="Selecionar arquivo" bind:file />
</main>
<aside id="app-aside">
    <a href="/admin/form">Voltar</a>
</aside>
