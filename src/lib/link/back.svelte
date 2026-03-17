<script lang="ts">
    import { store } from "./store";
    interface Props {
        href: string;
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let { href = $bindable(), children, ...rest }: Props = $props();
    const url = `${href}${$store[href] ?? ''}`;
    function update(): void
    {
        store.update(value => {
            delete value[href];
            return value;
        });
    }
</script>

<a href={url} {...rest} onclick={update}>
    {#if children}{@render children()}{:else}
        Voltar
    {/if}
</a>