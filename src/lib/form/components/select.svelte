<script lang="ts" generics="T, P">
    import type { Action } from "svelte/action";
    import Error from "./error.svelte";
    import LabelInfo from "./label-info.svelte";
    export let label: string;
    export let value: T;
    export let error: string = '';
    export let blank: boolean = false;
    export let multiple: boolean = false;
    export let disabled: boolean = false;
    export let required: boolean = false;
    export let action: Action<HTMLElement, P | undefined> | undefined = undefined;
    export let actionOptions: P | undefined = undefined;
    const id = `select-${Math.random() * 5}`;
</script>

<!-- <div class="app input-component" class:disabled class:info={$$slots.info}> -->
<div class="app input-component" class:disabled class:info={$$slots.info} class:required>
    {#if $$slots.info}
        <LabelInfo {id} {label}>
            <slot name="info"></slot>
        </LabelInfo>
    {:else}
        <LabelInfo {id} {label} />
    {/if}
    {#if multiple}
        {#if action}
            <select {id} multiple bind:value {...$$restProps} on:change autocomplete="off" {disabled} use:action={actionOptions} {required}>
                {#if blank}
                    <option value="">Selecione</option>
                {/if}
                <slot />
            </select>
        {:else}
            <select {id} multiple bind:value {...$$restProps} on:change autocomplete="off" {disabled} {required}>
                {#if blank}
                    <option value="">Selecione</option>
                {/if}
                <slot />
            </select>
        {/if}
    {:else}
        {#if action}
            <select {id} bind:value {...$$restProps} on:change autocomplete="off" {disabled} use:action={actionOptions} {required}>
                {#if blank}
                    <option value="">Selecione</option>
                {/if}
                <slot />
            </select>
        {:else}
            <select {id} bind:value {...$$restProps} on:change autocomplete="off" {disabled} {required}>
                {#if blank}
                    <option value="">Selecione</option>
                {/if}
                <slot />
            </select>
        {/if}
    {/if}
    
    <Error name={error} />
</div>