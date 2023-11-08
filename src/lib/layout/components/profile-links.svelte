<script lang="ts">
    import userIcon from "../icons/edit-user.svg?raw";
    import logoutIcon from "../icons/logout.svg?raw";
    import { confirmation, type ConfirmationProperites } from "../../confirmation";
    import { Ajax } from "../../ajax";
    import { goto } from "$app/navigation";
    import { user } from "../../auth";
    async function logout(): Promise<void>
    {
        const response = await Ajax
                                    .delete('/auth')
                                    .send('none');
        if (response.error) return;
        user.clean();
        goto('/login');
    }
    const action: ConfirmationProperites = {
        callback: logout,
        message: 'Deseja sair do sistema?',
    }
</script>

<li>
    <a href="/admin/perfil">
        {@html userIcon}
        Editar perfil
    </a>
</li>
<li>
    <a href="/logout" use:confirmation={action}>
        {@html logoutIcon}
        Sair do sistema
    </a>
</li>