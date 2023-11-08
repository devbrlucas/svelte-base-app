<script lang="ts">
    import { errors } from "../errors";
    export let name: string;
</script>

{#if $errors[name]}
    <br />
    <small class="app error-component">
        {#each $errors[name] as error}
            {error}<br>
        {/each}
    </small>
{/if}