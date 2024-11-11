<script lang="ts">
    import { goto } from "$app/navigation";
    import { Pagination, confirmation, dialog, messages } from "$lib";
    import { Input } from "$lib/form";
    import ComponentTwo from "./component_two.svelte";
    export let props: {name: string};
    let name: string = '';
    async function openNewDialog(): Promise<void>
    {
        const result = await dialog.open<string>('Dialog Dois', ComponentTwo);
        if (typeof result !== 'undefined') name = result;
    }
</script>
<main>
    <h2>Olá {props.name}</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptate ut aspernatur doloribus ea hic quis magnam. Corrupti quod minus eligendi, omnis, iste ullam, qui nemo tempore autem neque voluptate?</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptate ut aspernatur doloribus ea hic quis magnam. Corrupti quod minus eligendi, omnis, iste ullam, qui nemo tempore autem neque voluptate?</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptate ut aspernatur doloribus ea hic quis magnam. Corrupti quod minus eligendi, omnis, iste ullam, qui nemo tempore autem neque voluptate?</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptate ut aspernatur doloribus ea hic quis magnam. Corrupti quod minus eligendi, omnis, iste ullam, qui nemo tempore autem neque voluptate?</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptate ut aspernatur doloribus ea hic quis magnam. Corrupti quod minus eligendi, omnis, iste ullam, qui nemo tempore autem neque voluptate?</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptate ut aspernatur doloribus ea hic quis magnam. Corrupti quod minus eligendi, omnis, iste ullam, qui nemo tempore autem neque voluptate?</p>
    <p>
        <Input type="text" label="Nome do retorno" bind:value={name} />
    </p>
    <Input type=file label=Teste />
    <Pagination  meta={{
        current_page: 0,
        from: 0,
        last_page: 0,
        per_page: 0,
        to: 0,
        total: 0,
    }} />
</main>
<footer>
    <button type="button" class="highlighted" on:click={openNewDialog}>Abrir novo dialog</button>
    <button type="button" class="highlighted" on:click={() => dialog.resolve({name})}>Informar nome</button>
    <button type="button" class="highlighted" use:confirmation={{callback: () => dialog.close(), message: 'Fechar janela?'}}>Fechar janela</button>
    <button type="button" class="highlighted" on:click={() => messages.success('Teste da sobreposição da mensagem')}>Mensagem</button>
    <button type="button" class="highlighted" on:click={() => goto('/login')}>Navegar</button>
</footer>
