<script lang="ts" generics="T">
    interface Props {
        name: string;
        content: T;
    }

    let { name, content }: Props = $props();
</script>

<div>
    <dt>{name}:</dt>
    <dd>{content}</dd>
</div>
