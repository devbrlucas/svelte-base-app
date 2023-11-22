<script lang="ts" generics="T">
    import Error from "./error.svelte";
    export let
        label: string,
        value: string | number| null | T,
        error: string,
        blank: boolean = false,
        multiple: boolean = false,
        disabled: boolean = false;
</script>

<label class="app input-component" class:disabled>
    <span>{label}</span>
    {#if multiple}
        <select multiple bind:value {...$$restProps} on:change autocomplete="off" {disabled}>
            {#if blank}
                <option value="">Selecione</option>
            {/if}
            <slot />
        </select>
    {:else}
        <select bind:value {...$$restProps} on:change autocomplete="off" {disabled}>
            {#if blank}
                <option value="">Selecione</option>
            {/if}
            <slot />
        </select>
    {/if}
    
    <Error name={error} />
</label>
    