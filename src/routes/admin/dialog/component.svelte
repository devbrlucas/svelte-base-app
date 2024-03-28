<script lang="ts">
    import { goto } from "$app/navigation";
    import { confirmation, dialog, messages } from "$lib";
    import { Input } from "$lib/form";
    export let props: {name: string};
    let name: string = '';
</script>
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
<!-- <main>
</main> -->
<footer>
    <button type="button" class="highlighted" on:click={() => dialog.resolve({name})}>Informar nome</button>
    <button type="button" class="highlighted" use:confirmation={{callback: () => dialog.close(), message: 'Fechar janela?'}}>Fechar janela</button>
    <button type="button" class="highlighted" on:click={() => messages.success('Teste da sobreposição da mensagem')}>Mensagem</button>
    <button type="button" class="highlighted" on:click={() => goto('/admin/dashboard')}>Navegar</button>
</footer>
