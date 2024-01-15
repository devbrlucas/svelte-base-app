<script lang="ts">
    import { confirmation, dialog, messages } from "$lib";
    export let props: {name: string};
</script>

<h2>Olá {props.name}</h2>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptate ut aspernatur doloribus ea hic quis magnam. Corrupti quod minus eligendi, omnis, iste ullam, qui nemo tempore autem neque voluptate?</p>
<button type="button" class="highlighted" use:confirmation={{callback: () => dialog(), message: 'Fechar janela?'}}>Fechar janela</button>
<button type="button" class="highlighted" on:click={() => messages.success('Teste da sobreposição da mensagem')}>Mensagem</button>
