<script lang="ts">
    import { errors } from "../errors";
    interface Props {
        name: string;
    }

    let { name }: Props = $props();
</script>

{#if $errors[name]}
    <br />
    <small class="app error-component">
        {#each $errors[name] as error}
            {error}<br>
        {/each}
    </small>
{/if}