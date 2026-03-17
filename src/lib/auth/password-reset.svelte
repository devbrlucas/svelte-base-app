<script lang="ts">
    import { preventDefault } from 'svelte/legacy';

    import { Input } from "../form";
    import { messages } from "../messages";
    import { Ajax } from "../ajax";
    import { goto } from "$app/navigation";
    interface Props {
        tokenRequestURL?: string | undefined;
        tokenValidationURL?: string | undefined;
        fields?: Record<string, any>;
        info?: import('svelte').Snippet;
        form?: import('svelte').Snippet;
    }

    let {
        tokenRequestURL = undefined,
        tokenValidationURL = undefined,
        fields = $bindable({
        email: '',
        token: '',
        password: '',
        password_confirmation: '',
    }),
        info,
        form
    }: Props = $props();
    let emailSent: boolean = $state(false);
    async function sendToken(): Promise<void>
    {
        const response = await Ajax
                                    .post(tokenRequestURL ?? '/auth/password-reset')
                                    .send('none', fields);
        if (response.response.status !== 204) return;
        emailSent = true;
        messages.success('Redefinição de senha solicitada');
        messages.warning('Se o e-mail informado estiver cadastrado no sistema, você receberá um token para redefinir sua senha');
    }
    async function sendPassword(): Promise<void>
    {
        const response = await Ajax
                                    .patch(tokenValidationURL ?? '/auth/password-reset')
                                    .setOption('disableRedirects', true)
                                    .setOption('unauthenticatedMessage', 'Token de redefinição inválido')
                                    .send('none', fields);
        if (response.response.status === 401) messages.warning('O token informado está icorreto ou vencido');
        if (response.error) return;
        messages.success('Senha redefinida com sucesso');
        goto('/login');
    }
</script>
<main id="login-page">
    <h1 class="visible">
        <span>Redefinir<br>senha</span>
        <img src="/logo.png" alt="logo da empresa">
    </h1>
    {#if emailSent}
        <form onsubmit={preventDefault(sendPassword)} id="form">
            <p>Se o e-mail informado estiver cadastrado no sistema, você receberá um token para redefinir sua senha</p>
            <Input type="text" label="Token" bind:value={fields.token} error="token" required size=40 />
            <br>
            <Input type="password" label="Senha" bind:value={fields.password} error="password" required size=40 />
            <br>
            <Input type="password" label="Confirme sua senha" bind:value={fields.password_confirmation} error="password_confirmation" required size=40 />
        </form>
    {:else}
        <form onsubmit={preventDefault(sendToken)} id="form">
            {#if info}{@render info()}{:else}
                <p>Informe o seu e-mail de acesso ao sistema para receber seu token de para reset de senha</p>
            {/if}
            <Input type="email" label="E-mail" bind:value={fields.email} error="email" required size=40 />
            {@render form?.()}
        </form>
    {/if}
    <footer class="password-reset">
        {#if emailSent}
            <a href="#email" onclick={preventDefault(() => emailSent = false)}>Voltar</a>
        {:else}
            <a href="/login">Voltar</a>
        {/if}
        <button type="submit" form="form" class="highlighted">
            {#if emailSent}
                Redefinir senha
            {:else}
                Enviar token
            {/if}
        </button>
    </footer>
</main>