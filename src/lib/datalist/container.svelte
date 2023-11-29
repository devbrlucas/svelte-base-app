<script lang="ts">
    export let title: string;
</script>

<h2 class="app-datalist-title">{title}</h2>
<dl class="app-datalist">
    <slot></slot>
</dl>
