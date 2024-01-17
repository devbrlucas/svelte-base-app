<script lang="ts">
    import { dialog, title } from "$lib";
    import Comp from "./component.svelte";
    title('dialog');
    let message: string = '';
    async function open()
    {
        const re = await dialog.open<{name: string}>('Cadastro do cliente', Comp, { name: 'Lucas Moreira' });
        console.log(re);
        if (re) {
            if (re.name) {
                message = `O nome informado é ${re.name}`;
            } else {
                message = 'Nenhum nome informado';
            }
        } else {
            message = 'Nenhum retorno informado';
        }
    }
</script>

<main id="app-main">
    <h1>dialog</h1>
    <button type="button" on:click={open}>
        Testar dialog
    </button>
    <p>
        Aqui vai o retorno da função <i>dialog</i>: <b>{message}</b>
    </p>
</main>
<aside id="app-aside"></aside>
