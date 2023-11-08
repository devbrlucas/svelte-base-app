<script>import Error from "./error.svelte";
export let label, value, error, blank = false, disabled = false;
</script>

<label class="app input-component" class:disabled>
    <span>{label}</span>
    <select bind:value {...$$restProps} on:change autocomplete="off" {disabled}>
        {#if blank}
            <option value="">Selecione</option>
        {/if}
        <slot />
    </select>
    
    <Error name={error} />
</label>
    