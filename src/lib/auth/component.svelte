<script lang="ts">
    import { Input, SelectionBox } from "../form";
    import { Ajax, type AjaxResourceResponse } from "../ajax";
    import { user, type AuthResponse, type AuthData } from "./index";
    import { goto } from "$app/navigation";
    export let callback: (() => Promise<void>) | undefined = undefined;
    export let url: string | undefined = undefined;
    export let successURL: string | ((response: AjaxResourceResponse<SvelteBaseApp.CurrentUser, any>) => Promise<string>) |  undefined = undefined;
    export let form: AuthData = {
        email: '',
        password: '',
        remember: false,
    }
    export let passwordReset: boolean = false;
    type InternalAuthResponse = AuthResponse<SvelteBaseApp.CurrentUser['user'], 'user'>;
    async function login(): Promise<void>
    {
        if (callback) return await callback();
        const response = await Ajax
                                    .post(url ?? '/auth')
                                    .setOption('unauthenticatedMessage', 'Dados de acesso incorretos')
                                    .send<InternalAuthResponse>('json', form);
        if (response.error) return;
        user.set(response.body.data);
        if (successURL) {
            if (typeof successURL === 'string') {
                goto(successURL);
            } else {
                goto(await successURL(response));
            }
        } else {
            goto('/admin/dashboard');
        }
    }
</script>
<main id="login-page">
    <h1 class="login visible">
        <span>Login</span>
        <img src="/logo.png" alt="logo da empresa">
    </h1>
    <form on:submit|preventDefault={login} id="form">
        <Input type="email" label="E-mail" bind:value={form.email} error="email" required size="40" />
        <br>
        <Input type="password" label="Senha" bind:value={form.password} error="password" required size="40" />
        <slot name="fields"></slot>
        <br>
        <SelectionBox type="checkbox" label="Manter conectado" bind:checked={form.remember} error="remember" />
        <slot name="inside-form"></slot>
    </form>
    <slot name="post-form"></slot>
    <footer>
        <button type="submit" form="form" class="highlighted">
            Acessar
        </button>
        <slot name="buttons"></slot>
        {#if passwordReset}
            <p class="reset-password">
                <a href="/redefinir-senha">Esqueci minha senha</a>
            </p>
        {/if}
    </footer>
</main>