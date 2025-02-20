<script lang="ts">
    import { dialog } from "$lib";
    import { onMount } from "svelte";
    let value: any;
    let input: HTMLInputElement;
    onMount(() => input.focus());
</script>
<main>
    <form on:submit|preventDefault={() => {dialog.resolve(value, false);input.value = '';}}>
        <input type="text" placeholder="digite" bind:value bind:this={input}>
        <button type="submit">Enviar</button>
    </form>
</main>
<footer>
    <button type="button" class="highlighted" on:click={() => dialog.canClose(true)}>
        Teste canClose(true) janela
    </button>
    <button type="button" class="highlighted" on:click={() => dialog.canClose(false)}>
        Teste canClose(false) janela
    </button>
</footer>