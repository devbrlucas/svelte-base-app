<script lang="ts">
    import "./style.less";
    import { store } from "./store";
    $: {
        if (Boolean($store)) dialog.showModal();
    }
    let dialog: HTMLDialogElement;
    function reject(): void
    {
        dialog.close();
        store.set(null);
    }
    function accept(): void
    {
        if ($store) $store.callback();
        reject();
    }
</script>

<dialog bind:this={dialog} id="app-confirmation">
    <div>
        <h3>Alerta</h3>
        <p>{@html $store?.message}</p>
        <footer>
            <button type="button" on:click={accept} class="accept">
                Sim
            </button>
            <button type="button" on:click={reject} class="reject">
                Não
            </button>
        </footer>
    </div>
</dialog>
