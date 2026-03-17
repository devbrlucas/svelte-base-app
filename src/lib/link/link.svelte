<script lang="ts">
    import { createBubbler, handlers } from 'svelte/legacy';

    const bubble = createBubbler();
    import { store } from "./store";
    interface Props {
        href: string;
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let { href, children, ...rest }: Props = $props();
    function update(): void
    {
        const path = window.location.pathname;
        const query = window.location.search;
        store.update(value => {
            value[path] = query;
            return value;
        });
    }
</script>

<a {href} {...rest} onclick={handlers(update, bubble('click'))}>
    {@render children?.()}
</a>