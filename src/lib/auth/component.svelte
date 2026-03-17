<script lang="ts">
    import { preventDefault } from 'svelte/legacy';

    import { Input, SelectionBox } from "../form";
    import { Ajax, type AjaxResourceResponse } from "../ajax";
    import { user, type AuthResponse, type AuthData } from "./index";
    import { goto } from "$app/navigation";
    interface Props {
        callback?: (() => Promise<void>) | undefined;
        url?: string | undefined;
        successURL?: string | ((response: AjaxResourceResponse<SvelteBaseApp.CurrentUser, any>) => Promise<string>) |  undefined;
        form?: AuthData;
        passwordReset?: boolean;
        fields?: import('svelte').Snippet;
        inside_form?: import('svelte').Snippet;
        post_form?: import('svelte').Snippet;
        buttons?: import('svelte').Snippet;
    }

    let {
        callback = undefined,
        url = undefined,
        successURL = undefined,
        form = $bindable({
        email: '',
        password: '',
        remember: false,
    }),
        passwordReset = false,
        fields,
        inside_form,
        post_form,
        buttons
    }: Props = $props();
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
    <form onsubmit={preventDefault(login)} id="form">
        <Input type="email" label="E-mail" bind:value={form.email} error="email" required size="40" />
        <br>
        <Input type="password" label="Senha" bind:value={form.password} error="password" required size="40" />
        {@render fields?.()}
        <br>
        <SelectionBox type="checkbox" label="Manter conectado" bind:checked={form.remember} error="remember" />
        {@render inside_form?.()}
    </form>
    {@render post_form?.()}
    <footer>
        <button type="submit" form="form" class="highlighted">
            Acessar
        </button>
        {@render buttons?.()}
        {#if passwordReset}
            <p class="reset-password">
                <a href="/redefinir-senha">Esqueci minha senha</a>
            </p>
        {/if}
    </footer>
</main>