<script lang="ts" generics="T">
    import Error from "./error.svelte";
    import LabelInfo from "./label-info.svelte";
    export let label: string;
    export let value: T;
    export let error: string = '';
    export let blank: boolean = false;
    export let multiple: boolean = false;
    export let disabled: boolean = false;
    const id = `select-${Math.random() * 5}`;
</script>

<div class="app input-component" class:disabled class:info={$$slots.info}>
    {#if $$slots.info}
        <LabelInfo {id} {label}>
            <slot name="info"></slot>
        </LabelInfo>
    {:else}
        <LabelInfo {id} {label} />
    {/if}
    {#if multiple}
        <select {id} multiple bind:value {...$$restProps} on:change autocomplete="off" {disabled}>
            {#if blank}
                <option value="">Selecione</option>
            {/if}
            <slot />
        </select>
    {:else}
        <select {id} bind:value {...$$restProps} on:change autocomplete="off" {disabled}>
            {#if blank}
                <option value="">Selecione</option>
            {/if}
            <slot />
        </select>
    {/if}
    
    <Error name={error} />
</div>