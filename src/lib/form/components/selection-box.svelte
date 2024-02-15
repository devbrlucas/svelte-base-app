<script lang="ts" generics="T, C extends 'checkbox' | 'radio'">
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
    const id = `box-${Math.random() * 5}`;
    function handleGroup(): void
    {
        if (Array.isArray(group) && type === 'checkbox') {
            if (checked) {
                if (!value) throw new TypeError('<SelectionBox>: Ao utilizar bind:group, é obrigatório informar a prop value');
                group.push(value);
            } else {
                group = group.filter(item => item !== value) as GroupType;
            }
            group = group;
        }
    }
    function initGroup(): void
    {
        if (Array.isArray(group)) {
            if (!value) throw new TypeError('<SelectionBox>: Ao utilizar bind:group, é obrigatório informar a prop value');
            checked = group.includes(value);
        }
    }
    onMount(initGroup);
</script>
<div class="app input-component selection-box {type}" class:disabled class:info={$$slots.default}>
    {#if type === 'checkbox'}
        {#if Array.isArray(group)}
            <input {id} type="checkbox" {...$$restProps} bind:checked={checked} {value} autocomplete='off' {disabled} on:change={handleGroup}>
        {:else}
            <input {id} type="checkbox" {...$$restProps} bind:checked={checked} autocomplete='off' {disabled} on:change>
        {/if}
    {:else if type === 'radio'}
        <input {id} type="radio" {...$$restProps} bind:group {value} autocomplete='off' {disabled} on:change>
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