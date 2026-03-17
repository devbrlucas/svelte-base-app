<script lang="ts">
    interface Props {
        title: string;
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let { title, children, ...rest }: Props = $props();
</script>

<h2 class="app-datalist-title" {...rest}>{title}</h2>
<dl class="app-datalist" {...rest}>
    {@render children?.()}
</dl>
