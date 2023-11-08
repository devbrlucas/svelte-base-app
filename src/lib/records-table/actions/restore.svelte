<script lang="ts">
    import { Ajax } from "../../ajax";
    import { messages } from "../../messages";
    import icon from "../icons/check.svg?raw";
    import { confirmation, type ConfirmationProperites } from "../../confirmation";
    export let href: string;
    export let callback: (response: Response) => Promise<boolean>;

    async function destroy(): Promise<void>
    {
        const response = await Ajax
                                    .delete(href)
                                    .send('none');
        if (response.error) return;
        const result = await callback(response.response);
        if (result) messages.success('Registro restaurado com sucesso');
    }

    const action: ConfirmationProperites = {
        callback: destroy,
        message: 'Deseja restaurar o registro selecionado?',
    }
</script>

<a {href} class="restore" title="restaurar registro" use:confirmation={action}>
    {@html icon}
</a>