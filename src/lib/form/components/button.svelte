<script lang="ts">
    export let type: 'button' | 'submit';
</script>

<button {type} {...$$restProps} class="app button-component" on:click>
    <slot>Button</slot>
</button>