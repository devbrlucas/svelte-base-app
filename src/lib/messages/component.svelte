<script lang="ts">
    import { scale } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { messages } from "./store";
    import icon from "./icon.svg?raw";
    import { onDestroy, onMount } from "svelte";
    function remove(id: number): void
    {
        const filtered = $messages.filter(message => message.id !== id);
        localStorage.setItem('app:persistent_messages', JSON.stringify(filtered.filter(item => !item.close)));
        messages.set(filtered);
    }
    // onDestroy(() => messages.set([]));
    onMount(() => {
        if (/^\/admin/.test(location.pathname)) {
            messages.set(
                JSON.parse(localStorage.getItem('app:persistent_messages') ?? '[]'),
            );
        }
    });
</script>

<div id="app-messages-container" role="alertdialog">
    {#each $messages as message (message.id)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <p class={message.level} on:click={() => remove(message.id)} in:scale={{duration: 200}} animate:flip={{duration: 200}} role="alert">
            {@html icon + message.content}
            {#if message.close}
                <span aria-hidden="true" class="flash-messages-progress" on:animationend={() => remove(message.id)}></span>
            {/if}
        </p>
    {/each}
</div>
