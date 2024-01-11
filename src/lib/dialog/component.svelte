<script lang="ts">
    import xmarkIcon from "./xmark.svg?raw";
    import { store } from "./store";
    import "./style.less";
    let dialog: HTMLDialogElement | undefined;
    $: {
        if (Boolean($store)) dialog?.showModal();
    }
</script>

<dialog bind:this={dialog} id="app-dialog">
    <div>
        {#if $store}
            <header>
                <h3>{$store.title}</h3>
                <button type="button" on:click={() => dialog?.close()}>
                    {@html xmarkIcon}
                </button>
            </header>
            <svelte:component this={$store.component} props={$store.props} />
        {/if}
    </div>
</dialog>
