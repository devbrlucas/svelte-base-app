<script lang="ts">
    import { messages, title } from "$lib";
    title('messages');
    let id: number;
</script>
<main id="app-main">
    <h1>messages</h1>
    <button type="button" class="highlighted" on:click={() => id = messages.success('Mensagem de sucesso')}>
        Sucesso
    </button>
    <br>
    <br>
    <button type="button" class="highlighted" on:click={() => id = messages.warning('Mensagem de aviso')}>
        Aviso
    </button>
    <br>
    <br>
    <button type="button" class="highlighted" on:click={() => id = messages.error('Mensagem de erro')}>
        Erro
    </button>
    <br>
    <br>
    <button type="button" class="highlighted" on:click={() => id = messages.error('Mensagem aberta', false)}>
        Sempre aberta
    </button>
    <br>
    <br>
    <button type="button" class="highlighted" on:click={() => id = messages.warning('Vai vir outra mensagem', false, () => messages.success('Viu !!!!'))}>
        Callback
    </button>
    <br>
    <br>
    <button type="button" class="highlighted" on:click={() => messages.close(id)}>
        Fechar mensagem
    </button>
</main>
<aside id="app-aside"></aside>