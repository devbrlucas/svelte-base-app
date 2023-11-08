<script>export let type;
</script>

<button {type} {...$$restProps} class="app button-component" on:click>
    <slot>Button</slot>
</button>