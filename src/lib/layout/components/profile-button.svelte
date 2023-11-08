<script lang="ts">
    import { currentUser } from "../../auth/store";
    export let profileMenuState: boolean;
    export let navState: boolean;
    function toggleProfileMenu(): void
    {
        profileMenuState = !profileMenuState;
        navState = false;
    }
</script>

<button type="button" on:click={toggleProfileMenu} class:image={$currentUser?.user.image} aria-label="exibir opções do perfil de usuário">
    {#if $currentUser?.user.image}
        <img src={$currentUser?.user.image} alt="imagem de perfil do usuário">
    {:else}
        {($currentUser?.user.name[0] ?? '').toUpperCase()}
    {/if}
</button>
