<script lang="ts">
    import { Ajax } from "../ajax";
    import { Input } from "../form";
    import { messages } from "../messages";
    import { confirmation, type ConfirmationProperites } from "../confirmation";
    import { user } from "$lib/auth";
    export let form: Record<string, any> = {
        name: '',
        email: '',
        image: null,
        password: '',
        password_confirmation: '',
    }
    export let url: string = '/users/self';
    export let callback: Function | undefined = undefined;
    async function update(): Promise<void>
    {
        if (callback) {
            callback();
        } else {
            const response = await Ajax
                                        .post(url)
                                        .setOption('convertToFormData', true)
                                        .send<SvelteBaseApp.CurrentUser>('json', form);
            if (response.error) return;
            messages.success('Dados editados com sucesso');
            user.update(response.body.data);
            form.image = null;
            form.password = form.password_confirmation = '';
        }
    }

    const action: ConfirmationProperites = {
        callback: update,
        message: 'Deseja editar o seu perfil de usuário?',
    }
</script>

<main id="app-main">
    <h1>Meu Perfil</h1>
    <form id="form" use:confirmation={action}>
        <Input type="text" label="Nome" bind:value={form.name} error="name" required size=60 />
        <br>
        <Input type="email" label="E-Mail" bind:value={form.email} error="email" required size=60 />
        <br>
        <Input type="file" label="Imagem" bind:value={form.image} error="image" />
        <slot></slot>
        <br>
        <Input type="password" label="Senha" bind:value={form.password} error="password" size=40 />
        <Input type="password" label="Confirmação da senha" bind:value={form.password_confirmation} error="password_confirmation" size=40 />
    </form>
</main>

<aside id="app-aside">
    <button type="submit" form="form">
        Alterar
    </button>
</aside>
