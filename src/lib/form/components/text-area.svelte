<script lang="ts" generics="P">
    import type { Action } from "svelte/action";
    import Error from "./error.svelte";
    import LabelInfo from "./label-info.svelte";
    export let label: string;
    export let value: string | null = '';
    export let error: string = '';
    export let disabled: boolean = false;
    export let action: Action<HTMLTextAreaElement, P | undefined> | undefined = undefined;
    export let actionOptions: P | undefined = undefined;
    const id = `textarea-${Math.random() * 5}`;
</script>

<div class="app input-component textarea" class:disabled>
    {#if $$slots.default}
        <LabelInfo {id} {label}>
            <slot></slot>
        </LabelInfo>
    {:else}
        <LabelInfo {id} {label} />
    {/if}
    {#if action}
        <textarea {id} bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur use:action={actionOptions}></textarea>
    {:else}
        <textarea {id} bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur></textarea>
    {/if}
    <Error name={error} />
</div>