<script lang="ts">
    export let title: string;
</script>

<h2 class="app-datalist-title" {...$$restProps}>{title}</h2>
<dl class="app-datalist" {...$$restProps}>
    <slot></slot>
</dl>
