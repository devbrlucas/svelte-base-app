<script lang="ts">
    import { title, messages, confirmation } from "$lib";
    title('dialog');
    let acceptButtonClicked: boolean = false;
    let deniedButtonClicked: boolean = false;
    function reset(): void
    {
        messages.success('Mensagem exibida');
        acceptButtonClicked = false;
        deniedButtonClicked = false;
    }
</script>

<main id="app-main">
    <h1>confirmation</h1>
    <button
         type="button"
         on:click={reset}
        use:confirmation={{callback: () => acceptButtonClicked = true, message: 'Teste', deniedCallback: () => deniedButtonClicked = true}}
    >
        Testar confirmation
    </button>
    <p>
        Botão aceite selecionado: <i>{acceptButtonClicked ? 'Sim' : 'Não'}</i>
        <br>
        Botão negar selecionado: <i>{deniedButtonClicked ? 'Sim' : 'Não'}</i>
    </p>
</main>
<aside id="app-aside"></aside>
