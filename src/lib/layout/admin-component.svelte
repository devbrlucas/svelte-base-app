<script lang="ts">
    import showNavIcon from "./icons/show-nav.svg?raw";
    import hideNavIcon from "./icons/hide-nav.svg?raw";
    import { MessagesComponent } from "../messages";
    import { currentUser } from "../auth";
    import { ConfirmationComponent } from "../confirmation";
    import { beforeNavigate } from "$app/navigation";
    import { slide } from "svelte/transition";
    import ProfileButton from "./components/profile-button.svelte";
    import ProfileLinks from "./components/profile-links.svelte";
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
        <ProfileButton bind:profileMenuState bind:navState />
        <ul class:show={profileMenuState}>
            <li>
                <span>Olá {$currentUser?.user.name}</span>
            </li>
            <ProfileLinks />
        </ul>
    </div>
</header>
<aside id="app-user-info">
    <span>Olá {$currentUser?.user.name}</span>
    <ProfileButton bind:profileMenuState bind:navState />
    {#if profileMenuState}
        <ul transition:slide={{duration: 200}}>
            <ProfileLinks />
        </ul>
    {/if}
</aside>
<slot name="body"></slot>
<MessagesComponent />
<ConfirmationComponent />
