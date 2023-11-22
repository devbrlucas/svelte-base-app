<script lang="ts">
    import { Input, SelectionBox } from "../form";
    import { MessagesComponent } from "../messages";
    import { Ajax } from "../ajax";
    import { user, type AuthResponse } from "./index";
    import { goto } from "$app/navigation";
    export let callback: (() => Promise<void>) | undefined = undefined;
    export let email: string = '';
    export let password: string = '';
    export let remember: boolean = false;
    type InternalAuthResponse = AuthResponse<CurrentUser['user'], 'user'>;
    async function login(): Promise<void>
    {
        if (callback) return await callback();
        const response = await Ajax
                                    .post('/auth')
                                    .setOption('unauthenticatedMessage', 'Dados de acesso incorretos')
                                    .send<InternalAuthResponse>('json', {
                                        email,
                                        password,
                                        remember,
                                    });
        if (response.error) return;
        user.set(response.body.data, remember);
        goto('/admin');
    }
</script>

<main id="login-page">
    <h1>
        <span>Login</span>
        <img src="/logo.png" alt="logo da empresa">
    </h1>
    <form on:submit|preventDefault={login} id="form">
        <Input type="email" label="E-Mail" bind:value={email} error="email" required size="40" />
        <br>
        <Input type="password" label="Senha" bind:value={password} error="password" required size="40" />
        <br>
        <SelectionBox type="checkbox" label="Manter conectado" bind:checked={remember} error="remember" />
    </form>
    <button type="submit" form="form" class="highlighted">
        Acessar
    </button>
</main>
<MessagesComponent />
