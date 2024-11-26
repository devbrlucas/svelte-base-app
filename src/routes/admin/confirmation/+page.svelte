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
    async function testConfirmation(): Promise<void>
    {
        reset();
        await confirmation({
            callback: () => acceptButtonClicked = true,
            deniedCallback: () => deniedButtonClicked = true,
            message: 'Teste sem anexar no botão',
        });
        messages.success('Depois de esperar a confirmação');
    }
</script>

<main id="app-main">
    <h1>confirmation</h1>
    <button
        on:click={reset}
        type="button"
        use:confirmation={{callback: () => acceptButtonClicked = true, message: 'Teste', deniedCallback: () => deniedButtonClicked = true}}
    >
        Testar confirmation com o <b>use:</b>
    </button>
    <br>
    <br>
    <button
         type="button"
         on:click={testConfirmation}
    >
        Testar confirmation sem o <b>use:</b>
    </button>
    <p>
        Botão aceite selecionado: <i>{acceptButtonClicked ? 'Sim' : 'Não'}</i>
        <br>
        Botão negar selecionado: <i>{deniedButtonClicked ? 'Sim' : 'Não'}</i>
    </p>
</main>
<aside id="app-aside"></aside>
