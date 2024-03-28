<script lang="ts">
    import xmarkIcon from "./xmark.svg?raw";
    import { store } from "./store";
    import { store as confirmationStore } from "../confirmation/store";
    import { dialog as dialogUtils } from "./index";
    import "./style.less";
    import { beforeNavigate } from "$app/navigation";
    let dialog: HTMLDivElement | undefined;
    function close(): void
    {
        dialog
            ?.classList
            .remove('open');
        if (!$store.resolved) store.set({resolved: null});
        window.removeEventListener('keyup', closeByKeyboard);
    }
    function show(): void
    {
        dialog
            ?.classList
            .add('open');
        setTimeout(() => {
            dialog
                ?.querySelector<HTMLButtonElement>('header button')
                ?.focus();
        }, 200);
        window.addEventListener('keyup', closeByKeyboard);
    }
    function closeByKeyboard(event: KeyboardEvent): void
    {
        if (event.key === 'Escape' && !Boolean($confirmationStore)) close();
    }
    $: {
        $store.component ? show() : close();
    }
    beforeNavigate(() => dialogUtils.close());
</script>

<div bind:this={dialog} id="app-dialog" role="dialog">
    <div id="app-dialog-window">
        {#if $store}
            <header>
                <h3>{$store.title}</h3>
                <button type="button" class="circle red" on:click={close}>
                    {@html xmarkIcon}
                </button>
            </header>
            <svelte:component this={$store.component} props={$store.props} />
        {/if}
    </div>
</div>
