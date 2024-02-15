<script lang="ts">
    import { slide } from "svelte/transition";
    import questionIcon from "./icons/question.svg?raw";
    export let id: string;
    export let label: string;
    let infoVisible: boolean = false;
</script>
<span class="label">
    <label for={id}>{label}</label>
    {#if $$slots.default}
        <button type="button" class:visible={infoVisible} on:click={() => infoVisible = !infoVisible} title="{infoVisible ? 'ocultar' : 'exibir'} informações do campo">
            {@html questionIcon}
        </button>
    {/if}
</span>
<br>
{#if infoVisible}
    <div transition:slide={{duration: 200}} class="info">
        <slot></slot>
    </div>
{/if}