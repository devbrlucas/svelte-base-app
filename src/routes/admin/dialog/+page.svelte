<script lang="ts">
    import { dialog, title } from "$lib";
    import { onMount } from "svelte";
    import Comp from "./component.svelte";
    title('dialog');
    function open()
    {
        dialog('Cadastro do cliente', Comp, { name: 'Lucas Moreira' });
    }
    onMount(open);
</script>

<main id="app-main">
    <h1>dialog</h1>
    <button type="button" on:click={open}>
        Testar dialog
    </button>
</main>
<aside id="app-aside"></aside>
