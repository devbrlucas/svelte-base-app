<script lang="ts">
    import { Input } from "../form";
    import { MessagesComponent, messages } from "../messages";
    import { Ajax } from "../ajax";
    import { goto } from "$app/navigation";
    export let tokenRequestURL: string | undefined = undefined;
    export let tokenValidationURL: string | undefined = undefined;
    export let form: Record<string, any> = {
        email: '',
        token: '',
        password: '',
        password_confirmation: '',
    }
    let emailSent: boolean = false;
    async function sendToken(): Promise<void>
    {
        const response = await Ajax
                                    .post(tokenRequestURL ?? '/auth/password-reset')
                                    .send('none', form);
        if (response.response.status !== 204) return;
        emailSent = true;
        messages
            .success('Redefinição de senha solicitada')
            .warning('Se o e-mail informado estiver cadastrado no sistema, você receberá um token para redefinir sua senha');
    }
    async function sendPassword(): Promise<void>
    {
        const response = await Ajax
                                    .patch(tokenValidationURL ?? '/auth/password-reset')
                                    .setOption('disableRedirects', true)
                                    .setOption('unauthenticatedMessage', 'Token de redefinição inválido')
                                    .send('none', form);
        if (response.response.status === 401) messages.warning('O token informado está icorreto ou vencido');
        if (response.error) return;
        messages.success('Senha redefinida com sucesso');
        goto('/login');
    }
</script>
<main id="login-page">
    <h1>
        <span>Redefinir<br>senha</span>
        <img src="/logo.png" alt="logo da empresa">
    </h1>
    {#if emailSent}
        <form on:submit|preventDefault={sendPassword} id="form">
            <p>Se o e-mail informado estiver cadastrado no sistema, você receberá um token para redefinir sua senha</p>
            <Input type="text" label="Token" bind:value={form.token} error="token" required size=40 />
            <br>
            <Input type="password" label="Senha" bind:value={form.password} error="password" required size=40 />
            <br>
            <Input type="password" label="Confirme sua senha" bind:value={form.password_confirmation} error="password_confirmation" required size=40 />
        </form>
    {:else}
        <form on:submit|preventDefault={sendToken} id="form">
            <p>Informe o seu e-mail de acesso ao sistema para receber seu token de para reset de senha</p>
            <Input type="email" label="E-mail" bind:value={form.email} error="email" required size=40 />
        </form>
    {/if}
    <footer class="password-reset">
        <a href="/login">Voltar</a>
        <button type="submit" form="form" class="highlighted">
            {#if emailSent}
                Redefinir senha
            {:else}
                Enviar token
            {/if}
        </button>
    </footer>
</main>
<MessagesComponent />