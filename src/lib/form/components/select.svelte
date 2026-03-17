<script lang="ts" generics="T, P">
    import { createBubbler } from 'svelte/legacy';

    const bubble = createBubbler();
    import type { Action } from "svelte/action";
    import Error from "./error.svelte";
    import LabelInfo from "./label-info.svelte";
    interface Props {
        label?: string;
        value: T;
        error?: string;
        blank?: boolean;
        multiple?: boolean;
        disabled?: boolean;
        required?: boolean;
        action?: Action<HTMLElement, P | undefined> | undefined;
        actionOptions?: P | undefined;
        info?: import('svelte').Snippet;
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let {
        label = '',
        value = $bindable(),
        error = '',
        blank = false,
        multiple = false,
        disabled = false,
        required = false,
        action = undefined,
        actionOptions = undefined,
        info,
        children,
        ...rest
    }: Props = $props();
    const id = `select-${Math.random() * 5}`;
</script>

<!-- <div class="app input-component" class:disabled class:info={$$slots.info}> -->
<div class="app input-component" class:disabled class:info={info} class:required>
    {#if  label}
        {#if info}
            <LabelInfo {id} {label}>
                {@render info?.()}
            </LabelInfo>
        {:else}
            <LabelInfo {id} {label} />
        {/if}
    {/if}
    {#if multiple}
        {#if action}
            <select {id} multiple bind:value {...rest} onchange={bubble('change')} autocomplete="off" {disabled} use:action={actionOptions} {required}>
                {#if blank}
                    <option value="">Selecione</option>
                {/if}
                {@render children?.()}
            </select>
        {:else}
            <select {id} multiple bind:value {...rest} onchange={bubble('change')} autocomplete="off" {disabled} {required}>
                {#if blank}
                    <option value="">Selecione</option>
                {/if}
                {@render children?.()}
            </select>
        {/if}
    {:else}
        {#if action}
            <select {id} bind:value {...rest} onchange={bubble('change')} autocomplete="off" {disabled} use:action={actionOptions} {required}>
                {#if blank}
                    <option value="">Selecione</option>
                {/if}
                {@render children?.()}
            </select>
        {:else}
            <select {id} bind:value {...rest} onchange={bubble('change')} autocomplete="off" {disabled} {required}>
                {#if blank}
                    <option value="">Selecione</option>
                {/if}
                {@render children?.()}
            </select>
        {/if}
    {/if}
    
    <Error name={error} />
</div>