<script lang="ts" generics="P">
    import { createBubbler } from 'svelte/legacy';

    const bubble = createBubbler();
    import type { Action } from "svelte/action";
    import Error from "./error.svelte";
    import LabelInfo from "./label-info.svelte";
    interface Props {
        label?: string;
        value?: string | null;
        error?: string;
        disabled?: boolean;
        required?: boolean;
        action?: Action<HTMLElement, P | undefined> | undefined;
        actionOptions?: P | undefined;
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let {
        label = '',
        value = $bindable(),
        error = '',
        disabled = false,
        required = false,
        action,
        actionOptions,
        children,
        ...rest
    }: Props = $props();
    const id = `textarea-${Math.random() * 5}`;
</script>

<div class="app input-component textarea" class:disabled class:required>
    {#if label}
        {#if children}
            <LabelInfo {id} {label}>
                {@render children?.()}
            </LabelInfo>
        {:else}
            <LabelInfo {id} {label} />
        {/if}
    {/if}
    {#if action}
        <textarea {id} bind:value autocomplete="off" {...rest} {disabled} oninput={bubble('input')} onblur={bubble('blur')} use:action={actionOptions} {required}></textarea>
    {:else}
        <textarea {id} bind:value autocomplete="off" {...rest} {disabled} oninput={bubble('input')} onblur={bubble('blur')} {required}></textarea>
    {/if}
    <Error name={error} />
</div>