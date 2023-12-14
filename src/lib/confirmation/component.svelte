<script lang="ts">
    import { store } from "./store";
    $: {
        if (Boolean($store)) dialog.showModal();
    }
    let dialog: HTMLDialogElement;
    function close(): void
    {
        dialog.close();
        store.set(null);
    }
    function accept(): void
    {
        if ($store) $store.callback();
        close();
    }
    function denied(): void
    {
        if ($store?.deniedCallback) $store.deniedCallback();
        close();
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
            <button type="button" on:click={denied} class="reject">
                Não
            </button>
        </footer>
    </div>
</dialog>
