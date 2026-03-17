<script lang="ts" module>
    import { writable } from "svelte/store";
    const store = writable<Record<string, any[]>>({});
</script>
<script lang="ts" generics="T, C extends 'checkbox' | 'radio', P">
    import { run, createBubbler } from 'svelte/legacy';

    const bubble = createBubbler();
    import type { Action } from "svelte/action";
    import { onMount } from "svelte";
    import Error from "./error.svelte";
    import checkIcon from "./icons/check.svg?raw";
    import circleIcon from "./icons/circle.svg?raw";
    import LabelInfo from "./label-info.svelte";
    type GroupType = (C extends 'checkbox' ? T[] : T) | undefined;
    interface Props {
        type: C;
        label: string;
        value?: T | undefined;
        checked?: boolean;
        group?: (C extends 'checkbox' ? T[] : T);
        error?: string;
        disabled?: boolean;
        required?: boolean;
        key?: string;
        action?: Action<HTMLElement, P | undefined> | undefined;
        actionOptions?: P | undefined;
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let {
        type,
        label,
        value,
        checked = $bindable(),
        group = $bindable(),
        error = '',
        disabled = false,
        required = false,
        key = '',
        action,
        actionOptions,
        children,
        ...rest
    }: Props = $props();
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
            store.update(content => {
                content[key] = group as any;
                return content;
            });
            group = group;
        }
    }
    function initGroup(): void
    {
        if (type === 'checkbox' && Array.isArray(group)) {
            store.subscribe(content => {
                if (!value) throw valueError;
                if (!content[key]) return;
                checked = content[key].includes(value);
            });
            store.update(content => {
                content[key] = group as any;
                return content;
            });
        }
    }
    onMount(initGroup);
    run(() => {
        group && initGroup();
    });
</script>
<div class="app input-component selection-box {type}" class:disabled class:info={children} class:required>
    {#if type === 'checkbox'}
        {#if Array.isArray(group)}
            {#if action}
                <input {id} type="checkbox" {...rest} bind:checked={checked} {value} autocomplete='off' {disabled} onchange={handleGroup} use:action={actionOptions} {required}>
            {:else}
                <input {id} type="checkbox" {...rest} bind:checked={checked} {value} autocomplete='off' {disabled} onchange={handleGroup} {required}>
            {/if}
        {:else}
            {#if action}
                <input {id} type="checkbox" {...rest} bind:checked={checked} autocomplete='off' {disabled} onchange={bubble('change')} use:action={actionOptions} {required}>
            {:else}
                <input {id} type="checkbox" {...rest} bind:checked={checked} autocomplete='off' {disabled} onchange={bubble('change')} {required}>
            {/if}
        {/if}
    {:else if type === 'radio'}
        {#if action}
            <input {id} type="radio" {...rest} bind:group {value} autocomplete='off' {disabled} onchange={bubble('change')} use:action={actionOptions} {required}>
        {:else}
            <input {id} type="radio" {...rest} bind:group {value} autocomplete='off' {disabled} onchange={bubble('change')} {required}>
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
    {#if children}
        <LabelInfo {id} {label}>
            {@render children?.()}
        </LabelInfo>
    {:else}
        <LabelInfo {id} {label} />
    {/if}
    <Error name={error} />
</div>