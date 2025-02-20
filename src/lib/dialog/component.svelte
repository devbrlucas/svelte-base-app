<script lang="ts">
    import xmarkIcon from "./xmark.svg?raw";
    import { dialogs } from "./dialogs";
    import { store as confirmationStore } from "../confirmation/store";
    import { dialog as dialogUtils } from "./index";
    import "./style.less";
    import { afterNavigate } from "$app/navigation";
    let dialogElement: HTMLDivElement | undefined;
    function close(): void
    {
        dialogUtils.close();
        dialogElement
            ?.classList
            .remove('open');
        window.removeEventListener('keydown', closeByKeyboard);
    }
    function show(): void
    {
        dialogElement
            ?.classList
            .add('open');
        window.addEventListener('keydown', closeByKeyboard);
    }
    function closeByKeyboard(event: KeyboardEvent): void
    {
        const dialog = dialogUtils.active();
        if (event.key === 'Escape' && !Boolean($confirmationStore) && dialog?.can_close) close();
    }
    $: $dialogs.length === 0 ? close() : show();
    afterNavigate(({to}) => /^\/login/.test(to?.url.pathname ?? '') && dialogUtils.closeAll());
</script>

<div bind:this={dialogElement} id="app-dialog" role="dialog">
    {#each $dialogs as dialog, index (dialog.id)}
        <div class="dialog" class:active={$dialogs.length === (index + 1)} data-id={dialog.id}>
            <header>
                <h3>{dialog.title}</h3>
                {#if dialog.can_close !== false}
                    <button type="button" class="circle red" on:click={close}>
                        {@html xmarkIcon}
                    </button>
                {/if}
            </header>
            <svelte:component this={dialog.component} props={dialog.props} />
        </div>
    {/each}
</div>
