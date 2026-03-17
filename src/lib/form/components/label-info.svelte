<script lang="ts">
    import { slide } from "svelte/transition";
    import questionIcon from "./icons/question.svg?raw";
    interface Props {
        id: string;
        label: string;
        children?: import('svelte').Snippet;
    }

    let { id, label, children }: Props = $props();
    let infoVisible: boolean = $state(false);
</script>
<span class="label">
    <label for={id}>{label}</label>
    {#if children}
        <button type="button" class:visible={infoVisible} onclick={() => infoVisible = !infoVisible} title="{infoVisible ? 'ocultar' : 'exibir'} informações do campo">
            {@html questionIcon}
        </button>
    {/if}
</span>
<br>
{#if infoVisible}
    <div transition:slide={{duration: 200}} class="info">
        {@render children?.()}
    </div>
{/if}