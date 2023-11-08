<script lang="ts">
    import userIcon from "./icons/edit-user.svg?raw";
    import logoutIcon from "./icons/logout.svg?raw";
    import showNavIcon from "./icons/show-nav.svg?raw";
    import hideNavIcon from "./icons/hide-nav.svg?raw";
    import { MessagesComponent } from "../messages";
    import { currentUser, user } from "../auth";
    import { Ajax } from "../ajax";
    import { goto } from "$app/navigation";
    import { confirmation, type ConfirmationProperites, ConfirmationComponent } from "../confirmation";
    import { beforeNavigate } from "$app/navigation";
    import { slide } from "svelte/transition";
    import "./admin.less";
    async function logout(): Promise<void>
    {
        const response = await Ajax
                                    .delete('/auth')
                                    .send('none');
        if (response.error) return;
        user.clean();
        goto('/login');
    }
    const action: ConfirmationProperites = {
        callback: logout,
        message: 'Deseja sair do sistema?',
    }
    let navState: boolean = false;
    let profileMenuState: boolean = false;
    beforeNavigate(() => {
        if (navState) navState = false;
        if (profileMenuState) profileMenuState = false;
    });

    function toggleNavMenu(): void
    {
        navState = !navState;
        profileMenuState = false;
    }
    function toggleProfileMenu(): void
    {
        profileMenuState = !profileMenuState;
        navState = false;
    }
</script>

<header id="app-header">
    <button type="button" title="exibe menu" on:click={toggleNavMenu} class:show={navState}>
        {@html showNavIcon}
        {@html hideNavIcon}
    </button>
    <img src="/logo.png" alt="logo da empresa">
    <nav class:show={navState}>
        <slot name="nav"></slot>
    </nav>
    <div>
        <button type="button" on:click={toggleProfileMenu}>
            {#if $currentUser?.user.image}
                <img src={$currentUser?.user.image} alt="imagem de perfil do usuário">
            {:else}
                {($currentUser?.user.name[0] ?? '').toUpperCase()}
            {/if}
        </button>
        <ul class:show={profileMenuState}>
            <li>
                <span>Olá {$currentUser?.user.name}</span>
            </li>
            <li>
                <a href="/admin/perfil">
                    {@html userIcon}
                    Editar perfil
                </a>
            </li>
            <li>
                <a href="/logout" use:confirmation={action}>
                    {@html logoutIcon}
                    Sair do sistema
                </a>
            </li>
        </ul>
    </div>
</header>
<aside id="app-user-info">
    <span>Olá {$currentUser?.user.name}</span>
    <button type="button" on:click={toggleProfileMenu} class:image={$currentUser?.user.image}>
        {#if $currentUser?.user.image}
            <img src={$currentUser?.user.image} alt="imagem de perfil do usuário">
        {:else}
            {($currentUser?.user.name[0] ?? '').toUpperCase()}
        {/if}
    </button>
    {#if profileMenuState}
        <ul transition:slide={{duration: 200}}>
            <li>
                <a href="/admin/perfil">
                    {@html userIcon}
                    Editar perfil
                </a>
            </li>
            <li>
                <a href="/logout" use:confirmation={action}>
                    {@html logoutIcon}
                    Sair do sistema
                </a>
            </li>
        </ul>
    {/if}
</aside>
<slot name="body"></slot>
<MessagesComponent />
<ConfirmationComponent />
