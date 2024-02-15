<script lang="ts">
    import Error from "./error.svelte";
    import LabelInfo from "./label-info.svelte";
    export let label: string;
    export let value: string | null = '';
    export let error: string = '';
    export let disabled: boolean = false;
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
    <textarea {id} bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur></textarea>
    <Error name={error} />
</div>