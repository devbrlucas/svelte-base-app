<script lang="ts" generics="P">
    import type { Action } from "svelte/action";
    import Error from "./error.svelte";
    import LabelInfo from "./label-info.svelte";
    export let label: string = '';
    export let value: string | null = '';
    export let error: string = '';
    export let disabled: boolean = false;
    export let required: boolean = false;
    export let action: Action<HTMLElement, P | undefined> | undefined = undefined;
    export let actionOptions: P | undefined = undefined;
    const id = `textarea-${Math.random() * 5}`;
</script>

<div class="app input-component textarea" class:disabled class:required>
    {#if label}
        {#if $$slots.default}
            <LabelInfo {id} {label}>
                <slot></slot>
            </LabelInfo>
        {:else}
            <LabelInfo {id} {label} />
        {/if}
    {/if}
    {#if action}
        <textarea {id} bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur use:action={actionOptions} {required}></textarea>
    {:else}
        <textarea {id} bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur {required}></textarea>
    {/if}
    <Error name={error} />
</div>