<script lang="ts">
    import showNavIcon from "./icons/show-nav.svg?raw";
    import hideNavIcon from "./icons/hide-nav.svg?raw";
    import { currentUser } from "../auth";
    import { afterNavigate, beforeNavigate, invalidateAll } from "$app/navigation";
    import { slide } from "svelte/transition";
    import ProfileButton from "./components/profile-button.svelte";
    import ProfileLinks from "./components/profile-links.svelte";
    import { onMount } from "svelte";
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
    onMount(() => {
        setCurrentNavLink();
        const anchors = document.querySelectorAll<HTMLAnchorElement>('#app-nav > a');
        anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));
    });
    afterNavigate(setCurrentNavLink);
    function setCurrentNavLink(): void
    {
        const anchors = document.querySelectorAll<HTMLAnchorElement>('#app-nav > a');
        anchors.forEach(anchor => anchor.classList.remove('current'));
        const currentPathname = window.location.pathname;
        anchors.forEach(anchor => {
            const anchorPathname = anchor.pathname;
            const regexp = new RegExp(`^${anchorPathname}`);
            if (regexp.test(currentPathname)) {
                anchor.classList.add('current');
                return;
            }
        });
    }
    function handleAnchorClick(event: Event): void
    {
        const anchor = event.currentTarget as HTMLAnchorElement;
        if (anchor.pathname === location.pathname && !location.search) invalidateAll();
    }
</script>

<header id="app-header">
    <button type="button" title="exibe menu" on:click={toggleNavMenu} class:show={navState}>
        {@html showNavIcon}
        {@html hideNavIcon}
    </button>
    <img src="/logo.png" alt="logo da empresa">
    <nav class:show={navState} id="app-nav">
        <slot name="nav"></slot>
    </nav>
    <div>
        <ProfileButton bind:profileMenuState bind:navState />
        <ul class:show={profileMenuState}>
            <li>
                <span>Olá {$currentUser?.current?.name}</span>
            </li>
            <ProfileLinks />
        </ul>
    </div>
</header>
<aside id="app-user-info">
    <span>Olá {$currentUser?.current?.name}</span>
    <ProfileButton bind:profileMenuState bind:navState />
    {#if profileMenuState}
        <ul transition:slide={{duration: 200}}>
            <ProfileLinks />
        </ul>
    {/if}
</aside>
<slot name="body"></slot>