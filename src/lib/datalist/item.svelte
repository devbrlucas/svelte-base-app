<script lang="ts" generics="T">
    export let name: string;
    export let content: T;
</script>

<div>
    <dt>{name}:</dt>
    <dd>{content}</dd>
</div>
