<script lang="ts">
    import xmarkIcon from "./xmark.svg?raw";
    import { dialogs } from "./dialogs";
    import { store as confirmationStore } from "../confirmation/store";
    import { dialog as dialogUtils } from "./index";
    import "./style.less";
    import { onMount } from "svelte";
    let dialog: HTMLDivElement | undefined;
    function close(): void
    {
        dialogUtils.close();
        dialog
            ?.classList
            .remove('open');
        window.removeEventListener('keyup', closeByKeyboard);
    }
    function show(): void
    {
        dialog
            ?.classList
            .add('open');
        window.addEventListener('keyup', closeByKeyboard);
    }
    function closeByKeyboard(event: KeyboardEvent): void
    {
        if (event.key === 'Escape' && !Boolean($confirmationStore)) close();
    }
    $: {
        $dialogs.length === 0 ? close() : show();
    }
    onMount(() => dialogUtils.closeAll());
</script>

<div bind:this={dialog} id="app-dialog" role="dialog">
    {#each $dialogs as dialog, index (dialog.id)}
        <div class="dialog" class:active={$dialogs.length === (index + 1)} data-id={dialog.id}>
            <header>
                <h3>{dialog.title}</h3>
                <button type="button" class="circle red" on:click={close}>
                    {@html xmarkIcon}
                </button>
            </header>
            <svelte:component this={dialog.component} props={dialog.props} />
        </div>
    {/each}
</div>
