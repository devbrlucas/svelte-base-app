<script lang="ts" context="module">
    import { writable } from "svelte/store";
    const store = writable<any[]>([]);
</script>
<script lang="ts" generics="T, C extends 'checkbox' | 'radio', P">
    import type { Action } from "svelte/action";
    import { onMount } from "svelte";
    import Error from "./error.svelte";
    import checkIcon from "./icons/check.svg?raw";
    import circleIcon from "./icons/circle.svg?raw";
    import LabelInfo from "./label-info.svelte";
    type GroupType = (C extends 'checkbox' ? T[] : T) | undefined;
    export let type: C;
    export let label: string;
    export let value: T | undefined = undefined;
    export let checked: boolean = false;
    export let group: (C extends 'checkbox' ? T[] : T) | undefined = undefined;
    export let error: string = '';
    export let disabled: boolean = false;
    export let required: boolean = false;
    export let action: Action<HTMLElement, P | undefined> | undefined = undefined;
    export let actionOptions: P | undefined = undefined;
    const id = `box-${Math.random() * 5}`;
    const valueError = new TypeError('<SelectionBox>: Ao utilizar bind:group, é obrigatório informar a prop value');
    function handleGroup(): void
    {
        if (Array.isArray(group) && type === 'checkbox') {
            if (!value) throw valueError;
            if (checked) {
                group.push(value);
            } else {
                group = group.filter(item => item !== value) as GroupType;
            }
            store.set(group as any[]);
            group = group;
        }
    }
    $: group && initGroup();
    function initGroup(): void
    {
        if (type === 'checkbox' && Array.isArray(group)) {
            store.subscribe(content => {
                if (!value) throw valueError;
                checked = content.includes(value);
            });
            store.set(group as any[]);
        }
    }
    onMount(initGroup);
</script>
<div class="app input-component selection-box {type}" class:disabled class:info={$$slots.default} class:required>
    {#if type === 'checkbox'}
        {#if Array.isArray(group)}
            {#if action}
                <input {id} type="checkbox" {...$$restProps} bind:checked={checked} {value} autocomplete='off' {disabled} on:change={handleGroup} use:action={actionOptions}>
            {:else}
                <input {id} type="checkbox" {...$$restProps} bind:checked={checked} {value} autocomplete='off' {disabled} on:change={handleGroup}>
            {/if}
        {:else}
            {#if action}
                <input {id} type="checkbox" {...$$restProps} bind:checked={checked} autocomplete='off' {disabled} on:change use:action={actionOptions}>
            {:else}
                <input {id} type="checkbox" {...$$restProps} bind:checked={checked} autocomplete='off' {disabled} on:change>
            {/if}
        {/if}
    {:else if type === 'radio'}
        {#if action}
            <input {id} type="radio" {...$$restProps} bind:group {value} autocomplete='off' {disabled} on:change use:action={actionOptions}>
        {:else}
            <input {id} type="radio" {...$$restProps} bind:group {value} autocomplete='off' {disabled} on:change>
        {/if}
    {/if}
    {#if type === 'radio'}
        <label for={id} class="box radio" aria-hidden="true">
            {@html circleIcon}
        </label>
    {:else}
        <label for={id} class="box check" aria-hidden="true">
            {@html checkIcon}
        </label>
    {/if}
    {#if $$slots.default}
        <LabelInfo {id} {label}>
            <slot></slot>
        </LabelInfo>
    {:else}
        <LabelInfo {id} {label} />
    {/if}
    <Error name={error} />
</div>