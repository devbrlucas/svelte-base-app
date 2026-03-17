<script lang="ts">
    import { currentUser } from "../../auth/store";
    interface Props {
        profileMenuState: boolean;
        navState: boolean;
    }

    let { profileMenuState = $bindable(), navState = $bindable() }: Props = $props();
    function toggleProfileMenu(): void
    {
        profileMenuState = !profileMenuState;
        navState = false;
    }
</script>

<button type="button" onclick={toggleProfileMenu} class:image={$currentUser?.current?.image} aria-label="exibir opções do perfil de usuário">
    {#if $currentUser?.current?.image}
        <img src={$currentUser?.current?.image} alt="imagem de perfil do usuário">
    {:else}
        {($currentUser?.current?.name[0] ?? '').toUpperCase()}
    {/if}
</button>
