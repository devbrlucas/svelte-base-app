<script lang="ts">
    import Error from "./error.svelte";
    import checkIcon from "./icons/check.svg?raw";
    import circleIcon from "./icons/circle.svg?raw";
    export let
        type: 'checkbox' | 'radio',
        label: string,
        value: string | number = '',
        selected: string | number | undefined = undefined,
        checked: boolean = false,
        group: (string | number)[] | undefined = undefined,
        error: string = '',
        disabled: boolean = false;
    function handleGroup(): void
    {
        if (Array.isArray(group)) {
            if (checked) {
                group.push(value);
            } else {
                group = group.filter(item => item !== value);
            }
        }
        group = group;
    }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="app input-component selection-box {type}" class:disabled>
    <span>{label}</span>
    {#if type === 'checkbox'}
        {#if Array.isArray(group)}
            <input type="checkbox" {...$$restProps} bind:checked={checked} {value} autocomplete='off' {disabled} on:change={handleGroup}>
        {:else}
            <input type="checkbox" {...$$restProps} bind:checked={checked} autocomplete='off' {disabled} on:change>
        {/if}
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
