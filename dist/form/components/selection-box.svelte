<script generics="T">import Error from "./error.svelte";
import checkIcon from "./icons/check.svg?raw";
import circleIcon from "./icons/circle.svg?raw";
export let type, label, value = "", selected = "", checked = false, group = [], error = "", disabled = false;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="app input-component selection-box {type}" class:disabled>
    <span>{label}</span>
    {#if type === 'checkgroup'}
        <input type="checkbox" {...$$restProps} bind:group={group} {value} autocomplete='off' {disabled} on:change>
    {:else if type === 'checkbox'}
        <input type="checkbox" {...$$restProps} bind:checked={checked} autocomplete='off' {disabled} on:change>
    {:else if type === 'radio'}
        <input type="radio" {...$$restProps} bind:group={selected} {value} autocomplete='off' {disabled} on:change>
    {/if}
    {#if type === 'radio'}
        <span class="box radio" aria-hidden="true">
            {@html circleIcon}
        </span>
    {:else}
        <span class="box check" aria-hidden="true">
            {@html checkIcon}
        </span>
    {/if}
</label>
<Error name={error} />
