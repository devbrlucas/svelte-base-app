<script>import Error from "./error.svelte";
export let label, value, error = "", disabled = false;
</script>

<label class="app input-component textarea" class:disabled>
    <span>{label}</span>
    <textarea bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur></textarea>
    <Error name={error} />
</label>