<script lang="ts">
    import { run } from 'svelte/legacy';

    import { store } from "./store";
    let dialog: HTMLDivElement | undefined = $state();
    function close(): void
    {
        dialog
            ?.classList
            .remove('open');
        store.set(null);
        window.removeEventListener('keyup', closeByKeyboard);
    }
    function show(): void
    {
        dialog
            ?.classList
            .add('open');
        setTimeout(() => {
            dialog
                ?.querySelector<HTMLButtonElement>('button.accept')
                ?.focus();
        }, 200);
        window.addEventListener('keyup', closeByKeyboard);
    }
    function closeByKeyboard(event: KeyboardEvent): void
    {
        if (event.key === 'Escape') denied();
    }
    run(() => {
        Boolean($store) ? show() : close();
    });
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

<div bind:this={dialog} id="app-confirmation" role="dialog">
    <div>
        <h3>Alerta</h3>
        <p>{@html $store?.message}</p>
        <footer>
            <button type="button" onclick={accept} class="accept">
                Sim
            </button>
            <button type="button" onclick={denied} class="reject">
                Não
            </button>
        </footer>
    </div>
</div>
