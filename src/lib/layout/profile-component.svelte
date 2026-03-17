<script lang="ts">
    import { Ajax } from "../ajax";
    import { Input } from "../form";
    import { messages } from "../messages";
    import { confirmation, type ConfirmationProperites } from "../confirmation";
    import { user, type AuthResponse } from "$lib/auth";
    interface Props {
        fields?: Record<string, any>;
        url?: string;
        callback?: Function | undefined;
        form?: import('svelte').Snippet;
        buttons?: import('svelte').Snippet;
    }

    let {
        fields = $bindable({
        name: '',
        email: '',
        image: null,
        password: '',
        password_confirmation: '',
    }),
        url = '/users/self',
        callback = undefined,
        form,
        buttons
    }: Props = $props();
    async function update(): Promise<void>
    {
        if (callback) {
            callback();
        } else {
            const response = await Ajax
                                        .post(url)
                                        .setOption('convertToFormData', true)
                                        .send<AuthResponse<any, string>>('json', fields);
            if (response.error) return;
            messages.success('Dados editados com sucesso');
            user.set(response.body.data);
            fields.image = null;
            fields.password = fields.password_confirmation = '';
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
        <Input type="text" label="Nome" bind:value={fields.name} error="name" required size=60 />
        <br>
        <Input type="email" label="E-Mail" bind:value={fields.email} error="email" required size=60 />
        <br>
        <Input type="file" label="Selecione uma foto de perfil" bind:file={fields.image} error="image" />
        <br>
        <Input type="password" label="Senha" bind:value={fields.password} error="password" size=40 />
        <Input type="password" label="Confirmação da senha" bind:value={fields.password_confirmation} error="password_confirmation" size=40 />
        {@render form?.()}
    </form>
</main>

<aside id="app-aside">
    <button type="submit" form="form">
        Alterar
    </button>
    {@render buttons?.()}
</aside>
