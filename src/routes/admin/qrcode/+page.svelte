<script lang="ts">
    import { title, qrcode, QRCodeReaderComponent, messages } from "$lib";
    import { Input } from "$lib/form";
    title('qrcode');
    let value: string = '';
    let code: string = '';
    async function read(): Promise<void>
    {
        const value = await qrcode.read();
        if (value) {
            messages.success('Dados lidos');
            messages.success(value);
        } else if (value === null) {
            messages.warning('Leitor fechado');
        } else {
            messages.error('ERRO');
        }
    }
    async function generate(value: string): Promise<string>
    {
        return qrcode.generate(value);
    }
</script>

<main id="app-main">
    <h1>qrcode</h1>
    <Input type="text" label="Texto do QR Code" bind:value />
    <br>
    <br>
    <button type="button" class="highlighted" on:click={() => code = value}>
        Gerar QR Code
    </button>
    <button type="button" class="highlighted" on:click={read}>
        Ler QR Code
    </button>
    <br>
    <br>
    {#if code}
        {#await generate(value)}
            Gerando QR Code...
        {:then qrcodeData} 
            <img src={qrcodeData} alt="code">
        {:catch error}
            {error}
        {/await}
    {/if}
</main>
<aside id="app-aside"></aside>
<QRCodeReaderComponent />
