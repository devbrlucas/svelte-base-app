<script lang="ts">
    import { confirmation, dialog } from "$lib";
    import Input from "$lib/form/components/input.svelte";
    let value: string = '';
</script>
<main>
    <Input type=text label=Nome bind:value />

</main>
<footer>
    <button type="button" class="highlighted" on:click={() => dialog.resolve(value)}>
        Enviar nome
    </button>
    <button type="button" class="highlighted" use:confirmation={{callback: () => dialog.close(), message: 'Fechar janela?'}}>Fechar janela</button>
</footer>