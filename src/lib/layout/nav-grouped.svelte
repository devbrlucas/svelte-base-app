<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { store } from "./nav_grouped";
    export let name: string;
    let key: string;
    let button: HTMLButtonElement;
    const setCurrentNavLink = getContext<() => void>('currentAnchor');
    onMount(() => {
        do {
            key = Math.random().toString(16).substring(2);
        } while ($store.has(key));
        $store.set(key, false);
        setTimeout(() => {
            setCurrentNavLink();
        }, 0);
    });
    function toggle(): void
    {
        $store.forEach((value, _key) => {
            if (key === _key) {
                $store.set(_key, !value);
            } else {
                $store.set(_key, false);
            }
        });
        if ($store.get(key)) {
            setTimeout(() => {
                const nav = document.querySelector('nav');
                if (nav) {
                    nav.scrollTo({
                        top: button.offsetTop,
                    });
                }

            }, 0);
        }
        store.update(value => value);
        setTimeout(setCurrentNavLink, 0);
    }
</script>
<button type="button" bind:this={button} class:open={$store.get(key)} on:click={toggle}>{name}</button>
<div class="grouped-nav" class:show={$store.get(key)}>
    <slot></slot>
</div>
<style lang="less">
    div.grouped-nav {
        display: none;
        gap: 1em;
        flex-direction: column;
        background-color: rgba(0, 0, 0, .15);
        border-radius: 1.2em;
        &.show {
            display: flex;
        }
        & > :global(:is(a, button).current) {
            background-color: var(--accent-color) !important;
            outline: none !important;
            color: #FFF !important;
            border: solid 4px rgba(0, 0, 0, .15) !important;
        }
    }
    button {
        &.open {
            font-size: .8em;
            background-color: rgba(0, 0, 0, .15);
        }
    }
</style>