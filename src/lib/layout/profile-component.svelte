<script lang="ts">
    import { Ajax } from "../ajax";
    import { Input } from "../form";
    import { messages } from "../messages";
    import { confirmation, type ConfirmationProperites } from "../confirmation";
    import { user } from "$lib/auth";
    export let name: string;
    export let email: string;
    export let url: string = '/users/self';
    export let callback: Function | undefined = undefined;
    let password: string = '';
    let password_confirmation: string = '';
    let image: File | null = null;
    async function update(): Promise<void>
    {
        if (callback) {
            callback();
        } else {
            const response = await Ajax
                                        .post(url)
                                        .setOption('convertToFormData', true)
                                        .send<SvelteBaseApp.CurrentUser>('json', {
                                            name,
                                            email,
                                            image,
                                            password,
                                            password_confirmation,
                                        });
            if (response.error) return;
            messages.success('Dados editados com sucesso');
            user.update(response.body.data);
            image = null;
            password = password_confirmation = '';
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
        <Input type="text" label="Nome" error="name" bind:value={name} required size=60 />
        <br>
        <Input type="email" label="E-Mail" error="email" bind:value={email} required size=60 />
        <br>
        <Input type="file" label="Imagem" error="image" bind:value={image} />
        <br>
        <Input type="password" label="Senha" error="password" bind:value={password} size=40 />
        <Input type="password" label="Confirmação da senha" error="password_confirmation" bind:value={password_confirmation} size=40 />
        <slot></slot>
    </form>
</main>

<aside id="app-aside">
    <button type="submit" form="form">
        Alterar
    </button>
</aside>
