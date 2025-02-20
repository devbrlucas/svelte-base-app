<script lang="ts">
    import { dialog, title } from "$lib";
    import { onMount } from "svelte";
    import Comp from "./component.svelte";
    import ComponentNaoFecha from "./component_nao_fecha.svelte";
    title('dialog');
    let message: string = '';
    let names: string[] = [];
    async function open()
    {
        const re = await dialog.open<{name: string}>('Cadastro do cliente', Comp, { name: 'Lucas Moreira' });
        if (typeof re !== 'undefined') {
            if (re.name) {
                message = `O nome informado é ${re.name}`;
            } else {
                message = 'Nenhum nome informado';
            }
        } else {
            message = 'Nenhum retorno informado';
        }
    }
    async function openDialogCloseFalse()
    {
        let r: string | undefined;
        while (r = await dialog.open<string>('Cadastro do cliente', ComponentNaoFecha, undefined, false)) {
            if (r === undefined) break;
            names.push(r);
            names = names;
        }
    }
    onMount(open);
</script>
<main id="app-main">
    <h1>dialog</h1>
    <button type="button" on:click={open}>
        Testar dialog
    </button>
    <br>
    <br>
    <button type="button" on:click={openDialogCloseFalse}>
        Testar dialog que não fecha
    </button>
    <p>
        Aqui vai o retorno da função <i>dialog</i>: <b>{message}</b>
    </p>
    <p>
        <b>Nomes:</b>
        <br>
        {#each names as name}
            {name}
            <br>
        {/each}
    </p>
</main>
<aside id="app-aside"></aside>
