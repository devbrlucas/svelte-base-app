<script lang="ts">
    import "../styles/base.less";
    import { MessagesComponent, messages } from "../messages";
    import xmarkIcon from "./icons/xmark.svg?raw";
    import { titleStore } from "../utils/title_store";
    import { ConfirmationComponent, DialogComponent } from "$lib";
    export let version: string;
    export let baseTitle: string;
    let installPromptContainer: HTMLDivElement;
    let installPrompt: BeforeInstallPromptEvent | null;
    window.addEventListener('beforeinstallprompt', async event => {
        event.preventDefault();
        const latestClose = Number(
            localStorage.getItem('devbrlucas:svelte-panel:install_prompt_closed') ?? '0'
        );
        if ((Date.now() - latestClose) < 86_400_000) return; // lower than 1 day
        installPrompt = event;
    });
    async function installPromptChoice(): Promise<void>
    {
        if (!installPrompt) return;
        const result = await installPrompt.prompt();
        const choice = await result.outcome;
        if (choice === 'accepted') {
            messages.success('O seu aplicativo foi instalado');
            installPrompt = null;
        } else {
            installPromptContainer.remove();
        }
    }
    function removeInstallPrompt(event: MouseEvent): void
    {
        localStorage.setItem('devbrlucas:svelte-panel:install_prompt_closed', Date.now().toString());
        const button = event.currentTarget as HTMLButtonElement;
        button.parentElement?.remove();
    }
</script>
<svelte:head>
    <title>{$titleStore}{baseTitle}</title>
</svelte:head>
<slot></slot>
{#if installPrompt}
    <div role="alert" bind:this={installPromptContainer} id="app-pwa-install-message">
        <button type="button" on:click={removeInstallPrompt} class="remove" title="remover alerta">
            {@html xmarkIcon}
        </button>
        <span>Clique no botão abaixo para instalar o aplicativo</span>
        <br>
        <button type="button" on:click={installPromptChoice} class="choice">
            Instalar
        </button>
    </div>
{/if}
<aside id="app-version">Versão {version}</aside>
<MessagesComponent />
<ConfirmationComponent />
<DialogComponent />