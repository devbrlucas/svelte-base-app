<script lang="ts">
    import { store } from "./store";
    export let href: string;
    const url = `${href}${$store[href] ?? ''}`;
    function update(): void
    {
        store.update(value => {
            delete value[href];
            return value;
        });
    }
</script>

<a href={url} {...$$restProps} on:click={update}>
    <slot>
        Voltar
    </slot>
</a>